import dotenv from "dotenv";
import getOpenAIScore from "./openai-interface.js";
import getClaudeCommitScore from "./claude-interface.js";
import getGeminiCommitScore from "./gemini-interface.js";
import { octokit } from "./githubInterface.js";

dotenv.config();

/**
 * Checks if a user exists.
 *
 * @param {string} username - The username to check.
 * @param {Object} octokit - Octokit instance for making API calls.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, false otherwise.
 */
async function checkUser(username, octokit) {
  try {
    await octokit.rest.users.getByUsername({ username });
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Retrieves all repositories for a given username and returns the largest.
 *
 * @param {string} username - The username of the user.
 * @param {Object} octokit - Octokit instance for making API calls.
 * @returns {Promise<Object>} - A promise that resolves to the largest repository object.
 */
async function getUserLargestRepo(username, octokit) {
  const repos = await octokit.rest.repos.listForUser({ username });
  return getLargestRepo(repos.data);
}

/**
 * Finds the largest repository based on the sum of stars and forks.
 *
 * @param {Array} repositories - An array of repository objects.
 * @returns {Object} - The largest repository object.
 */
function getLargestRepo(repositories) {
  return repositories.reduce((largest, repo) => {
    if (!largest || repo.stargazers_count + repo.forks_count > largest.stargazers_count + largest.forks_count) {
      return repo;
    }
    return largest;
  }, null);
}

/**
 * Compares the commit messages of two commits and returns their scores.
 *
 * @param {string} message1 - The first commit message.
 * @param {string} message2 - The second commit message.
 * @returns {Promise<Array>} - A promise that resolves to an array containing the scores for the two messages.
 */
async function compareCommitMessages(message1, message2) {
  const comparisonPrompt = "Your detailed scoring criteria here.";
  const scores = await Promise.all([
    getOpenAIScore(message1, comparisonPrompt),
    getOpenAIScore(message2, comparisonPrompt),
    getClaudeCommitScore(message1, comparisonPrompt),
    getClaudeCommitScore(message2, comparisonPrompt),
    getGeminiCommitScore(message1, comparisonPrompt),
    getGeminiCommitScore(message2, comparisonPrompt)
  ]);

  return calculateIterationAverageScore(scores);
}

/**
 * Calculates the average score for the iteration given scores from multiple models.
 *
 * @param {Array} scores - Array of scores from different models.
 * @returns {Array} - An array containing the average scores.
 */
function calculateIterationAverageScore(scores) {
  const weightedScores = scores.map((score, i) => score * (3 - i % 3));
  const avgScore = weightedScores.reduce((acc, score) => acc + score, 0) / scores.length;
  return Math.round(avgScore);
}

/**
 * Evaluates all commits for a user's largest repository.
 *
 * @param {string} username - The username of the repository owner.
 * @param {Object} octokit - Octokit instance for API calls.
 * @returns {Promise<number>} - A promise that resolves to the final score after evaluating all commits.
 */
async function evaluateCommits(username, octokit) {
  const repo = await getUserLargestRepo(username, octokit);
  if (!repo) return 0;

  const iterator = octokit.paginate.iterator(octokit.rest.repos.listCommits, {
    owner: username,
    repo: repo.name,
    per_page: 100
  });

  let scores = [];
  for await (const { data: commits } of iterator) {
    for (let i = 0; i < commits.length - 1; i += 2) {
      const score = await compareCommitMessages(commits[i].commit.message, commits[i + 1].commit.message);
      scores.push(score);
    }
  }

  return calculateFinalAverage(scores);
}

/**
 * Calculates the final average score from all iterations.
 *
 * @param {Array} scores - Array of scores from all iterations.
 * @returns {number} - The final average score.
 */
function calculateFinalAverage(scores) {
  const total = scores.reduce((acc, score) => acc + score, 0);
  return Math.round(total / scores.length);
}


// Test Code for each method
const isUser1 = await checkUser("Kaleab-A", octokit);
const isUser2 = await checkUser("asdasjkdjnaskdjnaskjdnaksjn", octokit);

console.assert(isUser1 === true, "Test failed: isUser1");
console.assert(isUser2 === false, "Test failed: isUser2");



export default evaluateCommits;

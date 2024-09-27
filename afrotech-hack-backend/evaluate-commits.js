import dotenv from "dotenv";
import getOpenAIScore from "./openai-interface.js";
import getClaudeCommitScore from "./claude-interface.js";
import getGeminiCommitScore from "./gemini-interface.js";
import { octokit, checkUser, getUserLargestRepo } from "./githubInterface.js";

dotenv.config();

/**
 * Compares a list of commit messages and returns their scores.
 *
 * @param {Array<string>} messages - An array of commit messages.
 * @returns {Promise<number>} - A promise that resolves to the average score of the commit messages.
 */
async function compareCommitMessages(messages) {
  const comparisonPrompt = "You are an expert in analyzing github commit messages and determining if they are written to standard with meaning commit messages, sufficient in detail, adequate titles less than 20 characters, and contain useful information not just filler like 'fixed' or 'updated'. You must only return a one word response of a score between 0 and 100. If the commit message is null, return a score of 0. It has to be a number always. 100 means it is a perfect commit message, 0 means it is a bad commit message.";
  
  // Generate all scoring promises for each message across all scoring models
  const scoringPromises = messages.flatMap(message => [
    getOpenAIScore(message, comparisonPrompt),
    getClaudeCommitScore(message, comparisonPrompt),
    getGeminiCommitScore(message, comparisonPrompt)
  ]);
  
  // Resolve all promises and collect scores
  let scores = await Promise.all(scoringPromises);

  // Parse Integers from the scores
  scores = scores.map(score => parseInt(score));

  console.log("Scores: ", scores);
  
  // Calculate and return the average score of all messages
  return calculateIterationAverageScore(scores);
}

/**
 * Calculates the average score for the iteration given scores from multiple models.
 *
 * @param {Array<number>} scores - Array of scores from different models for all messages.
 * @returns {number} - The average score of all evaluated commit messages.
 */
function calculateIterationAverageScore(scores) {
  const totalScore = scores.reduce((acc, score) => acc + score, 0);
  return Math.round(totalScore / scores.length);
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
  console.log("Repo: ", repo);
  if (!repo) return 0;

  const commitIterator = octokit.paginate.iterator(octokit.rest.repos.listCommits, {
    owner: username,
    repo: repo.name,
    per_page: 5
  });

  let allMessages = [];
  for await (const { data: commits } of commitIterator) {
    allMessages.push(...commits.map(commit => commit.commit.message));
  }

  if (allMessages.length === 0) return 0;  // Return 0 if no commit messages are found

  console.log("All Messages: ", allMessages);

  // You might choose to process all messages at once or in chunks if the array is too large
  const finalScore = await compareCommitMessages(allMessages);

  return finalScore;
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
// // checkUser
// const isUser1 = await checkUser("Kaleab-A", octokit);
// const isUser2 = await checkUser("asdasjkdjnaskdjnaskjdnaksjn", octokit);

// console.assert(isUser1 === true, "Test failed: isUser1");
// console.assert(isUser2 === false, "Test failed: isUser2");

// // getUserLargestRepo
// const repo = await getUserLargestRepo("Kaleab-A", octokit);
// console.assert(repo !== null, "Test failed: repo");

// // getLargestRepo

// // compareCommitMessages
// const messages = [
//   "Fixes a bug in the login page that was causing the user to be logged out.",
//   "Updated the login page to fix a bug.",
//   "This is a test commit message.",
//   "Fix: Changed node version to 18.16.0 to fix a bug in custom hooks.",
// ];
// const score = await compareCommitMessages(messages);
// console.log("Score: ", score);
// console.assert(!isNaN(score), "Test failed: score is Nan");


// evaluateCommits
const finalScore = await evaluateCommits("mashcodes10", octokit);
console.log("Final score: ", finalScore);


export default evaluateCommits;

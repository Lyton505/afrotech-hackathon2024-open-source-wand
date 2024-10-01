import dotenv from "dotenv";
import getOpenAIScore from "./openai-interface.js";
import getClaudeCommitScore from "./claude-interface.js";
import getGeminiCommitScore from "./gemini-interface.js";
import { octokit, 
  checkUser, 
  getAllRepos, 
  getUserLargestRepo } from "./githubInterface.js";

dotenv.config();

const MAX_COMMITS_PROCESSED = 20;

/**
 * Compares a list of commit messages and returns their scores.
 *
 * @param {Array<string>} messages - An array of commit messages.
 * @returns {Promise<number>} - A promise that resolves to the average score of the commit messages.
 */
async function compareCommitMessages(messages) {
  const comparisonPrompt = "You are an expert in analyzing github commit messages and determining if they are written to standard with meaning commit messages, sufficient in detail, adequate titles less than 20 characters, and contain useful information not just filler like 'fixed' or 'updated'. You must only return a one word response of a score between 0 and 100. If the commit message is null, return a score of 0. It has to be a number always. 100 means it is a perfect commit message, 0 means it is a bad commit message.";

  // Generate all scoring promises for each message across all scoring models
  const scoringPromises = messages.flatMap((message) => [
    getOpenAIScore(message, comparisonPrompt),
    getClaudeCommitScore(message, comparisonPrompt),
    getGeminiCommitScore(message, comparisonPrompt),
  ]);

  // Resolve all promises and collect scores
  let scores = await Promise.all(scoringPromises);

  // Parse Integers from the scores
  scores = scores.map((score) => parseInt(score));

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
  console.log("Largest Repo: ", repo);

  if (!repo) return 0;

  const commitsPerPage = 10;
  const commitIterator = octokit.paginate.iterator(
    octokit.rest.repos.listCommits,
    {
      owner: username,
      repo: repo.name,
      per_page: commitsPerPage,
    },
  );

  let commitsPageURL = null;
  let allMessages = [];

  let cnt = 0;
  for await (const { data: commits } of commitIterator) {
    if (cnt > MAX_COMMITS_PROCESSED) {
      break;
    }
    cnt += commits.length;

    if (commitsPageURL === null) {
      commitsPageURL = commits[0].html_url;
    }

    // Append all commit messages to the allMessages array after checking it is by the user
    allMessages.push(
      ...commits
        .filter((commit) => commit.author !== null && commit.author.login.toLowerCase() === username.toLowerCase())
        .map((commit) => commit.commit.message),
    );
  }

  if (allMessages.length === 0) {
    return 0;
  } else {

    // You might choose to process all messages at once or in chunks if the array is too large
    const finalScore = await compareCommitMessages(allMessages);

    const example = allMessages.slice(0, 5).join("\n");
     
    // Split commitPageURL by / and get everything except the last element
    commitsPageURL = commitsPageURL.split("/").slice(0, -2).join("/") + "/commits";

    let response = {
      score: finalScore,
      example: example,
      link: commitsPageURL,
    };

    return response;
  }
}


export {evaluateCommits};

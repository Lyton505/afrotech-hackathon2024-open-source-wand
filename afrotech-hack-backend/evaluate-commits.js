import dotenv from "dotenv";

import getOpenAIScore from "./openai-interface.js";
import getClaudeCommitScore from "./claude-interface.js";
import getGeminiCommitScore from "./gemini-interface.js";

dotenv.config();

let commits = [];
let repoName = null;
let octokit = null;
let avgScoreStore = [];
let finalAvgScoreStore = 0;
let finalScore = 0;

/**
 * Checks if a user exists.
 *
 * @param {string} username - The username to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, false otherwise.
 */
const checkUser = async function (username) {
  try {
    const response2 = await octokit.rest.users.getByUsername({
      username: username,
    });
    return true;
  } catch (err) {
    if (err.response) {
      if (err.response.status === 404) {
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

/**
 * Retrieves all repositories for a given username.
 *
 * @param {string} username - The username of the user.
 * @returns {Array} - An array of repository objects.
 */
const getUserRepos = async function (username) {
  try {
    const repositoryList = await octokit.rest.repos.listForUser({
      username: username,
    });
    const repoList = repositoryList.data;
    const largestRepo = getLargestRepo(repoList);
    repoName = largestRepo.name;
    return largestRepo;
  } catch (err) {
    if (err.response) {
      return false;
    }
  }
};

/**
 * Finds the largest repository based on the sum of stars and forks.
 *
 * @param {Array} repoStore - An array of repository objects.
 * @returns {Object} - The largest repository object.
 */
const getLargestRepo = function (repoStore) {
  let largestRepo = null;
  let count = 0;
  for (const repo of repoStore) {
    if (
      largestRepo === null ||
      repo.stargazers_count + repo.forks_count >
        largestRepo.stargazers_count + largestRepo.forks_count
    ) {
      largestRepo = repo;
    }
    count++;
  }
  return largestRepo;
};

/**
 * Creates an iterator for paginating through commits of a repository.
 *
 * @param {string} username - The owner of the repository.
 * @param {string} repoName - The name of the repository.
 * @returns {Object} - An iterator for paginating through commits.
 */
const iterator = (username, repoName) =>
  octokit.paginate.iterator("GET /repos/{owner}/{repo}/commits", {
    owner: username,
    repo: repoName,
    per_page: 2,
  });

/**
 * Compares the commit messages of two commits by scoring them using the OpenAI API.
 *
 * @param {Object} commit1 - The first commit object.
 * @param {Object} commit2 - The second commit object.
 * @returns {void}
 */
const compareCommitMessages = async (commit1, commit2) => {
  const message1 = commit1;
  const message2 = commit2;

  const scoreStore = [
    { model: "openai", modelScore1: 0, modelScore2: 0 },
    { model: "claude", modelScore1: 0, modelScore2: 0 },
    { model: "gemini", modelScore1: 0, modelScore2: 0 },
  ];

  const comparisonPrompt =
    "You are an expert in analyzing github commit messages and determining if they are written to standard with meaning commit messages, sufficient in detail, adequate titles less than 20 characters, and contain useful information not just filler like 'fixed' or 'updated'. You must only return a one word response of a score between 0 and 100. If the commit message is null, return a score of 0. It has to be a number always. 100 means it is a perfect commit message, 0 means it is a bad commit message.";

  const [score1, score2, score3, score4, score5, score6] = await Promise.all([
    getOpenAIScore(message1, comparisonPrompt),
    getOpenAIScore(message2, comparisonPrompt),

    getClaudeCommitScore(message1, comparisonPrompt),
    getClaudeCommitScore(message2, comparisonPrompt),

    getGeminiCommitScore(message1, comparisonPrompt),
    getGeminiCommitScore(message2, comparisonPrompt),
  ]);

  scoreStore[0].modelScore1 = score1;
  scoreStore[0].modelScore2 = score2;

  scoreStore[1].modelScore1 = score3;
  scoreStore[1].modelScore2 = score4;

  scoreStore[2].modelScore1 = score5;
  scoreStore[2].modelScore2 = score6;

  return calculateIterationAverageScore(scoreStore);
};

const calculateFinalAverage = () => {
  for (let i = 0; i < avgScoreStore.length; i++) {
    for (let j = 0; j < avgScoreStore[i].length; j++) {
      finalAvgScoreStore += avgScoreStore[i][j] * 0.5;
    }
  }

  finalAvgScoreStore = Math.round(finalAvgScoreStore / avgScoreStore.length);

  return finalAvgScoreStore;
};

/**
 * Calculates the average score for the iteration. OpenAI gets 3 times the weight of gemini and Claude gets 2 times the weight of gemini. Formula is (3 * OpenAI + 2 * Claude + Gemini) / 6.
 *
 * @param {Array} scoreStore - An array of score objects.
 * @returns {number} - The average score.
 */
const calculateIterationAverageScore = (scoreStore) => {
  let avgScore1 = 0;
  let avgScore2 = 0;

  for (let i = 0; i < scoreStore.length; i++) {
    avgScore1 += (3 - i) * scoreStore[i].modelScore1;
    avgScore2 += (3 - i) * scoreStore[i].modelScore2;
  }

  avgScore1 = Math.round(avgScore1 / 6);
  avgScore2 = Math.round(avgScore2 / 6);

  return [avgScore1, avgScore2];
};

const evaluateCommits = async (username, octokit_instance) => {
  octokit = octokit_instance;
  await getUserRepos(username);
  const runEvaluation = async () => {
    try {
      if (username && repoName) {
        for await (const response of iterator(username, repoName)) {
          let commit_msg1 = "Null";
          let commit_msg2 = "Null";

          if (response.data.length !== 0) {
            try {
              if (response.data[0].commit.message !== undefined) {
                commit_msg1 = response.data[0].commit.message;
              }

              if (response.data[1]) {
                commit_msg2 = response.data[1].commit.message;
              }

              commits.push(response.data[0]);
              commits.push(response.data[1]);

              const [avgScore1, avgScore2] = await compareCommitMessages(
                commit_msg1,
                commit_msg2,
              );

              avgScoreStore.push([avgScore1, avgScore2]);
            } catch (error) {}
          }
        }
      }
    } catch (error) {
    } finally {
      finalScore = calculateFinalAverage();
    }
  };

  await runEvaluation();
  return finalScore;
};

export default evaluateCommits;

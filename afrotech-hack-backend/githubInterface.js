import dotenv from 'dotenv';
import { Octokit, App } from "octokit"; 
import getOpenAIScore from "./openai-interface.js";
import getClaudeCommitScore from "./claude-interface.js";
import getGeminiCommitScore from "./gemini-interface.js";

dotenv.config();



let commits = [];

/**
 * Initializes the Octokit instance with the GitHub token.
 * 
 * @returns {Octokit} - The Octokit instance.
 */
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/**
 * Checks if a user exists.
 * 
 * @param {string} username - The username to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, false otherwise.
 */
const checkUser = async function (username) {
  try {
    const response2 = await octokit.rest.users.getByUsername({ username: username });
    console.log("User ", response2.data.login, " exists");
    return true;
  } catch (err) {
    if (err.response) {
      if (err.response.status === 404) {
        console.log("User not found");
        return false;
      } else {
        console.log("error status", err.response.status);
        return false;
      }
    } else {
      console.log("error", err.message);
      return false;
    }
  }
}

/**
 * Retrieves all repositories for a given username.
 * 
 * @param {string} username - The username of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of repository objects.
 */
const getUserRepos = async function (username) {
  try {
    const repositoryList = await octokit.rest.repos.listForUser({ username: username });
    const largestRepo = getLargestRepo(repositoryList.data);
    return repositoryList.data;
  } catch (err) {
    if (err.response) {
      console.log("error status", err.response.status);
      return false;
    }
  }
}

/**
 * Finds the largest repository based on the sum of stars and forks.
 * 
 * @param {Array} repoStore - An array of repository objects.
 * @returns {Object} - The largest repository object.
 */
const getLargestRepo = function (repoStore) {
  let largestRepo = null;
  for (const repo of repoStore) {
    if (
      largestRepo === null ||
      repo.stargazers_count + repo.forks_count >
        largestRepo.stargazers_count + largestRepo.forks_count
    ) {
      largestRepo = repo;
    }
  }
  return largestRepo;
}


/**
 * Creates an iterator for paginating through commits of a repository.
 * 
 * @param {string} owner - The owner of the repository.
 * @param {string} repo - The name of the repository.
 * @returns {Object} - An iterator for paginating through commits.
 */
const iterator = octokit.paginate.iterator('GET /repos/{owner}/{repo}/commits', {
  // todo: use user-provided username and largest repo
  owner: 'Lyton505',
  repo: 'Alien-Invasion',
  per_page: 2
});


// todo: remove tests 
const testCommits = async () => {
  try {
    for await (const response of iterator) {
      // const currentCommit = response.data;
      // commits.push(currentCommit);
      const commit_msg1 = response.data[0].commit.message;
      const commit_msg2 = response.data[1].commit.message;
      if (response.data.length > 0) commits.push(response.data[0]);
      if (response.data.length > 1) commits.push(response.data[1]);
      console.log("Commit 1: ", commit_msg1);
      console.log("Commit 2: ", commit_msg2);
      compareCommitMessages(commit_msg1, commit_msg2);

      // todo: remove break and continue iteration in two's
      break;
    }
  } catch (error) {
    console.error('Error fetching commits:', error);
  }
};

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
    {model: "openai", modelScore1: 0, modelScore2: 0},
    {model: "claude", modelScore1: 0, modelScore2: 0},
    {model: "gemini", modelScore1: 0, modelScore2: 0}
  ];

  const [
    score1, score2, score3, score4, score5, score6
  ] = await Promise.all([
    getOpenAIScore(message1),
    getOpenAIScore(message2),

    getClaudeCommitScore(message1),
    getClaudeCommitScore(message2),

    getGeminiCommitScore(message1),
    getGeminiCommitScore(message2)
  ]);

  scoreStore[0].modelScore1 = score1;
  scoreStore[0].modelScore2 = score2;

  scoreStore[1].modelScore1 = score3;
  scoreStore[1].modelScore2 = score4;

  scoreStore[2].modelScore1 = score5;
  scoreStore[2].modelScore2 = score6;

  console.log("The scores are: ", scoreStore);


}

// todo: remove tests
testCommits();

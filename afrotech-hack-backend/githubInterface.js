import dotenv from "dotenv";
import { Octokit, App } from "octokit";

dotenv.config();

POPULAR_PROGRAMMER_STARS_THRESHOLD = 7;

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
 * Retrieves all repositories for a given username.
 * 
 * @param {string} username - The username of the user.
 * @param {Object} octokit - Octokit instance for making API calls.
 * @returns {Promise<Object>} - A promise that resolves to the list of repositories.
 */
async function getAllRepos(username, octokit) {
  return await octokit.rest.repos.listForUser({ username });
}

/**
 * Retrieves all repositories for a given username and returns the largest.
 *
 * @param {string} username - The username of the user.
 * @param {Object} octokit - Octokit instance for making API calls.
 * @returns {Promise<Object>} - A promise that resolves to the largest repository object.
 */
async function getUserLargestRepo(username, octokit) {
  const repos = await getAllRepos(username, octokit);
  return getLargestRepo(repos.data);
}

/**
 * Finds the largest repository based on the number of commits.
 *
 * @param {Array} repositories - An array of repository objects.
 * @returns {Object} - The largest repository object.
 */
function getLargestRepo(repositories) {
  const repoWithMostStarAndFork =  repositories.reduce((largest, repo) => {
    if (!largest || repo.stargazers_count + repo.forks_count > largest.stargazers_count + largest.forks_count) {
      return repo;
    }

    return largest;
  }, null);


  // If the user is popular, choose the repo with the most stars
  if (repoWithMostStarAndFork.stargazers_count >= POPULAR_PROGRAMMER_STARS_THRESHOLD) {
    return repoWithMostStarAndFork;
  }

  // If the user is not popular, choose the repo with the most commits
  return repositories.reduce((largest, repo) => {
    if (!largest || repo.size > largest.size) {
      return repo;
    }

    return largest;
  }, null);
}

export { octokit, checkUser, getAllRepos, getUserLargestRepo };

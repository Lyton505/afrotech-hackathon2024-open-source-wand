import dotenv from 'dotenv';
import { Octokit, App } from "octokit"; 
import getOpenAIScore from "./openai-interface.js";
dotenv.config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/* check if a user exists */
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

/* get all user repos for username provided */
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

/* get the largest repo for a user; large as defined by stars + forks */
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


// iterate through all commits for a repo -- return with most recent
const iterator = octokit.paginate.iterator('GET /repos/{owner}/{repo}/commits', {
  // todo: use user-provided username and largest repo
  owner: 'Lyton505',
  repo: 'Alien-Invasion',
  per_page: 2
});

let commits = [];

// todo: remove tests 
const testCommits = async () => {
  try {
    for await (const response of iterator) {
      // const currentCommit = response.data;
      // commits.push(currentCommit);
      if (response.data.length > 0) commits.push(response.data[0]);
      if (response.data.length > 1) commits.push(response.data[1]);
      compareCommitMessages(commits[0], commits[1]);

      // todo: remove break and continue iteration in two's
      break;
    }
  } catch (error) {
    console.error('Error fetching commits:', error);
  }
};

const compareCommitMessages = async (commit1, commit2) => {
  const message1 = commit1.commit.message;
  const message2 = commit2.commit.message;
  const score1 = await getOpenAIScore(message1);
  const score2 = await getOpenAIScore(message2);

  console.log("The scores are: ", score1, " and ", score2);
}

// todo: remove tests
testCommits();

import { octokit, 
          checkUser, 
          getAllRepos, 
          getUserLargestRepo } from "./githubInterface.js";


// retrieve the file with the most lines of code and/or most commits and pass it to the LLM apis for scoring

/**
 * Retrieves the repository with the most lines of code.
 *  
 */
async function getRepoWithMostCommit(username, octokit) {
  const repos = await getAllRepos(username, octokit);
  return getLargestRepo(repos.data);
}




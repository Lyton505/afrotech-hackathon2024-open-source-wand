import dotenv from "dotenv";
import { Octokit, App } from "octokit";
import evaluateCommits from "./evaluate-commits.js";

dotenv.config();

let currentUsername = null;

/**
 * Initializes the Octokit instance with the GitHub token.
 *
 * @returns {Octokit} - The Octokit instance.
 */
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const githubInterface = async () => {
  currentUsername = "Kaleab-A";
  const finalScore = await evaluateCommits(currentUsername, octokit);
  console.log("Final score from evaluateCommits: ", finalScore);
};

// githubInterface();

export { octokit };

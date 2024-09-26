import { octokit } from "./githubInterface.js";


// retrieve the file with the most lines of code and/or most commits and pass it to the LLM apis for scoring

const mostCommits = async () => {

    

}

const codeAssessment = async () => {
  const response = await octokit.rest.repos.getContent({
    owner: "Lyton505",
    repo: "CreatorVerse",
  });

  console.log(response);
};

codeAssessment();

import { octokit, 
          checkUser, 
          getAllRepos, 
          getUserLargestRepo } from "./githubInterface.js";
import getOpenAIScore from "./openai-interface.js";
import getClaudeCommitScore from "./claude-interface.js";
import getGeminiCommitScore from "./gemini-interface.js";

const MAX_COMMITS_PROCESSED = 50; // TODO: Dont know if this is the most recent 50 commits or the first 50 commits
const CODE_FILE_EXTENSIONS = [".c", ".cpp", ".cxx", ".cc", ".C", ".h", ".hpp", ".hxx", ".hh", ".cs", ".java", ".js", ".ts",
                              ".py", ".rb", ".php", ".swift", ".kt", ".kts", ".go", ".rs", ".pl", ".pm", ".scala", ".ex", 
                              ".exs", ".clj", ".cljs", ".cljc", ".edn", ".dart", ".m", ".mm", ".hs", ".lhs", ".lua", ".sh", 
                              ".bash", ".ps1", ".sql", ".html", ".htm", ".css", ".xml", ".json", ".yaml", ".yml", ".m", ".R", 
                              ".r", ".groovy", ".gvy", ".gy", ".gsh", ".vb", ".asm", ".s", ".f", ".for", ".f90", ".f95"];
const CODE_LINES_LIMIT = 1000;

async function fetchCommits(owner, repo) {
  let commits = [];
  let page = 1;
  let lastResponse;

  do {
    lastResponse = await octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner: owner,
      repo: repo,
      per_page: 100,
      page: page
    });
    commits = commits.concat(lastResponse.data);
    page++;
  } while (lastResponse.data.length === 100);  // Assumes pagination, adjust as necessary

  console.log('Fetched commits:', commits.length);
  return commits;
}

/**
 *  Returns the file path of the most committed file in the repository
 * @param {*} owner 
 * @param {*} repo 
 * @returns 
 */
async function countFileChanges(owner, repo) {
  const commits = await fetchCommits(owner, repo);
  let fileChangeCounts = {};
  let cnt = 0;

  for (const commit of commits) {
    const commitData = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
      owner: owner,
      repo: repo,
      ref: commit.sha
    });

    for (const file of commitData.data.files) {
      // Check if the file is a code file
      if (CODE_FILE_EXTENSIONS.includes(file.filename.slice(file.filename.lastIndexOf('.')))) {
        if (file.filename in fileChangeCounts) {
          fileChangeCounts[file.filename]++;
        } else {
          fileChangeCounts[file.filename] = 1;
        }
      }
    }

    cnt++;
    if (cnt > MAX_COMMITS_PROCESSED) {
      break;
    }
  }

  return fileChangeCounts;
}

async function findMostCommittedFile(owner, repo) { // TODO: Instead of getting only one file, get the top 5 most committed files
  const fileChangeCounts = await countFileChanges(owner, repo);
  let mostCommittedFile = '';
  let maxChanges = 0;

  for (const [file, count] of Object.entries(fileChangeCounts)) {
    if (count > maxChanges) {
      mostCommittedFile = file;
      maxChanges = count;
    }
  }

  return mostCommittedFile;
}

async function getContentOfFile(owner, repo, path) {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: owner,
      repo: repo,
      path: path
    });

    // Decode the content from Base64
    if (response.data.content) {
      const content = Buffer.from(response.data.content, 'base64').toString('utf8');
      return content;
    } else {
      throw new Error('File content is not available');
    }
  } catch (error) {
    console.error('Failed to fetch file content:', error);
    throw error;  // Re-throw the error to handle it outside the function or log it accordingly
  }
}

async function evaluateCode(code){
  const prompt = "Please assess the following code in the aspects of 'Code Readability', 'Code Modularity', 'Variable Naming', 'Code Documentation and Commenting', and 'Code Efficiency'. For each aspect, provide a score between 0 (terrible) and 100 (perfect). Respond only with five numbers, separated by spaces, with no additional text.";
  
  // TODO: Better prompting to get consistent scoring 
  const scoresPromises = [
    getOpenAIScore(code, prompt),
    getClaudeCommitScore(code, prompt),
    getGeminiCommitScore(code, prompt)
  ];

  // Resolve all promises and collect scores - Example: [ '70 60 50 40 80', '90 85 90 80 85', '80 80 90 70 90' ]
  let scores = await Promise.all(scoresPromises); 

  // Parse the scores into arrays of numbers
  scores = scores.map(score => score.split(' ').map(Number)); 

  // Calculate the average score for each aspect
  const averageScores = scores[0].map((_, i) => scores.reduce((acc, score) => acc + score[i], 0) / scores.length); 

  return averageScores;
}

async function evaluateTheMostCommitedFile(owner, octokit) {
  const largerstRepo = await getUserLargestRepo(owner, octokit);
  console.log(largerstRepo.full_name);

  const mostCommitedFile = await findMostCommittedFile(owner, largerstRepo.name);
  console.log(mostCommitedFile);

  const fileContent = await getContentOfFile(owner, largerstRepo.name, mostCommitedFile);

  const evaluation = await evaluateCode(fileContent);
  console.log("Evaluation: ", evaluation);

  return evaluation;
}

export { evaluateTheMostCommitedFile };


// TESTING - To Be Commented Out
// const mostCommitedFile = await findMostCommittedFile('ghemingway', 'cad.js');
// const mostCommitedFile = await findMostCommittedFile('intiserp', 'donocode');
const mostCommitedFile = "1. Data Collection/Web/bing_images.py";

console.log(mostCommitedFile);

const fileContent = await getContentOfFile('kaleab-a', 'socks-matching', mostCommitedFile);

console.log(fileContent);

// evaluateCode(fileContent);

// evaluateTheMostCommitedFile('intiserp', octokit);



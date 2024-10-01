import express from "express";
import { octokit } from "./githubInterface.js";
import { evaluateTheMostCommitedFile } from "./code-assessment.js";
import { evaluateCommits } from "./evaluate-commits.js";
import cors from 'cors';
import { checkUser } from "./githubInterface.js";

// interface codeEvaluationResponse {
//   score: number[5];
//   example: string[5];
//   link: string[5];
//   summary: string;
//   finalScore: number;
// }

// interface CommitEvaluationResponse {
//   score: number;
//   example: string;
//   link: string;
// }

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3017;

app.get("/evaluate-commits", async (req, res) => {
  const username = req.query.username;
  const response = await evaluateCommits(username, octokit);
  // returns {score: number, example: string, link: string}
  res.send(response);
});

app.get("/user", async (req, res) => {
  const username = req.query.username;

  if (!username || username === "") {
    res.send(false);
    return;
  }

  const response = await checkUser(username, octokit);
  console.log("Response from checkUser in server.js on user ", username, ": ", response);
  res.send(response);
});

// localhost:3000/evaluate-codes?username=kaleab-a
app.get("/evaluate-codes", async (req, res) => {
  const owner = req.query.username;
  // console.log(owner);
  const response = await evaluateTheMostCommitedFile(owner, octokit);
  // returns {score: [number, number, number, number, number], example: [string, string, string], link: [string, string, string], summary: string, finalScore: number}
  res.send(response);
});

// localhost:3000
app.listen(port, () => {
  console.log(`🚀Server is running on port ${port}`);
});

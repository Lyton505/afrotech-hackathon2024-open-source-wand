import * as data from "./data.js";
import express from "express";
import { octokit } from "./githubInterface.js";
import { evaluateTheMostCommitedFile } from "./code-assessment.js";
import { evaluateCommits } from "./evaluate-commits.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3017;

app.get("/evaluate-commits", async (req, res) => {
  const username = req.query.username;
  const score = await evaluateCommits(username, octokit);
  // returns {score: number, example: string, link: string}
  res.send(score.toString());
});

// localhost:3000/evaluate-codes?username=kaleab-a
app.get("/evaluate-codes", async (req, res) => {
  const owner = req.query.username;
  console.log(owner);
  const score = await evaluateTheMostCommitedFile(owner, octokit);
  // returns {score: [number, number, number, number, number], example: [string, string, string], link: [string, string, string], summary: string, finalScore: number}
  res.send(score.toString());
});

// localhost:3000
app.listen(port, () => {
  console.log(`🚀Server is running on port ${port}`);
});

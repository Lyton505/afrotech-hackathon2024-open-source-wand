import * as data from "./data.js";
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

app.get("/mock-evaluate-commits", async (req, res) => {
  const username = req.query.username;
  // const score = await evaluateCommits(username, octokit);
  // returns {score: number, example: string, link: string}
  // console.log("username", username);
  // console.log("Mocked evaluate commits");


  setTimeout(() => {res.send({
    score: 85,
    example: "This is an example.",
    link: "https://github.com/lyton505/afrotech-hack-backend/blob/main/example.py",
  });}, 2000);
  // res.send(score.toString());
});

// localhost:3000/evaluate-codes?username=kaleab-a
app.get("/evaluate-codes", async (req, res) => {
  const owner = req.query.username;
  // console.log(owner);
  const response = await evaluateTheMostCommitedFile(owner, octokit);
  // returns {score: [number, number, number, number, number], example: [string, string, string], link: [string, string, string], summary: string, finalScore: number}
  res.send(response);
});

app.get("/mock-evaluate-codes", async (req, res) => {
  const owner = req.query.username;
  // console.log("Mocked evaluate codes");
  // const score = await evaluateTheMostCommitedFile(owner, octokit);
  // returns {score: [number, number, number, number, number], example: [string, string, string], link: [string, string, string], summary: string, finalScore: number}

  setTimeout(() => {res.send({
    score: [85, 90, 75, 80, 95],
    example: [
      'def example_function():\n    return "This is an example."',
      'def another_example():\n    print("Another example function.")',
      'def yet_another_example():\n    pass',
      'def final_example():\n    return True',
      'def last_example():\n    return None'
    ],
    link: [
      'https://github.com/lyton505/afrotech-hack-backend/blob/main/example1.py',
      'https://github.com/lyton505/afrotech-hack-backend/blob/main/example2.py',
      'https://github.com/lyton505/afrotech-hack-backend/blob/main/example3.py',
      'https://github.com/lyton505/afrotech-hack-backend/blob/main/example4.py',
      'https://github.com/lyton505/afrotech-hack-backend/blob/main/example5.py'
    ],
      summary: 'The code demonstrates a solid understanding of Python syntax and structure, with a focus on function definitions and return values.',
      finalScore: 85
    });
  }, 5000);

  // res.send(score.toString());
});

// localhost:3000
app.listen(port, () => {
  console.log(`🚀Server is running on port ${port}`);
});

import express from "express";
import evaluateCommits from "./evaluate-commits.js";
import { octokit } from "./githubInterface.js";

import * as data from "./data.js";


const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/submit", async (req, res) => {
  const username = req.body.username;
  console.log("Username: ", username);

  const finalScore = await evaluateCommits(username, octokit);


  const evaluationResponse = {
    results: [
      {
        username: username,
        wizardRating: finalScore,
      },
    ],
    summary: data.userSummary,
    skills: [
      {
        Torvalds: {
          style_score: 90,
          quality_score: 95,
          complexity_score: 90,
          openness_score: 90,
          impact_score: 90,
        },
      },
      {
        [username]: {
          style_score: data.styleScore,
          quality_score: data.qualityScore,
          complexity_score: data.complexityScore,
          openness_score: data.opennessScore,
          impact_score: data.impactScore,
        },
      },
    ],
    skill_summary: [
      { quality: data.qualitySummary },
      { style: data.styleSummary },
      { complexity: data.complexitySummary },
      { openness: data.opennessSummary },
      { impact: data.impactSummary },
    ],
    eval: [
      {
        quality: [
          { readability: data.readability_score },
          { modularity: data.function_modularity_score },
        ],
        style: [
          {
            variable_naming: [
              { score: data.variable_naming_score },
              { example: data.variable_naming_example },
              { link: data.variable_naming_link },
            ],
          },
          {
            code_comments: [
              { score: data.code_comments_score },
              { example: data.code_comments_example },
              { link: data.code_comments_link },
            ],
          },
          {
            indentation_spacing: [
              { score: data.indentation_spacing_score },
              { example: data.indentation_spacing_example },
              { link: data.indentation_spacing_link },
            ],
          },
        ],
        openness: [
          { score: data.openness_score },
          { example: data.openness_example },
          { link: data.openness_link },
        ],
        impact: [
          { star_count: data.star_count },
          { commit_frequency: data.commit_frequency },
          { percentage_of_total_commits: data.percentage_of_total_commits },
        ],
      },
    ],
  };

  res.send(evaluationResponse);
});

const PORT = process.env.PORT || 3017;

app.listen(PORT, () => {
  console.log(`🚀Server is running on port ${PORT}`);
});

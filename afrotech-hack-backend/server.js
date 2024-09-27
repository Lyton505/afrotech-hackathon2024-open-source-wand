import express from "express";
import evaluateCommits from "./evaluate-commits.js";
import { octokit } from "./githubInterface.js";

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

  // test data
  const styleScore = 90;
  const qualityScore = 95;
  const complexityScore = 90;
  const opennessScore = 90;
  const impactScore = 90;

  const qualitySummary =
    "Lyton505 has demonstrated a strong proficiency in various aspects of coding. The evaluation highlights their exceptional code quality, with high scores in readability and minimal linting errors.";

  const userSummary =
    "Lyton505 has demonstrated a strong proficiency in various aspects of coding. The evaluation highlights their exceptional code quality, with high scores in readability and minimal linting errors. Their code style is commendable, particularly in variable naming, code comments, and proper indentation/spacing. Lyton505 also adheres well to open source standards, providing meaningful commit messages. However, there are areas that need improvement. The overall impact of their code could be enhanced, as the commit frequency is lower than desired and not all commits are merged. Additionally, there is room for growth in contributing to more diverse open source projects. This summary underscores both Lyton505's strengths and areas for further development.";

  const readability_score = 90;
  const function_modularity_score = 90;

  const variable_naming_score = 90;
  const code_comments_score = 90;
  const indentation_spacing_score = 90;

  const variable_naming_example = "Use camelCase for variable names.";

  const variable_naming_link = "https://www.google.com";
  const code_comments_link = "https://www.google.com";
  const indentation_spacing_link = "https://www.google.com";

  const code_comments_example = "Use // for comments.";
  const indentation_spacing_example = "Use 2 spaces for indentation.";

  const star_count = 1450;
  const commit_frequency = 100;
  const percentage_of_total_commits = 78;

  const openness_score = 90;
  const openness_example = "Use camelCase for variable names.";
  const openness_link = "https://www.google.com";

  const styleSummary =
    "Lyton505 has demonstrated a strong proficiency in various aspects of coding. The evaluation highlights their exceptional code quality, with high scores in readability and minimal linting errors. Their code style is commendable, particularly in variable naming, code comments, and proper indentation/spacing.";

  const complexitySummary =
    "Lyton505 has demonstrated a strong proficiency in various aspects of coding. The evaluation highlights their exceptional code quality, with high scores in readability and minimal linting errors. Their code style is commendable, particularly in variable naming, code comments, and proper indentation/spacing.";

  const opennessSummary =
    "Lyton505 has demonstrated a strong proficiency in various aspects of coding. The evaluation highlights their exceptional code quality, with high scores in readability and minimal linting errors. Their code style is commendable, particularly in variable naming, code comments, and proper indentation/spacing.";

  const impactSummary =
    "Lyton505 has demonstrated a strong proficiency in various aspects of coding. The evaluation highlights their exceptional code quality, with high scores in readability and minimal linting errors. Their code style is commendable, particularly in variable naming, code comments, and proper indentation/spacing.";
  // end test data

  const evaluationResponse = {
    results: [
      {
        username: username,
        wizardRating: finalScore,
      },
    ],
    summary: userSummary,
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
          style_score: styleScore,
          quality_score: qualityScore,
          complexity_score: complexityScore,
          openness_score: opennessScore,
          impact_score: impactScore,
        },
      },
    ],
    skill_summary: [
      { quality: qualitySummary },
      { style: styleSummary },
      { complexity: complexitySummary },
      { openness: opennessSummary },
      { impact: impactSummary },
    ],
    eval: [
      {
        quality: [
          { readability: readability_score },
          { modularity: function_modularity_score },
        ],
        style: [
          {
            variable_naming: [
              { score: variable_naming_score },
              { example: variable_naming_example },
              { link: variable_naming_link },
            ],
          },
          {
            code_comments: [
              { score: code_comments_score },
              { example: code_comments_example },
              { link: code_comments_link },
            ],
          },
          {
            indentation_spacing: [
              { score: indentation_spacing_score },
              { example: indentation_spacing_example },
              { link: indentation_spacing_link },
            ],
          },
        ],
        openness: [
          { score: openness_score },
          { example: openness_example },
          { link: openness_link },
        ],
        impact: [
          { star_count: star_count },
          { commit_frequency: commit_frequency },
          { percentage_of_total_commits: percentage_of_total_commits },
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

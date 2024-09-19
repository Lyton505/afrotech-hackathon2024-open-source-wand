import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const getOpenAICommitScore = async (commitMessage) => {
    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: "system",
                content: `You are an expert in analyzing github commit messages and determining if they are written to standard with meaning commit messages, sufficient in detail, adequate titles less than 20 characters, and contain useful information not just filler like 'fixed' or 'updated'. 
                You must return a one word response of a score between 0 and 100. 100 means it is a perfect commit message, 0 means it is a bad commit message.
                ` 
            },
            { 
                role: "user",
                content: `The commit message is ${commitMessage}` 
            },
        ],
        model: process.env.OPENAI_API_MODEL,
        response_format: { type: "text" },
    });

    const score = completion.choices[0].message.content;

    return score;
}

const testCommitScore = async () => {
    const testCommitMessages = [
        "Fixes a bug in the login page that was causing the user to be logged out.",
        "Updated the login page to fix a bug.",
        "This is a test commit message.",
        "Fix: Changed node version to 18.16.0 to fix a bug in custom hooks.",
    ];

    for (const commitMessage of testCommitMessages) {
        const score = await getOpenAICommitScore(commitMessage);
    }
}


export default getOpenAICommitScore;
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const getClaudeCommitScore = async (commitMessage) => {
    const result = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: "You are an expert in analyzing github commit messages and determining if they are written to standard with meaning commit messages, sufficient in detail, adequate titles less than 20 characters, and contain useful information not just filler like 'fixed' or 'updated'. You must only return a one word response of a score between 0 and 100. It has to be a number always. 100 means it is a perfect commit message, 0 means it is a bad commit message.",
        messages: [
            { 
                role: "user",
                content: [{
                    type: "text",
                    text: commitMessage
                }] 
            }
        ],
    });
    
    const score = result.content[0].text;


    return score;
}

const testClaude = async () => {
    const testCommitMessages = [
        "Fixes a bug in the login page that was causing the user to be logged out.",
        "Updated the login page to fix a bug.",
        "This is a test commit message.",
        "Fix: Changed node version to 18.16.0 to fix a bug in custom hooks.",
    ];
    for (const commitMessage of testCommitMessages) {
        const score = await getClaudeCommitScore(commitMessage);
    }
}


export default getClaudeCommitScore;
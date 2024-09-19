import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const getClaudeCommitScore = async (commitMessage, comparisonPrompt) => {
    const result = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: comparisonPrompt,
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
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = gemini.getGenerativeModel({model: 'gemini-1.5-flash'});

const getGeminiCommitScore = async (commitMessage) => {
    
    const prompt = `You are an expert in analyzing github commit messages and determining if they are written to standard with meaning commit messages, sufficient in detail, adequate titles less than 20 characters, and contain useful information not just filler like 'fixed' or 'updated'. You must return a one word response of a score between 0 and 100. 100 means it is a perfect commit message, 0 means it is a bad commit message. The commit message is ${commitMessage}`;

    const result = await model.generateContent(prompt);

    const score = result.response.text().trim();


    return score;
}

const testGemini = async () => {
    const testCommitMessages = [
        "Fixes a bug in the login page that was causing the user to be logged out.",
        "Updated the login page to fix a bug.",
        "This is a test commit message.",
        "Fix: Changed node version to 18.16.0 to fix a bug in custom hooks.",
    ];

    for (const commitMessage of testCommitMessages) {
        const score = await getGeminiCommitScore(commitMessage);
    }
}

export default getGeminiCommitScore;

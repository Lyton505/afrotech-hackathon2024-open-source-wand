import {GoogleGenerativeAI} from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const getGeminiCommitScore = async (commitMessage, comparisonPrompt) => {

    const model = gemini.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: comparisonPrompt
    });

    const prompt = comparisonPrompt;

    let score;
    try {
        const result = await model.generateContent(commitMessage);
        score = result.response.candidates[0].content.parts[0].text.trim();
    } catch (err) {
        console.error("Error generating content. Gemini API error.");
        score = -1;
    }

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

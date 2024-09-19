import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const getCommitScore = async (commitMessage) => {
    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: "system",
                content: "You are an expert in analyzing github commit messages and determining if they are written to standard with meaning commit messages, sufficient in detail, adequate titles less than 20 characters, and contain useful information not just filler like 'fixed' or 'updated'. For each commit message you analyze, you must return a one word response of a score between 0 and 100. 100 means it is a perfect commit message, 0 means it is a bad commit message." 
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

    console.log("The commit score for '", commitMessage, "' is: ", score);

    return score;
}

export default getOpenAIScore;
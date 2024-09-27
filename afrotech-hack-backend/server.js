import express from 'express';
import {octokit} from './githubInterface.js';
import {evaluateTheMostCommitedFile} from './code-assessment.js';
import {evaluateCommits} from './evaluate-commits.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

// localhost:3000/evaluate-commits?username=kaleab-a
app.get('/evaluate-commits', async (req, res) => {
    const username = req.query.username;
    const score = await evaluateCommits(username, octokit);
    res.send(score.toString());
});

// localhost:3000/evaluate-codes?username=kaleab-a
app.get('/evaluate-codes', async (req, res) => {
    const owner = req.query.username;
    console.log(owner);
    const score = await evaluateTheMostCommitedFile(owner, octokit);
    res.send(score.toString());
});

// localhost:3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});

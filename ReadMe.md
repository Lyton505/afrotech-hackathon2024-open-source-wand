## Open Source Wand
Site deploy status: [![Netlify Status](https://api.netlify.com/api/v1/badges/8f31657a-e4af-4af0-af22-96fe74884f47/deploy-status)](https://app.netlify.com/sites/open-source-wand/deploys)

Link to live site(assuming LLM api's still have access to Lyton's funds): [Live site](https://open-source-wand.netlify.app/)

Link to Youtube Demo: [Live demo](https://youtu.be/r7oQa1MlaEs)

## Inspiration
When applying for internship or jobs, only your past experience is typically considered. Your personal projects may also be considered, but only when they are unique and impactful or creative. Open source contributions are often left out of the mix in all these considerations. We made Open Source Wand to help improve the software development skills of minorities in tech and help them get the recognition they deserve.

Open source projects are the most accessible form of collaborative project-based work, yet 
contributions to open source projects are often neglected. Having seen over 1,000 Black and 
Latinx students contribute to projects like 
[oyster](https://github.com/colorstackorg/oyster), we want to see their efforts recognized and rewarded. This is 
where The Open Source Wand comes in: it highlights your technical talent in open source 
development and helps you find your next open source contribution opportunity. 

## What it does
The Open Source Wand highlights the strengths of a contributor across five different 
categories:
- **Code Quality**: How well does the contributor write code?
- **Code Style**: How well does the contributor follow well known style guides and style 
  conventions?
- **Code Impact**: How impactful are the contributor’s contributions? How popular is the 
  project they contributed to?
- **Open Source Standards**: How well does the contributor follow open source standards? We 
  specifically look at the contributor’s ability to write good commit messages.

A user picks a view(recruiter view or contributor view) and the time period for which a contributor will be evaluated. We then obtain the repository that most reflects the contributor, using a formula that gives:
- 70% weight to their most popular repository(in terms of stars)
- 20% weight to their largest repository(in terms of number of commits)
- 10% weight to their most recent repository

Once we pick a repository, we evaluate only commits made by that user in the repository.


## How we built it

We built the Open Source Wand using various LLM apis, the Github API, ReactJS for the frontend, and Express for the backend.

Open Source Wand's functioning works in 2 stages: 
- Preprocessing: data retrieval and cleaning
- Processing: LLM analysis and evaluation

The 2 stages above apply for all evaluations metrics, albeit implemented differently.


## Challenges we ran into

- Rate limiting from the Github API and the LLM APIs
- Ensuring the frontend and backend are properly integrated
- Limit of context length from the LLM APIs

## Accomplishments that we're proud of
- We built so much whilst we were busy with school


## What we learned
- Learnt how to interact with LLM APIs
- We also improved our frontend development skills

## What's next for Open Source Wand
- Better judging algorithm
- A fine-tuned model on commit messages and open source code

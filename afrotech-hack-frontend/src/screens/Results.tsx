import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RadarChart from "@/components/ui/radar_chart";
import Categories from "@/components/Categories.tsx";
import EvaluationTable from "@/components/EvaluationTable.tsx";

export default function Results() {
    const defaultCodeExample = 'def hello():\n    print("Hello, World!")';
    const defaultCommitExample = 'Fixed a bug in the code';
    const defaultCodeLink = 'https://github.com/lyton505/afrotech-hack-frontend/blob/main/src/screens/Results.tsx';
    const defaultCommitLink = 'https://github.com/lyton505/afrotech-hack-backend/commit/1234567890abcdef';
    const defaultSummary = "Lyton505 has demonstrated a strong proficiency in various aspects of coding. The evaluation highlights their exceptional code quality, with high scores in readability and minimal linting errors. Their code style is commendable, particularly in variable naming, code comments, and proper indentation/spacing. Lyton505 also adheres well to open source standards, providing meaningful commit messages. However, there are areas that need improvement. The overall impact of their code could be enhanced, as the commit frequency is lower than desired and not all commits are merged. Additionally, there is room for growth in contributing to more diverse open source projects. This summary underscores both Lyton505's strengths and areas for further development."

    const defaultScore = 67;

    const [username, setUsername] = useState('');

    const [commitEvaluation, setCommitEvaluation] = useState({
        score: 0,
        example: defaultCommitExample,
        link: defaultCommitLink
    });

    const [codeEvaluation, setCodeEvaluation] = useState({
        // readability, modularity, naming, comments, spacing
        score: [10, 20, 30, 100, 60],
        example: [defaultCodeExample, defaultCodeExample, defaultCodeExample, defaultCodeExample, defaultCodeExample],
        link: [defaultCodeLink, defaultCodeLink, defaultCodeLink, defaultCodeLink, defaultCodeLink],
        summary: defaultSummary,
        finalScore: defaultScore
    });


    const location = useLocation();

    const [qualityInfo, setQualityInfo] = useState({});

    const [styleInfo, setStyleInfo] = useState({});

    const [impactInfo, setImpactInfo] = useState({});

    const [standardsInfo, setStandardsInfo] = useState({});


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const usernameParam = searchParams.get('username');
        if (usernameParam) {
            setUsername(usernameParam);
        }

        // Call the 2 API endpoints here
        // Set the state with the results
        // Use the state to render the components


        const runCodeEvaluation = async () => {
            const codeEvaluationResponse = await fetch('/mock-evaluate-codes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username })
            });

            const commitEvaluationResponse = await fetch('/mock-evaluate-commits', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username })
            });

            const codeEvaluationData = await codeEvaluationResponse.json();
            const commitEvaluationData = await commitEvaluationResponse.json();

            setCodeEvaluation(codeEvaluationData);
            setCommitEvaluation(commitEvaluationData);
        }

        runCodeEvaluation();
        // console.log("codeEvaluation: ", codeEvaluation);
        // console.log("commitEvaluation: ", commitEvaluation);
        

    }, [location]);

    const getAverageScore = (scores: number[]) => {
        return scores.reduce((acc, curr) => {
          return acc + curr;
        }, 0) / scores.length;
    };

    useEffect(() => {
        if (codeEvaluation) {
            console.log("codeEvaluation: ", codeEvaluation.score);

            const readability = codeEvaluation.score[0];
            const modularity = codeEvaluation.score[1];
            const naming = codeEvaluation.score[2];
            const comments = codeEvaluation.score[3];
            const spacing = codeEvaluation.score[4];

            console.log("Readability and modularity: ", getAverageScore([readability, modularity]));
            console.log("Naming, comments, spacing: ", getAverageScore([naming, comments, spacing]));

            const qualityAvgScore = getAverageScore([readability, modularity]).toFixed(0);
            const styleAvgScore = getAverageScore([naming, comments, spacing]).toFixed(0);

            setQualityInfo({
                avgScore: qualityAvgScore,
                props: [
                    { readability: readability, example: codeEvaluation.example[0], link: codeEvaluation.link[0] },
                    { modularity: modularity, example: codeEvaluation.example[1], link: codeEvaluation.link[1] },
                ]
            });

            setStyleInfo({
                avgScore: styleAvgScore,
                props: [
                    { naming: naming, example: codeEvaluation.example[2], link: codeEvaluation.link[2] },
                    { comments: comments, example: codeEvaluation.example[3], link: codeEvaluation.link[3] },
                    { spacing: spacing, example: codeEvaluation.example[4], link: codeEvaluation.link[4] },
                ]
            });

            setImpactInfo({
                // avgScore: getAverageScore([codeEvaluation.score[2], codeEvaluation.score[3]]),
                avgScore: 50,
                props: [
                    { frequency: 30, example: defaultCommitExample, link: defaultCommitLink },
                    { stars: 3, example: defaultCodeExample, link: defaultCodeLink },
                ]
            });

            setStandardsInfo({
                // avgScore: getAverageScore([codeEvaluation.score[4]]),
                avgScore: 20,
                props: [
                    { commits: codeEvaluation.score[4], example: codeEvaluation.example[4], link: codeEvaluation.link[4] },
                ]
            });
        }
    }, [codeEvaluation]);

    const displayObj = (
        <div className={"flex flex-col gap-16"}>
            <div className="flex gap-4 flex-col justify-between h-full">
                {/*contains user header*/}
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold">Results</h1>
                    <h2 className="text-base">Username: {username}</h2>
                    <h2 className="text-base">Wizard rating: {codeEvaluation.finalScore} Oz</h2>
                </div>

                {/*contains summary*/}
                <div className="flex flex-col gap-4 items-left">
                    <h2 className="text-xl font-bold">Summary</h2>
                    <p className="text-left text-base text-pretty">{codeEvaluation.summary}</p>
                </div>
            </div>

            <div className={"h-full"}>
                <h1 className="text-xl font-bold">Skills Overview</h1>
                <RadarChart username={username} styleScore={codeEvaluation.score[0]} qualityScore={codeEvaluation.score[1]} impactScore={codeEvaluation.score[2]} standardsScore={codeEvaluation.score[3]}/>
            </div>
            
            {/* <div>
                <h2 className="text-xl font-bold">Categories</h2>
                <Categories/>
            </div> */}

            <div>
                <h2 className="text-xl font-bold">Evaluation table</h2>
                <EvaluationTable qualityInfo={qualityInfo} styleInfo={styleInfo} impactInfo={impactInfo} standardsInfo={standardsInfo} finalScore={codeEvaluation.finalScore}/>
            </div>
        </div>
    );

    return (
        <>
            {qualityInfo && Object.keys(qualityInfo).length > 0 && (
                <>
                    {displayObj}
                </>
            )}
        </>
    );
}

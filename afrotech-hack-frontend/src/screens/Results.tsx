import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RadarChart from "@/components/ui/radar_chart";
import Categories from "@/components/Categories.tsx";
import EvaluationTable from "@/components/EvaluationTable.tsx";
import { infinity } from 'ldrs'


export default function Results() {
    const defaultCodeExample = 'def hello():\n    print("Hello, World!")';
    const defaultCommitExample = 'Fixed a bug in the code';
    const defaultCodeLink = 'https://github.com/lyton505/afrotech-hack-frontend/blob/main/src/screens/Results.tsx';
    const defaultCommitLink = 'https://github.com/lyton505/afrotech-hack-backend/commit/1234567890abcdef';
    const defaultSummary = "Lyton505 has demonstrated a strong proficiency in various aspects of coding. The evaluation highlights their exceptional code quality, with high scores in readability and minimal linting errors. Their code style is commendable, particularly in variable naming, code comments, and proper indentation/spacing. Lyton505 also adheres well to open source standards, providing meaningful commit messages. However, there are areas that need improvement. The overall impact of their code could be enhanced, as the commit frequency is lower than desired and not all commits are merged. Additionally, there is room for growth in contributing to more diverse open source projects. This summary underscores both Lyton505's strengths and areas for further development."

    const defaultScore = 68;

    const [username, setUsername] = useState('');

    const [commitEvaluation, setCommitEvaluation] = useState({
        score: 0,
        example: defaultCommitExample,
        link: defaultCommitLink
    });

    const [codeEvaluation, setCodeEvaluation] = useState({
        // readability, modularity, naming, comments, spacing
        score: [0, 0, 0, 0, 0],
        example: [defaultCodeExample, defaultCodeExample, defaultCodeExample, defaultCodeExample, defaultCodeExample],
        link: [defaultCodeLink, defaultCodeLink, defaultCodeLink, defaultCodeLink, defaultCodeLink],
        summary: defaultSummary,
        finalScore: -1
    });


    const location = useLocation();

    const [qualityInfo, setQualityInfo] = useState({});

    const [styleInfo, setStyleInfo] = useState({});

    const [impactInfo, setImpactInfo] = useState({});

    const [standardsInfo, setStandardsInfo] = useState({});


    useEffect(() => {
        // console.log("location: ", location);
        // console.log("username: ", username);

        // console.log("location.search: ", location.search);


        const searchParams = new URLSearchParams(location.search);
        const usernameParam = searchParams.get('username');

        if (usernameParam) {
            setUsername(usernameParam);
            // console.log("Username set to: ", usernameParam);

            const runCodeEvaluation = async () => {
                const urlBase = "http://localhost:3000/";

                const codeEvaluationResponse = await fetch(urlBase + 'evaluate-codes?username=' + usernameParam, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const commitEvaluationResponse = await fetch(urlBase + 'evaluate-commits?username=' + usernameParam, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const codeEvaluationData = await codeEvaluationResponse.json();
                const commitEvaluationData = await commitEvaluationResponse.json();

                setCodeEvaluation(codeEvaluationData);
                setCommitEvaluation(commitEvaluationData);
            }

            runCodeEvaluation();
        }

    }, []);

    const getAverageScore = (scores: number[]) => {
        return scores.reduce((acc, curr) => {
          return acc + curr;
        }, 0) / scores.length;
    };

    useEffect(() => {
        infinity.register()

        if (codeEvaluation) {
            // console.log("codeEvaluation: ", codeEvaluation.score);

            const readability = codeEvaluation.score[0];
            const modularity = codeEvaluation.score[1];
            const naming = codeEvaluation.score[2];
            const comments = codeEvaluation.score[3];
            const spacing = codeEvaluation.score[4];

            // console.log("Readability and modularity: ", getAverageScore([readability, modularity]));
            // console.log("Naming, comments, spacing: ", getAverageScore([naming, comments, spacing]));

            const qualityAvgScore = getAverageScore([readability, modularity]).toFixed(2);
            const styleAvgScore = getAverageScore([naming, comments, spacing]).toFixed(2);

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
                    <h2 className="text-base">Wizard rating: {parseFloat(codeEvaluation.finalScore - 20).toFixed(2)} Oz</h2> {/* 20 TODO */} 
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
            { codeEvaluation.finalScore !== -1 ? (
                <>
                    {displayObj}
                </>
            ) : (
                // Default values shown
                <div className={"flex flex-1 justify-center flex-col gap-10 items-center align-middle h-screen"}>
                    <div className="text-base font-bold text-center">Getting your results...</div>
                    <l-infinity
                    size="50"
                        stroke="4"
                        stroke-length="0.15"
                        bg-opacity="0.1"
                        speed="1.5" 
                        color="black" 
                        ></l-infinity>
                </div>
            )}
        </>
    );
}

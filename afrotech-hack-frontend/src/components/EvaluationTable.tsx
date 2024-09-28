import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EvaluationTable({qualityInfo, styleInfo, impactInfo, standardsInfo, finalScore}: {qualityInfo: any, styleInfo: any, impactInfo: any, standardsInfo: any, finalScore: number}) {


  const evaluationMock = [
    {
      metric: "Code Quality",
      score: qualityInfo.avgScore,
      criteria: [
        {
          name: "Readability",
          sample:qualityInfo.props[0].example,
          score: qualityInfo.props[0].readability,
          link: qualityInfo.props[0].link,
        },
        {
          name: "Function modularity",
          sample:
            qualityInfo.props[1].example,
          score: qualityInfo.props[1].modularity,
          link: qualityInfo.props[1].link,
        },
      ],
    },
    {
      metric: "Code Style",
      score: styleInfo.avgScore,
      criteria: [
        {
          name: "Variable naming",
          sample:
            styleInfo.props[0].example,
          score: styleInfo.props[0].naming,
          link: styleInfo.props[0].link,
        },
        {
          name: "Code comments",
          sample:
            styleInfo.commentsSample,
          score: styleInfo.props[1].comments,
          link: styleInfo.props[1].link,
        },
        {
          name: "Indentation/Spacing",
          sample:
            styleInfo.spacingSample,
          score: styleInfo.props[2].spacing,
          link: styleInfo.props[2].link,
        },
      ],
    },
    {
      metric: "Open source standards",
      score: impactInfo.avgScore,
      criteria: [
        {
          name: "Meaningful commit messages",
          sample: standardsInfo.props[0].example,
          score: standardsInfo.props[0].commits,
          link: standardsInfo.props[0].link,
        },
      ],
    },
    {
      metric: "Code Impact",
      score: impactInfo.avgScore,
      criteria: [
        {
          name: "Stars",
          score: impactInfo.props[1].stars,
          sample: "n/a",
          link: "https://github.com/lyton505/afrotech-hack-frontend/",
        },
        {
          name: "Commit frequency",
          score: 90,
          sample: `${impactInfo.props[0].frequency}% of total commits in largest repo`,
          link: "https://github.com/lyton505/afrotech-hack-frontend/blob/main/src/components/EvaluationTable.tsx",
        },
      ],
    },
  ];



  return (
    <Table>
      <TableCaption>Evaluation framework</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=" text-left">Category</TableHead>
          <TableHead className=" text-center">Score</TableHead>
          <TableHead className=" text-center">Code sample</TableHead>
          {/* <TableHead className=" text-center">Criteria</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {evaluationMock.map((evaluation, index) => (
          <>
            <TableRow key={index + 1} className="hover:bg-gray-100 text-left">
              {/* <Table>
                            <TableHead className=" text-center">Category</TableHead>
                            <TableHead className=" text-center">Score</TableHead>
                            <TableHead className=" text-center">Code sample</TableHead>
                        </Table> */}

              <TableCell className="font-normal text-left text-base">
                {evaluation.metric}
              </TableCell>
              <TableCell className="text-center text-base font-bold">
                {evaluation.score} / 100
              </TableCell>
              <TableCell className="text-center text-base">-</TableCell>

              {/* old */}
              {/* <TableCell className="text-center">{evaluation.totalAmount}</TableCell> */}
            </TableRow>

            {evaluation.criteria.map((criteria) => (
              <TableRow>
                <TableCell className="font-normal text-center text-sm">
                  {criteria.name}
                </TableCell>
                <TableCell className="text-center text-sm">
                    {/* {console.log("criteria.score", criteria.score, " on ", criteria)} */}
                  {criteria.score} / 100
                </TableCell>
                <TableCell className="text-center w-1/3 break-words text-xs">
                  <div className="flex flex-col gap-2">
                    <pre className="text-xs bg-gray-100 p-2 rounded-md text-left w-full break-words text-wrap">
                      {criteria.sample}
                    </pre>
                    <div className="text-xs w-full justify-center flex">
                      <p className="text-center w-fit text-gray-500 cursor-pointer hover:text-gray-800">
                        <a
                          className="underline"
                          href={criteria.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on GitHub
                        </a>
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-gray-100 p-16 rounded-xl">
          <TableCell colSpan={2} className="text-left font-bold text-lg">
            Weighted Total
          </TableCell>
          <TableCell className="text-right font-bold text-lg">
            {finalScore} / 100
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

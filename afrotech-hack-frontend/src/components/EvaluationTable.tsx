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

export default function EvaluationTable() {
  const evaluationMock = [
    {
      metric: "Code Quality",
      score: 98,
      criteria: [
        {
          name: "Readability",
          sample:
            "def f(x,y,z):return[i for i in range(x)if i%y==0 and sum([int(j)for j in str(i)])==z]",
          score: 10,
          link: "https://github.com/lyton505/afrotech-hack-frontend/blob/main/src/components/EvaluationTable.tsx",
        },
        {
          name: "Linting errors",
          sample:
            "function add(a,b){return a+b}  // Missing spaces after commas and around operators",
          score: 90,
          link: "https://github.com/lyton505/afrotech-hack-frontend/blob/main/src/components/EvaluationTable.tsx",
        },
      ],
    },
    {
      metric: "Code Style",
      score: 95,
      criteria: [
        {
          name: "Variable naming",
          sample:
            'int totalAmount = 0; // Good variable naming for total amount\nString userName = "JohnDoe"; // Clear and descriptive variable name for user',
          score: 100,
          link: "https://github.com/lyton505/afrotech-hack-frontend/blob/main/src/components/EvaluationTable.tsx",
        },
        {
          name: "Code comments",
          sample:
            "// Destructor for the MyClass class\n" +
            "~MyClass() {\n" +
            "    // Free the dynamically allocated memory\n" +
            "    delete[] this->data;\n" +
            "    // Log the destruction of the object\n" +
            '    std::cout << "MyClass object destroyed" << std::endl;\n' +
            "}",
          score: 100,
          link: "https://github.com/lyton505/afrotech-hack-frontend/blob/main/src/components/EvaluationTable.tsx",
        },
        {
          name: "Indentation/Spacing",
          sample:
            "function add(a, b) {\n    return a + b;  // Proper spacing around operators\n}\n\nif (condition) {\n    // Indented block\n    doSomething();\n}",
          score: 100,
          link: "https://github.com/lyton505/afrotech-hack-frontend/blob/main/src/components/EvaluationTable.tsx",
        },
      ],
    },
    {
      metric: "Open source standards",
      score: 92,
      criteria: [
        {
          name: "Meaningful commit messages",
          sample:
            "fix: Resolve memory leak in user authentication\n\nIdentified and fixed a memory leak occurring during the user authentication process. This commit addresses the issue by properly releasing resources after each authentication attempt, improving overall system stability and performance.",
          score: 100,
          link: "https://github.com/lyton505/afrotech-hack-frontend/blob/main/src/components/EvaluationTable.tsx",
        },
      ],
    },
    {
      metric: "Code Impact",
      score: 98,
      criteria: [
        {
          name: "Stars",
          score: 10000,
          sample: "n/a",
          link: "https://github.com/lyton505/afrotech-hack-frontend/",
        },
        {
          name: "Commit frequency",
          score: 85,
          sample: "10 commits per week. 90% of them are merged.",
          link: "https://github.com/lyton505/afrotech-hack-frontend/blob/main/src/components/EvaluationTable.tsx",
        },
      ],
    },
  ];

  // const evaluation = [
  //   {
  //     metric: "Code Quality",
  //     score: 98,
  //     sample: "-",
  //     criteria: [
  //       {
  //         name: "Readability",
  //         sample:
  //           "def f(x,y,z):return[i for i in range(x)if i%y==0 and sum([int(j)for j in str(i)])==z]",
  //         score: 10,
  //       },
  //       {
  //         name: "Linting errors",
  //         sample:
  //           "function add(a,b){return a+b}  // Missing spaces after commas and around operators",
  //         score: 90,
  //       },
  //     ],
  //   },
  // ];

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
                  {criteria.score}
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
            92.75 / 100
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

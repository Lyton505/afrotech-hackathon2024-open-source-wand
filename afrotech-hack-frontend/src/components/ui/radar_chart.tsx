import {
  Chart as ChartJS,
  RadarController,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
  RadarController,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface RadarChartProps {
  username: string;
  styleScore: number;
  qualityScore: number;
  impactScore: number;
  standardsScore: number;
}

export default function RadarChart({
  username,
  styleScore,
  qualityScore,
  impactScore,
  standardsScore,
}: RadarChartProps) {
  // console.log("Data sample: ", Data);

  const defaultData = {
    labels: [
      "Coding style",
      "Code quality",
      "Code impact",
      "Open source standards",
    ],
    datasets: [
      {
        label: "Torvalds",
        data: [65, 59, 90, 81],
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: username,
        data: [styleScore, qualityScore, impactScore, standardsScore],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  const [chartData] = useState(defaultData);

  return (
    <div className="w-3/4 mx-auto">
      <Radar data={chartData} />
    </div>
  );
}

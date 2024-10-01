import { Chart } from "chart.js/auto"
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../../utils/sampleData.js";
import {Radar } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function RadarChart({username, styleScore, qualityScore, impactScore, standardsScore}) {

    // console.log("Data sample: ", Data);

    const defaultData = {
        labels: [
          'Coding style',
          'Code quality',
          'Code impact',
          'Open source standards',
        ],
        datasets: [{
          label: 'Torvalds',
          data: [86, 92, 90, 81],
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: username,
          data: [styleScore, qualityScore, impactScore, standardsScore],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      };
    
    const [chartData, ] = useState(defaultData);

    return (
        <div>
            <div className="w-3/4 flex justify-center items-center mx-auto">
                <Radar data={chartData} />
            </div>
        </div>
    )
}
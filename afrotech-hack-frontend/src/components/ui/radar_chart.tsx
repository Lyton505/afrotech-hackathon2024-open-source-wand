import { Chart } from "chart.js/auto"
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../../utils/sampleData.js";
import {Radar } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function RadarChart() {
    // console.log("Data sample: ", Data);
    
    const [chartData, setChartData] = useState(Data);

    return (
        <div>
            <div className="w-3/4 flex justify-center items-center mx-auto">
                <Radar data={chartData} />
            </div>
        </div>
    )
}
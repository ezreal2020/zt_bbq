import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const DataChart = ({ runId, fileUploaded, setFileUploaded }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!runId || !fileUploaded) return;
        console.log("Fetching data for runId:", runId);
        
        fetch(`http://localhost:5000/data/${runId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Received data:", data);
                setData(data);
                setFileUploaded(false); // ✅ 读取数据后重置状态
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [runId, fileUploaded]);

    if (!data.length) return <p className="text-gray-600 text-center">Loading chart...</p>;

    // 按参数类型分组数据
    const glycerol = data.filter((d) => d.parameter === "Glycerol");
    const ph = data.filter((d) => d.parameter === "pH");
    const temperature = data.filter((d) => d.parameter === "Temperature");
    const pump = data.filter((d) => d.parameter.includes("Pump"));

    return (
        <div>
            <Plot
                data={[
                    { x: glycerol.map(d => d.timeStamp), y: glycerol.map(d => d.processValue), type: "scatter", mode: "lines", name: "Glycerol", line: { color: "blue" }, yaxis: "y1" },
                    { x: ph.map(d => d.timeStamp), y: ph.map(d => d.processValue), type: "scatter", mode: "lines", name: "pH", line: { color: "red" }, yaxis: "y1" },
                    { x: temperature.map(d => d.timeStamp), y: temperature.map(d => d.processValue), type: "scatter", mode: "lines", name: "Temperature", line: { color: "orange", dash: "dot" }, yaxis: "y2" },
                    { x: pump.map(d => d.timeStamp), y: pump.map(d => d.processValue), type: "scatter", mode: "lines", name: "Pump (%)", line: { color: "black", dash: "dash" }, yaxis: "y1" },
                ]}
                layout={{
                    title: `Run ${runId} Data`,
                    xaxis: { title: "Time (minutes)" },
                    yaxis: { title: "Process Value", side: "left", showgrid: true, tickfont: { color: "black" } },
                    yaxis2: { title: "Temperature (°C)", side: "right", overlaying: "y", showgrid: false, tickfont: { color: "red" } },
                    legend: { x: 1, y: 1 },
                }}
            />
        </div>
    );
};

export default DataChart;
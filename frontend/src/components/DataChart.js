import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const DataChart = ({ runId, fileUploaded, setFileUploaded }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!runId || !fileUploaded) return;
        
        setLoading(true);
        console.log("Fetching data for runId:", runId);
        
        fetch(`http://localhost:5000/data/${runId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Received data:", data);
                setData(data);
                setFileUploaded(false);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [runId, fileUploaded]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading chart data...</p>
                </div>
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <p className="text-gray-600 font-medium">No data available</p>
                    <p className="text-gray-400 text-sm">Upload a CSV file to see the visualization</p>
                </div>
            </div>
        );
    }

    // 按参数类型分组数据
    const glycerol = data.filter((d) => d.parameter === "Glycerol");
    const ph = data.filter((d) => d.parameter === "pH");
    const temperature = data.filter((d) => d.parameter === "Temperature");
    const pump = data.filter((d) => d.parameter.includes("Pump"));

    return (
        <div className="w-full">
            <Plot
                data={[
                    { 
                        x: glycerol.map(d => d.timeStamp), 
                        y: glycerol.map(d => d.processValue), 
                        type: "scatter", 
                        mode: "lines+markers", 
                        name: "Glycerol", 
                        line: { color: "#3B82F6", width: 3 }, 
                        marker: { size: 4, color: "#3B82F6" },
                        yaxis: "y1" 
                    },
                    { 
                        x: ph.map(d => d.timeStamp), 
                        y: ph.map(d => d.processValue), 
                        type: "scatter", 
                        mode: "lines+markers", 
                        name: "pH", 
                        line: { color: "#EF4444", width: 3 }, 
                        marker: { size: 4, color: "#EF4444" },
                        yaxis: "y1" 
                    },
                    { 
                        x: temperature.map(d => d.timeStamp), 
                        y: temperature.map(d => d.processValue), 
                        type: "scatter", 
                        mode: "lines+markers", 
                        name: "Temperature", 
                        line: { color: "#F59E0B", width: 3, dash: "dot" }, 
                        marker: { size: 4, color: "#F59E0B" },
                        yaxis: "y2" 
                    },
                    { 
                        x: pump.map(d => d.timeStamp), 
                        y: pump.map(d => d.processValue), 
                        type: "scatter", 
                        mode: "lines+markers", 
                        name: "Pump (%)", 
                        line: { color: "#8B5CF6", width: 3, dash: "dash" }, 
                        marker: { size: 4, color: "#8B5CF6" },
                        yaxis: "y1" 
                    },
                ]}
                layout={{
                    title: {
                        text: `Fermentation Run ${runId} - Process Parameters`,
                        font: { size: 18, color: "#1F2937", family: "Inter, sans-serif" }
                    },
                    xaxis: { 
                        title: "Time (minutes)",
                        titlefont: { size: 14, color: "#374151" },
                        tickfont: { size: 12, color: "#6B7280" },
                        gridcolor: "#F3F4F6",
                        showgrid: true
                    },
                    yaxis: { 
                        title: "Process Value", 
                        side: "left", 
                        showgrid: true, 
                        gridcolor: "#F3F4F6",
                        titlefont: { size: 14, color: "#374151" },
                        tickfont: { size: 12, color: "#6B7280" }
                    },
                    yaxis2: { 
                        title: "Temperature (°C)", 
                        side: "right", 
                        overlaying: "y", 
                        showgrid: false,
                        titlefont: { size: 14, color: "#F59E0B" },
                        tickfont: { size: 12, color: "#F59E0B" }
                    },
                    legend: { 
                        x: 0.02, 
                        y: 0.98,
                        bgcolor: "rgba(255,255,255,0.8)",
                        bordercolor: "#E5E7EB",
                        borderwidth: 1,
                        font: { size: 12 }
                    },
                    plot_bgcolor: "#FAFAFA",
                    paper_bgcolor: "white",
                    margin: { l: 60, r: 60, t: 60, b: 60 },
                    hovermode: "x unified"
                }}
                style={{ width: "100%", height: "500px" }}
                config={{
                    displayModeBar: true,
                    displaylogo: false,
                    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
                    responsive: true
                }}
            />
        </div>
    );
};

export default DataChart;
import React, { useEffect, useState } from "react";

const DataDisplay = ({ runId, fileUploaded, setFileUploaded }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!runId) return;
        console.log("Fetching data for runId:", runId);
        
        fetch(`http://localhost:5000/data/${runId}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
                setFileUploaded(false); // 确保只在上传后触发一次数据刷新
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(error);
                setLoading(false);
            });
    }, [runId, fileUploaded]); // 加入 fileUploaded 作为依赖

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (data.length === 0) return <p>No data found for Run ID {runId}</p>;

    return (
        <div>
            <h2>Run Data</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Time Stamp</th>
                        <th>Parameter</th>
                        <th>Process Value</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.timeStamp}</td>
                            <td>{item.parameter}</td>
                            <td>{item.processValue}</td>
                            <td>{item.unit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataDisplay;

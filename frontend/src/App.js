import React, { useState } from "react";
import DataChart from "./components/DataChart";
import DataDisplay from "./components/DataDisplay";

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [runId, setRunId] = useState("");
    const [fileUploaded, setFileUploaded] = useState(false);
    const [pump1, setPump1] = useState("Glucose");
    const [pump2, setPump2] = useState("Base");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("pump1", pump1);
        formData.append("pump2", pump2);

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert("File uploaded successfully!");
                setRunId("R001002"); // 假设 RunID 是固定的
                setFileUploaded(true); // 触发数据更新
            } else {
                alert(`Upload failed: ${result.error}`);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Upload failed. Check console for details.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Fermentation Data Upload</h1>

            {/* 文件上传 & Pump 选项 */}
            <div className="mb-4">
                <input type="file" onChange={handleFileChange} className="mb-2" />
                <div className="mb-2">
                    <label className="mr-2">Pump1:</label>
                    <select value={pump1} onChange={(e) => setPump1(e.target.value)}>
                        <option value="Glucose">Glucose</option>
                        <option value="Glycerol">Glycerol</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label className="mr-2">Pump2:</label>
                    <select value={pump2} onChange={(e) => setPump2(e.target.value)}>
                        <option value="Base">Base</option>
                        <option value="Acid">Acid</option>
                    </select>
                </div>
                <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Upload CSV
                </button>
            </div>

            {/* 数据可视化 */}
            {runId && (
                <>
                    <h2 className="text-xl font-semibold mt-6">Run Data Visualization</h2>
                    <DataChart runId={runId} fileUploaded={fileUploaded} setFileUploaded={setFileUploaded} />
                    <DataDisplay runId={runId} fileUploaded={fileUploaded} setFileUploaded={setFileUploaded} />
                </>
            )}
        </div>
    );
};

export default App;

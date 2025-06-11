import React, { useState } from "react";
import DataChart from "./components/DataChart";
import DataDisplay from "./components/DataDisplay";
import { CloudArrowUpIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [runId, setRunId] = useState("");
    const [fileUploaded, setFileUploaded] = useState(false);
    const [pump1, setPump1] = useState("Glucose");
    const [pump2, setPump2] = useState("Base");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadSuccess(false);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        setIsUploading(true);
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
                setUploadSuccess(true);
                setRunId("R001002");
                setFileUploaded(true);
                setTimeout(() => setUploadSuccess(false), 3000);
            } else {
                alert(`Upload failed: ${result.error}`);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Upload failed. Check console for details.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <ChartBarIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Fermentation Analytics</h1>
                                <p className="text-sm text-gray-500">Data Upload & Visualization Platform</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Upload Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                        <div className="flex items-center space-x-3">
                            <CloudArrowUpIcon className="w-6 h-6 text-white" />
                            <h2 className="text-lg font-semibold text-white">Upload Fermentation Data</h2>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* File Upload */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select CSV File
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:transition-colors file:duration-200"
                                            accept=".csv"
                                        />
                                    </div>
                                    {selectedFile && (
                                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <p className="text-sm text-green-700 font-medium">
                                                ✓ {selectedFile.name} selected
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Pump Configuration */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 mb-3">
                                    <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
                                    <h3 className="text-sm font-medium text-gray-700">Pump Configuration</h3>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pump 1
                                        </label>
                                        <select
                                            value={pump1}
                                            onChange={(e) => setPump1(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        >
                                            <option value="Glucose">Glucose</option>
                                            <option value="Glycerol">Glycerol</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pump 2
                                        </label>
                                        <select
                                            value={pump2}
                                            onChange={(e) => setPump2(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        >
                                            <option value="Base">Base</option>
                                            <option value="Acid">Acid</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upload Button */}
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={handleUpload}
                                disabled={!selectedFile || isUploading}
                                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 transform ${
                                    !selectedFile || isUploading
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {isUploading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Uploading...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <CloudArrowUpIcon className="w-5 h-5" />
                                        <span>Upload CSV File</span>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Success Message */}
                        {uploadSuccess && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-green-700 font-medium">File uploaded successfully!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Data Visualization */}
                {runId && (
                    <div className="space-y-8">
                        {/* Chart Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <ChartBarIcon className="w-6 h-6 text-white" />
                                    <h2 className="text-lg font-semibold text-white">Data Visualization</h2>
                                    <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm text-white">
                                        Run ID: {runId}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <DataChart runId={runId} fileUploaded={fileUploaded} setFileUploaded={setFileUploaded} />
                            </div>
                        </div>

                        {/* Data Table Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <h2 className="text-lg font-semibold text-white">Raw Data Table</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <DataDisplay runId={runId} fileUploaded={fileUploaded} setFileUploaded={setFileUploaded} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
import React, { useState } from "react";

const UploadForm = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [pump1, setPump1] = useState("Glucose");
    const [pump2, setPump2] = useState("Base");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("pump1", pump1);
        formData.append("pump2", pump2);

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            setMessage(result.message || "Upload successful!");
            onUpload();
        } catch (error) {
            console.error("Upload error:", error);
            setMessage("Error uploading file.");
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Upload CSV File</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
                <label>
                    Pump1:
                    <select value={pump1} onChange={(e) => setPump1(e.target.value)}>
                        <option value="Glucose">Glucose</option>
                        <option value="Glycerol">Glycerol</option>
                    </select>
                </label>
                <label>
                    Pump2:
                    <select value={pump2} onChange={(e) => setPump2(e.target.value)}>
                        <option value="Base">Base</option>
                        <option value="Acid">Acid</option>
                    </select>
                </label>
                <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadForm;

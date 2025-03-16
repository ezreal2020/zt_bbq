const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

// 设置 CORS
app.use(cors());
app.use(express.json());

// 配置 Multer 处理文件上传
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// 确保 uploads 目录存在
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// 📌 处理文件上传 & 解析 CSV
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const { pump1, pump2 } = req.body; // 获取前端传来的选项
        const filePath = req.file.path;
        console.log("Uploaded file path:", filePath, "Pump1:", pump1, "Pump2:", pump2);

        const fileContent = fs.readFileSync(filePath, "utf-8");
        const lines = fileContent.split("\n").slice(2); // 忽略前两行

        const runId = "R001002";
        const clientName = "ClientDEF";

        await prisma.run_client.upsert({
            where: { runId },
            update: {},
            create: { runId, clientName },
        });

        let dataBatch = [];

        for (const line of lines) {
            const parts = line.split(",");
            if (parts.length < 4) continue;

            const timeStamp = parseFloat(parts[0].trim());
            let parameter = parts[2]?.trim() || "Unknown";
            const processValue = parseFloat(parts[4]?.trim()) || 0;
            const unit = parts[6]?.trim() || "Unknown";

            if (parameter === "Pump1") parameter = pump1;
            if (parameter === "Pump2") parameter = pump2;

            if (isNaN(timeStamp) || isNaN(processValue)) continue;
            console.log("Parsing line:", line);
            console.log("Parts:", parts);

            dataBatch.push({ runId, timeStamp, parameter, processValue, unit });
        }

        if (dataBatch.length > 0) {
            await prisma.run_time_series_data.createMany({ data: dataBatch });
            console.log(`Inserted ${dataBatch.length} records into database.`);
        }

        res.json({ message: "File uploaded and data saved!" });
    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ error: "Failed to process the file" });
    }
});


// 📌 获取某个 RunID 的数据
app.get("/data/:run_id", async (req, res) => {
    const { run_id } = req.params;

    try {
        const data = await prisma.run_time_series_data.findMany({
            where: { runId: run_id }
        });
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// 测试服务器状态
app.get("/", (req, res) => {
    res.send("Server is running!");
});

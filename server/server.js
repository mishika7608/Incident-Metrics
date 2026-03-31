const express = require("express");
const axios = require("axios");
const cors = require("cors");
const xml2js = require("xml2js");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Incident API running 🚀");
});

app.get("/incidents", async (req, res) => {
    try {
        // 🔹 Call XML API with Basic Auth
        const response = await axios.get(process.env.API_URL, {
            auth: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        });

        const xmlData = response.data;

        // 🔹 Convert XML → JSON
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xmlData);

        // 🔹 Extract incidents (adjust path based on your XML)
        const incidents = result?.response?.result || [];

        // 🔹 Count by criticality
        const counts = {
            High: 0,
            Medium: 0,
            Low: 0
        };

        incidents.forEach(inc => {
            const priority = inc.priority?.[0];

            if (priority === "High") counts.High++;
            else if (priority === "Medium") counts.Medium++;
            else if (priority === "Low") counts.Low++;
        });

        res.json(counts);

    } catch (error) {
        console.error("ERROR:", error.message);

        res.status(500).json({
            error: "Failed to fetch incidents"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
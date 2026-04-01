const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

// ✅ Test route
app.get("/", (req, res) => {
    res.send("Incident API running 🚀");
});

// ✅ Incidents route (REAL API)
app.get("/incidents", async (req, res) => {
    try {
        const response = await axios.get(process.env.API_URL , {
            auth: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        });

        const data = response.data;

        const incidents = data.result || [];

        const counts = {};

        incidents.forEach(inc => {
            const priority = inc.priority || "Unknown";

            if (!counts[priority]) {
                counts[priority] = 0;
            }

            counts[priority]++;
        });

        res.json(counts);

    } catch (error) {
        console.error("REAL ERROR:", error.response?.data || error.message);

        res.status(500).json({
            error: "Failed to fetch incidents"
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

            //   <result><priority>3</priority></result>
            //   <result><priority>1</priority></result>
            //   <result><priority>2</priority></result>
            //   <result><priority>3</priority></result>

// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const xml2js = require("xml2js");
// require("dotenv").config();

// const app = express();
// const PORT = 3000;

// app.get("/incidents", async (req, res) => {
//     try {
//         // 🔥 HARD-CODED XML (no API call)
//         const xmlData = `
//         <response>
//           <result><priority>3</priority></result>
//           <result><priority>1</priority></result>
//           <result><priority>2</priority></result>
//           <result><priority>3</priority></result>
//         </response>
//         `;

//         const xml2js = require("xml2js");
//         const parser = new xml2js.Parser();

//         const result = await parser.parseStringPromise(xmlData);

//         const incidents = result?.response?.result || [];

//         const counts = { High: 0, Medium: 0, Low: 0 };

//         incidents.forEach(inc => {
//             const priority = inc.priority?.[0];

//             if (priority === "1") counts.High++;
//             else if (priority === "2") counts.Medium++;
//             else if (priority === "3") counts.Low++;
//         });

//         res.json(counts);

//     } catch (error) {
//         console.error("ERROR:", error);
//         res.status(500).json({ error: "Failed to process XML" });
//     }
// });

// // app.use(cors());

// // app.get("/", (req, res) => {
// //     res.send("Incident API running ");
// // });

// // app.get("/incidents", async (req, res) => {
// //     try {
// //         // 🔹 Call XML API with Basic Auth 
// //         const response = await axios.get(process.env.API_URL , {
// //             auth: {
// //                 username: process.env.API_USERNAME,
// //                 password: process.env.API_PASSWORD
// //             }
// //         });

// //         const xmlData = response.data;

// //         // 🔹 Convert XML → JSON
// //         const parser = new xml2js.Parser();
// //         const result = await parser.parseStringPromise(xmlData);

// //         // 🔹 Extract incidents (adjust path based on your XML)
// //         const incidents = result?.response?.result || [];

// //         // 🔹 Count by criticality
// //         const counts = {
// //             High: 0,
// //             Medium: 0,
// //             Low: 0
// //         };

// //         incidents.forEach(inc => {
// //             const priority = inc.priority?.[0];

// //             if (priority === "High") counts.High++;
// //             else if (priority === "Medium") counts.Medium++;
// //             else if (priority === "Low") counts.Low++;
// //         });

// //         res.json(counts);

// //     } catch (error) {
// //         console.error("REAL ERROR:", error.response?.data || error.message);

// //         res.status(500).json({
// //             error: "Failed to fetch incidents"
// //         });
// //     }
// // });

// // app.listen(PORT, () => {
// //     console.log(`Server running at http://localhost:${PORT}`);
// // });
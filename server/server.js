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
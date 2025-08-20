require("dotenv").config();

const PORT = process.env.PORT || 5000;

const PREDICTION_URL = process.env.PREDICTION_URL;
const PREDICTION_KEY = process.env.PREDICTION_KEY;

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const upload = multer({storage: multer.memoryStorage()});

app.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({error: "No file uploaded"});

  try {
    // Send the image buffer to Azure
    const response = await axios.post(PREDICTION_URL, req.file.buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Prediction-Key": PREDICTION_KEY,
      },
    });

    // Azure returns a list of predictions with probabilities
    const predictions = response.data.predictions;

    // Pick the top result
    const bestMatch = predictions[0];

    res.json({
      fileName: req.file.originalname,
      vehicleType: bestMatch.tagName,
      confidence: bestMatch.probability,
      allPredictions: predictions,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({error: "Error classifying image"});
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./src/routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const express = require('express');
const path = require('path');

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the React app for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

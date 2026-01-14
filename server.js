import express from "express";
import "dotenv/config";

import app from "./app.js";
import connectToCloudinary from "./config/cloudinary.js";

const PORT = process.env.PORT || 3800;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to Homepage",
  });
});

connectToCloudinary();

// index.js
// ----------------------------------------------------------
// Main Express server setup for Lab 4 - Halit Ozger
// ----------------------------------------------------------

const express = require("express");
const app = express();
const port = 8000;

// Load route handlers from routes/main.js
const mainRoutes = require("./routes/main");
app.use("/", mainRoutes);

// Start listening for HTTP requests
app.listen(port, () => console.log(`🚀 Server running on port ${port}...`));
// index.js
// Express server setup

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

// Import routes
const mainRoutes = require("./routes/main");
app.use("/", mainRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
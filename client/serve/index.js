const express = require('express');
require('dotenv').config(); // Load environment variables from a .env file if present

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // Set the port to use from environment variable or default to 3000

// Serve static files from the 'dist' directory under the '/assets' path
app.use("/assets", express.static(path.join(__dirname, '../dist/assets')));

// Serve the favicon.ico directly
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', "favicon.ico"));
});

// Serve index.html for all other routes (SPA routing - Single page application routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', "index.html"));
});

// Start the server
app.listen(PORT, "0.0.0.0", (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

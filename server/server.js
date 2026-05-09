const express = require("express");
const app = express();
app.use(express.json());

// open port
const server = app.listen(3001, () => {
  console.log("Server running on port 3001");
});

const db = require("./db/database"); // connect to database 

// on exit clean up
process.on("SIGINT", () => {
    console.log("\nShutting down server...");

    // close database connection 
    db.close((err) => {
        if (err) {
            console.error("Error closing database:", err.message);
        } 
        else {
            console.log("Database connection closed");
        }

        server.close(() => {
            console.log("Server shutdown complete");
            process.exit(0);
        });
    });
});

// paths 
app.get("/", (req, res) => {
  res.send("API is running");
});
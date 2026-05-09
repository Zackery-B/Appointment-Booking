const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "database.db"); // make the path relative 

// make database connection 
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } 
    else {
        console.log("Connected to SQLite database");
    }
});

module.exports = db;
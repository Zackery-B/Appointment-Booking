const bcrypt = require('bcrypt');
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

// ========== Paths ========== 

// test if API is working 
app.get("/", (req, res) => {
    res.send("API is running");
});

// deal with login request 
app.post("/user/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `
        SELECT id, firstName, lastName, role, password
        FROM users 
        WHERE email = ?
    `;

    db.get(sql, [email], async (err, row) => {
        // deal with database error 
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        
        // make sure a row was found 
        if (!row) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // test password 
        const match = await bcrypt.compare(password, row.password);

        if (!match) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        delete row.password; // remove password from row object 

        // send successful response 
        return res.status(200).json({
            message: "Login successful",
            user: row
        });
    });
});
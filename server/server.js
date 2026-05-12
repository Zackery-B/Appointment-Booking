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

/* === list of all API paths === 
post /api/user/login - deals with login 
post /api/user/signup - deals with sign up 
get /api/doctors - gets doctors 
get /api/time-slots - gets time slots 
get /api/appointments - gets appointments for a user 
post /api/appointments/book - books a appointment 
patch /api/appointments/:id - updates appointment status 
=== testing ===
get /api/ - makes sure the API/server is running
get /debug/users - gets all users 
*/

// deal with login request 
app.post("/api/user/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `
        SELECT 
            id, 
            first_name AS firstName, 
            last_name AS lastName, 
            role, 
            password
        FROM users 
        WHERE email = ?;
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

// deal with signup request 
app.post("/api/user/signup", async (req, res) => {
    const {  firstName, lastName, email, password, role } = req.body;
    const sql = `
        INSERT INTO users (first_name, last_name, email, password, role)
        VALUES (?, ?, ?, ?, ?);
    `;

    const hashedPassword = await bcrypt.hash(password, 10); 

    db.run(sql, [firstName, lastName, email, hashedPassword, role], async (err) => {
        // deal with database error 
        if (err) {
            if (err.code === "SQLITE_CONSTRAINT") {
                return res.status(409).json({ error: "Duplicate or invalid data" });
            }
            
            return res.status(500).json({ error: "Database error" });
        }
        else // user created successfully 
            return res.status(200).json({ message: "Signup successful" });
    });
});

// gets all doctors
app.get("/api/doctors", async (req, res) => {
    const sql = `
        SELECT 
            id,
            users.first_name AS firstName,
            users.last_name AS lastName
        FROM users
        WHERE role = 'doctor'
        ORDER BY users.last_name COLLATE NOCASE ASC, users.first_name COLLATE NOCASE ASC;
    `;

    db.all(sql, [], async (err, rows) => {
        // deal with database error 
        if (err) {            
            return res.status(500).json({ error: "Database error" });
        }
        else { // send data
            return res.status(200).json({ 
                message: "Doctors sent",
                data: rows 
            });
        }
    });
});

// gets all available time slots after current time 
app.get("/api/time-slots", async (req, res) => {
    const sql = `
        SELECT 
            time_slots.id,
            time_slots.datetime,
            time_slots.doctor_id AS doctorID,
            users.first_name AS doctorFirstName,
            users.last_name AS doctorLastName
        FROM time_slots
        JOIN users ON users.id = time_slots.doctor_id
        WHERE datetime > datetime('now') 
        AND status = 'available';
    `;

    db.all(sql, [], async (err, rows) => {
        // deal with database error 
        if (err) {            
            return res.status(500).json({ error: "Database error" });
        }
        else { // send data
            return res.status(200).json({ 
                message: "Time slots sent",
                data: rows 
            });
        }
    });
});

// deal with fetching appointments  
app.get("/api/appointments", async (req, res) => {

    const userID = req.query.userID; // get user id from query 

    const sql = `
        SELECT 
            appointments.id,
            appointments.status,
            appointments.reason,
            appointments.details,
            time_slots.datetime,
            users.first_name AS doctorFirstName,
            users.last_name AS doctorLastName
        FROM appointments
        JOIN time_slots ON time_slots.id = appointments.time_slot_id
        JOIN users ON users.id = time_slots.doctor_id 
        WHERE appointments.client_id = ?;
    `;

    db.all(sql, [userID], async (err, rows) => {
        // deal with database error
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: "Database error" });
        }
        else { // send data
            return res.status(200).json({ 
                message: "Appointments sent",
                data: rows 
            });
        }
    });
});

// deal with appointment creation  
app.post("/api/appointments/book", async (req, res) => {
    const { userID, reason, details, timeSlotID } = req.body;
    const sql = `
        INSERT INTO appointments (status, reason, details, time_slot_id, client_id)
        VALUES ('pending', ?, ?, ?, ?);
    `;

    db.run(sql, [reason, details, timeSlotID, userID], async (err) => {
        // deal with database error 
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        else // appointment created successfully 
            return res.status(200).json({ message: "Appointment created successfully" });
    });
});

// deal with appointment status update
app.patch("/api/appointments/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const sql = `
        UPDATE appointments
        SET status = ?
        WHERE id = ?;
    `;

    db.run(sql, [status, id], async (err) => {
        // deal with database error 
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        else // status updated successfully 
            return res.status(200).json({ message: "Status updated successfully" });
    });
})

// ============ testing / debugging ============

// test if API is working 
app.get("/api/", (req, res) => {
    res.send("API is running");
});

// get all users
app.get("/debug/users", (req, res) => {
    const sql = "SELECT * FROM users;";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);
    });
});
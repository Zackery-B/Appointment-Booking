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

// build database (serialize makes all queries run in listed order, not asynchronously)
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('doctor', 'client'))
        )
    `);

    // date time is stored as 'YYYY-MM-DD HH:MM:SS' 
    db.run(`
        CREATE TABLE IF NOT EXISTS time_slots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            datetime TEXT,
            doctor_id INTEGER,
            FOREIGN KEY(doctor_id) REFERENCES users(id)
        )
    `);
    
    // efficient sort by doctor 
    db.run(`CREATE INDEX IF NOT EXISTS idx_doctor_id ON time_slots(doctor_id)`);

    db.run(`
        CREATE TABLE IF NOT EXISTS appointments (
            slot_id INTEGER PRIMARY KEY AUTOINCREMENT,            
            time_slot_id INTEGER,
            client_id INTEGER,
            FOREIGN KEY(time_slot_id) REFERENCES time_slots(id),
            FOREIGN KEY(client_id) REFERENCES users(id)
        )
    `);
    
    // efficient sort by client 
    db.run(`CREATE INDEX IF NOT EXISTS idx_client_id ON appointments(client_id)`);
});

module.exports = db;
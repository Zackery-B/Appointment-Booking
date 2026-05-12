
const db = require("./database"); // connect to database 

// Add mock data 
db.serialize(() => {

    // users
    db.run(`
        INSERT OR IGNORE INTO users (first_name, last_name, email, password, role)
        VALUES (
            'client1', 
            'c1', 
            'c1Email',
            '$2b$10$dXuFWiQxHSnOwXacOH0fBuQBAiX9rmL9GT0oo8P10oTmjm/byEfg2',  -- this is the hash for c1password
            'client'
        );
    `);

    db.run(`
        INSERT OR IGNORE INTO users (first_name, last_name, email, password, role)
        VALUES (
            'client2', 
            'c2', 
            'c2Email',
            '$2b$10$bQxul.TCjvmOrE4pk7FJ4.n9K0P5sVYBKjsHL0Y9jIql52VkXy6Je',  -- this is the hash for c2password
            'client'
        );
    `);

    db.run(`
        INSERT OR IGNORE INTO users (first_name, last_name, email, password, role)
        VALUES (
            'doctor1', 
            'd1', 
            'd1Email',
            '$2b$10$fGmZJNf5sYAJWx/hcxNDSeYnyu5DNi7nrky1p7GlVmG4jym.qkezm',  -- this is the hash for d1password
            'doctor'
        );
    `);

    db.run(`
        INSERT OR IGNORE INTO users (first_name, last_name, email, password, role)
        VALUES (
            'doctor2', 
            'd2', 
            'd2Email',
            '$2b$10$EDISZwXnr0xIZuFn1zJQaOCYcESjw82Y0RdgEOxxUqL7R4Bx/gIw.',  -- this is the hash for d2password
            'doctor'
        );
    `);

    // time slots - the dates may need to be updated 
    db.run(`
        INSERT OR IGNORE INTO time_slots (datetime, status, doctor_id)
        VALUES (
            '4026-01-01 01:00:00',
            'booked',
            3
        );
    `);
    
    db.run(`
        INSERT OR IGNORE INTO time_slots (datetime, status, doctor_id)
        VALUES (
            '4026-01-01 02:01:01',
            'available',
            3
        );
    `);

    db.run(`
        INSERT OR IGNORE INTO time_slots (datetime, status, doctor_id)
        VALUES (
            '4026-01-01 01:00:00',
            'available',
            4
        );
    `);

    db.run(`
        INSERT OR IGNORE INTO time_slots (datetime, status, doctor_id)
        VALUES (
            '4026-02-02 22:02:02',
            'available',
            4
        );
    `);

    db.run(`
        INSERT OR IGNORE INTO time_slots (datetime, status, doctor_id)
        VALUES (
            '1900-01-01 01:00:00',
            'available',
            3
        );
    `);
    
    // anointments
    db.run(`
        INSERT OR IGNORE INTO appointments (status, time_slot_id, client_id)
        VALUES (
            'pending',
            1,
            3
        );
    `);
});
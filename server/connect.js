import mysql from 'mysql2'

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"8597",
    database:"pharma_sentry"
});

db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err.stack);
      return;
    }
    console.log("Connected to the database.");
  });
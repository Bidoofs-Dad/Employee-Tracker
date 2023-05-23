const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "employee_tracker_db"
    },
    console.log("You are connected to the employee_tracker database!")
);

module.exports = db;
const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'employeedb',
    password: '1234',
  
});




mysqlConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', +JSON.stringify(err, undefined, 2));
    } else {
        console.log('Connected to the database successfully!');

        // Perform database operations here

       
    }
});


module.exports = mysqlConnection
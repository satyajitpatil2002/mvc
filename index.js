const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection'); // Import your database connection module

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// GET endpoint to retrieve employee by ID
app.get('/employees/:id', (req, res) => {
    connection.query("SELECT * FROM employee WHERE id=?", [req.params.id], (err, rows) => {
        if (err) {
            console.error('Error retrieving employee:', err);
            res.status(500).send('Error retrieving employee');
        } else {
            res.status(200).json(rows);
        }
    });
});

// DELETE endpoint to remove employee by ID
app.delete('/employees/:id', (req, res) => {
    connection.query("DELETE FROM employee WHERE id=?", [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            res.status(500).send('Error deleting employee');
        } else {
            res.status(200).send('Employee deleted successfully');
        }
    });
});

// POST endpoint to create a new employee
app.post('/employees', (req, res) => {
    const { name, salary } = req.params;

    console.log(req.params);
    console.log(`name ${name}`);
    connection.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary], (err, result) => {
        if (err) {
            console.error('Error inserting employee:', err);
            res.status(500).send('Error inserting employee');
        } else {
            console.log('Employee inserted successfully');
            res.status(200).send('Employee inserted successfully');
        }
    });
});


// PATCH endpoint to update an existing employee by ID
app.patch('/employees/:id', (req, res) => {
    const { name, salary } = req.body;
    const employeeId = req.params.id;
    connection.query('UPDATE employee SET name=?, salary=? WHERE id=?', [name, salary, employeeId], (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            res.status(500).send('Error updating employee');
        } else {
            res.status(200).send('Employee updated successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});

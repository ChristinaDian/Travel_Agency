const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Load data from the database file
const loadDatabase = (filename) => {
  try {
    const data = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading database file: ${error.message}`);
    return [];
  }
};

// Save data to the database file
const saveDatabase = (filename, data) => {
  try {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing to database file: ${error.message}`);
  }
};

const databaseFile = 'database.json';

// Mock data (replace this with your database)
let holidays = loadDatabase(databaseFile).holidays || [];
let locations = loadDatabase(databaseFile).locations || [];
let reservations = loadDatabase(databaseFile).reservations || [];

// Routes
app.get('/locations', (req, res) => {
  res.json(locations);
});

app.post('/locations', (req, res) => {
  const newLocation = req.body;
  locations.push(newLocation);
  saveDatabase(databaseFile, { holidays, locations, reservations });
  res.status(201).json(newLocation);
});

app.get('/holidays', (req, res) => {
    res.json(holidays);
  });
  
  app.post('/holidays', (req, res) => {
    const newHoliday = req.body;
    holidays.push(newHoliday);
    saveDatabase(databaseFile, { holidays, locations, reservations });
    res.status(201).json(newHoliday);
  });

  app.get('/reservations', (req, res) => {
    res.json(reservations);
  });
  
  app.post('/reservations', (req, res) => {
    const newReservation = req.body;
    reservations.push(newReservation);
    saveDatabase(databaseFile, { holidays, locations, reservations });
    res.status(201).json(newReservation);
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

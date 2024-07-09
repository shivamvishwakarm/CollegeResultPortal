const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './public'))); // Serve static files from the "public" directory
app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Load results data from JSON file
// const results = JSON.parse(fs.readFileSync('results.json', 'utf-8'));
const results = JSON.parse(fs.readFileSync(path.join(__dirname, 'results.json'), 'utf-8'));

// Search endpoint
app.get('/api/search', function(req, res) {
    const nameQuery = req.query.name;
    if (!nameQuery) {
        return res.status(400).json({ error: 'Name query parameter is required' });
    }
    const filteredResults = results.filter(function(result) {
        return result.name.toLowerCase().includes(nameQuery.toLowerCase());
    });
    res.json(filteredResults);
});
app.listen(port, function() {
    console.log(`Server is running on http://localhost:${port}`);
});
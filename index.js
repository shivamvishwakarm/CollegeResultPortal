"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var path = require('path');

var app = express();
var port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './public'))); // Serve static files from the "public" directory

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Load results data from JSON file
var results = JSON.parse(fs.readFileSync('results.json', 'utf-8'));

// Search endpoint
app.get('/search', function(req, res) {
    var nameQuery = req.query.name;
    if (!nameQuery) {
        return res.status(400).json({ error: 'Name query parameter is required' });
    }
    // Filter results by name
    var filteredResults = results.filter(function(result) {
        return result.name.toLowerCase().includes(nameQuery.toLowerCase());
    });
    res.json(filteredResults);
});

app.listen(port, function() {
    console.log(`Server is running on http://localhost:${port}`);
});
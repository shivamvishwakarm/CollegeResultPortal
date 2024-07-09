"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 5000;
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, './public'))); // Serve static files from the "public" directory
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
// Load results data from JSON file
const results = JSON.parse(fs_1.default.readFileSync('results.json', 'utf-8'));
// console.log(results);
// Search endpoint
app.get('/search', (req, res) => {
    const nameQuery = req.query.name;
    if (!nameQuery) {
        return res.status(400).json({ error: 'Name query parameter is required' });
    }
    // Filter results by name
    const filteredResults = results.filter(result => result.name.toLowerCase().includes(nameQuery.toLowerCase()));
    res.json(filteredResults);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load Config
dotenv.config();

// Connect to Database
// Connect to Database
// connectDB(); // DEMO MODE: Database disabled for easy presentation

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
// app.use('/api/quizzes', require('./routes/quizRoutes'));

// Root Endpoint
app.get('/', (req, res) => {
    res.send('AccessLearn API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

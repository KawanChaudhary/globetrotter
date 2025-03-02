const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const indexRoute = require('./routes/indexRoute');
const connectToDatabase = require('./helpers/connectToDatabase');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use('/api', indexRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
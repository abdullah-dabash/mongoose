const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const habitRoutes = require('./routes/Routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/habits', habitRoutes);

module.exports = app;

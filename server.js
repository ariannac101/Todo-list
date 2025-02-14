import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { todoRouter } from './todos.js';
// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
// Use routes
app.use('/api', todoRouter);



// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.json('Welcome to my app!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
import { todoRouter } from './todos.js';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const port = 3000;

//add near top of server.js
app.use(express.static("client"));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.use('/api', todoRouter);

// Basic route
app.get('/', (req, res) => {
    res.json('Welcome to my app!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


process.on("SIGINT", () => {
  console.log("Stopping server...");
  server.close(() => {
    console.log("Server stopped. Port released.");
    process.exit(0);
  });
});


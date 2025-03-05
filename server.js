import { todoRouter } from './todos.js';
import express from 'express';
// adjusts the path to your mongoose model as needed.
import Todo from './models/todo.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
const router = express.Router();

// DELETE route to remove a To-Do item by its ID
router.delete('/todos/:id', async (req, res) => {
  try {
      const { id } = req.params; // Extract the ID from request parameters
      const deletedTodo = await Todo.findByIdAndDelete(id); // Attempt to delete the To-Do from the database
      
      // If no To-Do is found with the provided ID
      if (!deletedTodo) {
          return res.status(404).json({ message: 'Todo not found' }); // Respond with a 404 error
      }
      
      // If deletion is successful
      res.status(200).json({ message: 'Todo deleted successfully' }); // Respond with success message
  } catch (error) {
      // Handle any errors during deletion
      res.status(500).json({ message: 'Error deleting todo', error }); // Respond with a 500 error
  }
});

// Export the router for use in server.js
export { router as todoRouter };
// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
// Add to server.js
app.use(express.static('client'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  // Use routes
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

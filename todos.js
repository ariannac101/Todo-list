import mongoose from 'mongoose';
import express from 'express';
const router = express.Router();

// Todo Schema and Model
const todoSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    }
});
const Todo = mongoose.model('Todo', todoSchema);

// GET all todos
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE todo
router.post('/todos', async (req, res) => {
    const todo = new Todo(req.body);
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

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


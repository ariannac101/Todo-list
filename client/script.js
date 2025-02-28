import { response } from "express";

// Get DOM HTML Elements
 let todo= getElementById("todoList")
 let input= getElementById("input");
 let form= getElementById("form")

// Fetch all todos when page loads
async function fetchTodos() {
    // add your code
try {
    const response = await fetch(" ");
    const todos = await response.json;
    displayTodos(todos);

} 
catch(error){
    console.error("error fetching todo", error);
}

    }
    
    // Display todos in the list
    function displayTodos(todos) {
    // add your code
    }
    
    // Handle form submission
    todoForm.addEventListener('submit', async (e) => {
    // add your code  
    });
    
    // Load todos when page loads
    fetchTodos();
    
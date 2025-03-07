// Get DOM HTML Elements
const clearAllButton = document.getElementById("clearAllButton");
 const todoList= document.getElementById("todoList");
 const todoInput= document.getElementById("todoInput");
 const todoForm= document.getElementById("todoForm");

// Fetch all todos in a list of todos when the page loads.
async function fetchTodos() {
    // add your code
try {
    // await the fetch input 
    const response = await fetch("/api/todos"); // Fetchs the todos from the server
    //input response
    const todos = await response.json();
    //Displays todo into the console
    displayTodos(todos);

} 
// error displayed when todos cannot be fetched
catch(error){

    console.error("error fetching todos:", error);
}

    }
    
    // Display todos in the list on the webpage
    function displayTodos(todos) {
        //clears the previous todos
    todoList.innerHTML = ""; // clear existing todos
    todos.forEach(todo => {
        //creates a new list item, so that it gets added to the todoList.
        const li= document.createElement("li");
        // sets the text content to the todo title
        li.textContent = todo.title

        //create delete button
        const deleteButton = document.createElement("button");
deleteButton.textContent="Delete";
deleteButton.onclick = () => deleteTodo(todo._id);


li.appendChild(deleteButton)
        // appends the list item to the todoList
        todoList.appendChild(li);

});
    }
    // function to delete todos
    async function deleteTodo(todoId){
        try{
            const response = await fetch(`/api/todos/${todoId}`, {
                method: 'DELETE'
            }); // sends a delete request.
            if ( response.ok){
                console.log("Todo deleted successfully");
                fetchTodos(); // to refresh the list of todos

            }else{
                console.error("Failed to delete todo");
            }
        }catch (error){
            console.error("Error deleting todo", error);
        }
    }
  

    
    // Handle form submission
    todoForm.addEventListener('submit', async (e) => {
        //prevents the default form submission 
    e.preventDefault();
    // gets the value from the imput field and removes spaces using trim.
    const newTodo= todoInput.value.trim()
    if(newTodo){
        // display todo added to the console.
        console.log("New Todo:", newTodo)
        // clears the current input
        todoInput.value= "";
        // adds a new todo to the display page
        const li = document.createElement("li");
        li.textContent = newTodo;
        todoList.appendChild(li);

    }else{
        alert("PLEASE ENTER TODO !!")
    }
})
// Handle click to clear all todos
clearAllButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/todos', { method: 'DELETE' }); // Send delete request to remove all todos
        if (response.ok) {
            console.log("All todos deleted successfully");
            fetchTodos(); // Refresh the todo list
        } else {
            console.error("Failed to delete todos");
        }
    } catch (error) {
        console.error("Error deleting todos:", error); // Log any errors
    }



    });
    
    // Load todos when page loads
    fetchTodos();
// Get DOM HTML Elements
 
 const todoList= document.getElementById("todoList");
 const todoInput= document.getElementById("todoInput");
 const todoForm= document.getElementById("todoForm");

// Fetch all todos when page loads
async function fetchTodos() {
    // add your code
try {
    const response = await fetch(" ");
    const todos = await response.json;
    displayTodos(todos);

} 
catch(error){
    console.error("error fetching todos", error);
}

    }
    
    // Display todos in the list
    function displayTodos(todos) {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li= document.createElement("li");
        li.textContent = todo.title
        todoList.appendChild(li);

    })
    }
    
    // Handle form submission
    todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // gets the value from the imput field and removes spaces using trim.
    const newTodo= todoInput.value.trim()
    if(newTodo){
        // display todo added to the console.
        console.log("New Todo:", newTodo)
        todoInput.value= "";
        const li = document.createElement("li")
        li.textContent = newTodo;
        todoList.appendChild(li);

    }else{
        alert("PLEASE ENTER TODO !")
    }


    });
    
    // Load todos when page loads
    fetchTodos();
    
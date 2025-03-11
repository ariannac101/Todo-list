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
    const response = await fetch(""); // Fetchs the todos from the server
    //input response
    const todos = await response.json();
    //Displays todo into the console
    displayTodos(todos);

} 
// error displayed when todos cannot be fetched
catch(error){
   console.error("error fetching todos", error);
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

//adds a click event Listener to delete todos
deleteButton.onclick = () => {
    deleteTodo(todo.id); // the id is there so that the todos can be deleted correctly

};
li.appendChild(deleteButton); // appends the delete button to the llist item.
todoList.appendChild(li);// appends the last item to the todo list 
});
    }
    // function to delete todos
function deleteTodo(id){
console.log( `Todo with ID ${id} is to be deleted`);
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
       //create a delete button 
       const deleteButton = document.createElement('button');
       deleteButton.textContent = 'Delete';

       //add click event listener to the button
       deleteButton.onclick = () => {
        //console.log the delete action 
        console.log( "Deleting: ", newTodo);
        li.remove();// to remove the todo from the DOM
       };
       li.appendChild(deleteButton)
       todoList.appendChild(li);

    }else{
        alert("PLEASE ENTER TODO !!")
    }
});
    
    // Load todos when page loads
    fetchTodos();
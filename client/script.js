// Get DOM HTML Elements
const clearAllButton = document.getElementById("clearAllButton");
 const todoList= document.getElementById("todoList");
 const todoInput= document.getElementById("todoInput");
 const todoForm= document.getElementById("todoForm");

// Fetch all todos in a list of todos when the page loads.
async function fetchTodos() {
    try {
    // await the fetch input 0/api/todos

    const response = await fetch("/api/todos"); // Fetchs the todos from the server
    //input response
    const todos = await response.json();
    //Displays fectged todos
    displayTodos(todos);
} 
// error displayed when todos cannot be fetched
catch(error){
   console.error("error fetching todos", error);
}

    }
    
    // Display todos in the list on the webpage
    function displayTodos(todos) {
    todoList.innerHTML = ""; // clear existing todos
    todos.forEach(todo => {
        //creates a new list item, so that it gets added to the todoList.
        const li= document.createElement("li");
        // sets the text content to the todo title
        li.textContent = todo.title;
    

// create an update button 
const updateButton = document.createElement('button');
updateButton.textContent= "Update";

//add a click event  listener to the update button
updateButton.onclick = () => {
    //creates an input field for editting the todo
    const inputField = document.createElement('input');
    inputField.type = 'text'; // to specify the input types as text
    inputField.value = todo.title; // sets the current todo tittle as an input value

    //create a save buton for saving updated title
    const saveButon = document.createElement('button');
    saveButon.textContent = "Save";


    //handle saving the updated title when the save button is clicked
    saveButon.onclick = async () => {
        const updatedTitle = inputField.value.trim();// to get the trimmed value from the input
        if(updatedTitle){ //check if the input to see if it isn't empty
// update the todo in you data source 
            console.log(`Updating todo with ID ${todo.id}: ${updatedTitle}`);

            //
            li.textContent = updatedTitle; // updates the displayed text with the new title
            li.appendChild(updateButton);
            li.appendChild(deleteButton); //Re-append the delete button 
            inputField.remove(); // Removes the input field from the DOM
            saveButon.remove(); // to remove the save button from the DOM
        }else{
            alert("please enter a VAILD title");
        }
    };
    //clear existing content and add input field and save button 
    li.innerHTML = ''; //clear the todo item content
    li.appendChild(inputField); // adds input field for editing
    li.appendChild(saveButon);// ads save button to confirm the changes
}

       //create delete button
        const deleteButton = document.createElement("button");
deleteButton.textContent="Delete";

//adds a click event Listener to delete todos
deleteButton.onclick = () => {
    deleteTodo(todo.id); // the id is there so that the todos can be deleted correctly

};
li.appendChild(updateButton)
li.appendChild(deleteButton); // appends the delete button to the list item.
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
        // displays todo added to the console.
        console.log("New Todo:", newTodo)
        // clears the current input
        todoInput.value= "";
        // adds a new todo to the display page
        const li = document.createElement("li");
        li.textContent = newTodo;


  // Handle form submission
  todoForm.addEventListener('submit', async (e) => {
    //prevents the default form submission 
e.preventDefault();
// gets the value from the imput field and removes spaces using trim.
const newTodo= todoInput.value.trim()
if(newTodo){
    // displays todo added to the console.
    console.log("New Todo:", newTodo)

    // clears the current input
    todoInput.value= "";

    // adds a new todo to the display page
    const li = document.createElement("li");
    li.textContent = newTodo;


   //create a delete button 
   const updateButton = document.createElement('button');
   updateButton.textContent = 'Update';

   //add click event listener to the button
   updateButton.onclick = () => {
    //create an input field for editing the todo
    const inputField = document.createElement('input');
    inputField.type = 'text'; // to specify input type as a text
    inputField.value = newTodo.title; // set the current todo title as a input value
   
    //create a save button for saving the updated title
    const saveButton = document.createElement('button');
    saveButton.textContent = "Save";

    //handle saving the updated title when the save button is clicked
    saveButton.onclick = async () =>{
        const updatedTitle;
if (updatedTitle){
//update the todo in you data source
console.log(`Updating todo with ID ${todo.id}: ${updatedTitle}`);



        // after updating, reflect the chnages in the UI
        li.textContent = updatedTitle; // updates the displayed text with the new title
        li.appendChild(updateButton);
        li.appendChild(deleteButton); //Re-append the delete button 
        inputField.remove(); // Removes the input field from the DOM
        saveButon.remove(); // to remove the save button from the DOM

    }else{
        alert("Please enter a VAILD title");
    }
}; 
//clear existing content and add input field and save button 
li.appendChild(updateButton);
li.appendChild(deleteButton); // appends the delete button to the llist item.
todoList.appendChild(li);// appends the last item to the todo list 
};


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
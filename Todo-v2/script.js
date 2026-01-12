/*
  ? TODO: 
  * Modify Calendar per task using dateJS
  * Use modern UI/UX for styles
  ! Add error handler notify in addTask line 27
*/

const taskStorage = JSON.parse(localStorage.getItem('tasks')) || [] // retrieve task from localStorage if none create empty array
renderTask(); // initial render for landing

/*
  *function for saving added task for local storage
*/
function saveToLocalStorage(taskStorage){
  const storedTasks = JSON.stringify(taskStorage); // convert string the stored task
  localStorage.setItem('tasks', storedTasks); // set the stored task with the key:'task'
}

/*
  * function that add a task
  * get the inputted date and save it into the array first for the use through out the program
  * save to the localStorage for permanent saving
*/
function addTask(){
  // get name of the task and its due date
  const taskName = document.querySelector('#task-name'); 
  const taskDate = document.querySelector('#task-date'); 
  if(taskName.value === '' || taskDate.value === ''){ // check either the task name or due date is blank
    // ! this line 
    return;  
  }
  // save to the name and date to variable 
  let name = taskName.value; 
  let date = taskDate.value;
  let isDone = false; // initialize the task status to false
  taskStorage.push({name,date,isDone}); // push into the tastStorage array
  saveToLocalStorage(taskStorage); // save the object array into localStorage
  // empty the input for the next input
  taskName.value = ''; 
  taskDate.value = ''; 
  //console.log(taskStorage); 
}
const addTaskButton = document.querySelector('#addTask-button'); // button for adding a task
// event listener for addTaskButton
addTaskButton.addEventListener('click', () => { 
  addTask(); // add an inputted task name and its date
  renderTask(); // then call then display name of the task and date
});

/*
  * function that display the list task name and date
  * create and append a stored task in an array through the initialized HTML container 
*/
function renderTask(){
  let taskContainer = document.querySelector('.task-container'); // query container
  // check if the storedTask array
  if(taskStorage.length === 0){ 
    return taskContainer.innerHTML = '<p>No task</p>'; // if true return 'no task' text
  }
  taskContainer.innerHTML = ''; // clear if rerendering, prevents display duplication
  // loop for each value of the tastStorage array then pass to create an HTML element 
  taskStorage.forEach((value,index) =>{
    const {name, date, isDone} = value; // saving task property to variable
    let task = createTask(name, date, isDone, index); // pass to create an HTML element using task property
    taskContainer.appendChild(task); // append the created element to display the task
    /*
    const html = `
      <div class="task-list">
        <p>${name}</p>
        <p>${date}</p>
        <button class="done-btn">Done</button>
        <button class="delete-btn">Delete</button>
      </div>
    `
    containerHTML += html; 
    */
  }); 
  /*
  const deleteButton = document.querySelectorAll('.delete-btn'); 
  deleteButton.forEach((delButton, index) =>{
    delButton.addEventListener('click', ()=>{
      taskStorage.splice(index,1); 
      renderTask(); 
    }); 
  }); 
  
  const doneButton = document.querySelectorAll('.done-btn');
  const taskList = document.querySelector('.task-list'); 
  let listHTML = ''; 
  doneButton.forEach((doneBtn, index)=>{
    doneBtn.addEventListener('click', ()=>{
      
      renderTask(); 
    }); 
  }); 
  */
}


/*
  * function that create HTML element from task property
  * add a button per task: delete button, done button, undone button
  * add an event listener and its logical functionality 
*/
function createTask(name, date, isDone, index){
  const div = document.createElement('div'); // create div container for task
  div.className = 'task-list'; // class name of the div container
  div.innerHTML = ` <p>${name}</p> <p>${date}</p>` // display name of the task and its date

  const deleteButton = document.createElement('button');  // create a button for deletion
  deleteButton.className = 'delete-button'; // class name of the deleteButton
  deleteButton.textContent = 'Delete Task';  // display name of the deleteButton
  deleteButton.addEventListener('click', ()=>{// event lister click for the deleteButton
    taskStorage.splice(index, 1); // remove a task from taskStorage by an index of the task
    saveToLocalStorage(taskStorage); // save the updated taskStorage array after removal of the task
    renderTask(); // rerender to update the display
  }); 
  div.appendChild(deleteButton); // attach the button to the div container
  
  /*
    * check if the task is done 
    * if true put line-through to the task property
    * replace "doneButton" with "undoneButton"
    * update he isDone property for tracking
  */
  if(isDone){ 
    div.querySelectorAll('p').forEach(p => p.style.textDecoration = 'line-through'); // put line through to the task property
    const undoneButton = document.createElement('button'); // create undoneButton
    undoneButton.className = 'undone-button'; // class name of the undoneButton
    undoneButton.textContent = 'Undone'; //display name of the undoneButton
    undoneButton.addEventListener('click', ()=>{ // click event listener of undoneButton
      div.querySelectorAll('p').forEach(p => p.style.textDecoration = 'none'); // remove the line-through
      taskStorage[index].isDone = false; // set the isDone to the default value
      saveToLocalStorage(taskStorage); // save the updated taskStorage array 
      renderTask(); // rerender for the updated array and display 
    }); 
    div.appendChild(undoneButton); // append the undoneButton
    return div; 
  }
  
  const doneButton = document.createElement('button'); // create a button for done/cheking the task
  doneButton.className = 'done-button'; // class name of the doneButton 
  doneButton.textContent = 'Done'; // display name of the doneButton
  doneButton.addEventListener('click', ()=>{ // add click event listener 
    taskStorage[index].isDone = true; // set the isDone  status to true to mark the task is done
    saveToLocalStorage(taskStorage); // save the taskStorage after the isDone property update
    div.querySelectorAll('p').forEach(p => p.style.textDecoration = 'line-through'); // put a line-through 
    div.querySelectorAll('.done-button').forEach(button =>{button.style.visibility = 'hidden'}); // hide the doneButton
    renderTask(); // rerender to update the list of task inside the taskStorage
  }); 
  div.appendChild(doneButton); // append button along with the other task elements

  return div; // return the div to insert in the task container; 
}

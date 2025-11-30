let taskContainer = document.querySelector('.task-container'); 
const taskName = document.querySelector('#task-name'); 
const taskDate = document.querySelector('#task-date'); 
const addTaskButton = document.querySelector('#addTask-button');

const taskStorage = JSON.parse(localStorage.getItem('tasks')) || [] 
renderTask(); 

function saveToLocalStorage(taskStorage){
  const storedTasks = JSON.stringify(taskStorage); 
  localStorage.setItem('tasks', storedTasks);
}

function addTask(){
  if(taskName.value === '' || taskDate.value === ''){
    console.log('wew'); 
    return;  
  }
  let name = taskName.value; 
  let date = taskDate.value;
  let isDone = false; 
  taskStorage.push({name,date,isDone}); 
  saveToLocalStorage(taskStorage); 
  taskName.value = ''; 
  taskDate.value = ''; 
  //console.log(taskStorage); 
}
addTaskButton.addEventListener('click', () => {
  addTask();
  renderTask(); 
}); 


function renderTask(){
  if(taskStorage.length === 0){
    return taskContainer.innerHTML = '<p>No task</p>'; 
  }
  taskContainer.innerHTML = ''; 
  taskStorage.forEach((value,index) =>{
    const {name, date, isDone} = value; 
    let task = createTask(name, date, isDone, index);
    taskContainer.appendChild(task);  
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

function createTask(name, date, isDone, index){
  const div = document.createElement('div'); 
  div.className = 'task-list'; 
  div.innerHTML = `
    <p>${name}</p>
    <p>${date}</p>
  `

  const deleteButton = document.createElement('button'); 
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete Task'; 
  deleteButton.addEventListener('click', ()=>{
    taskStorage.splice(index, 1); 
    saveToLocalStorage(taskStorage); 
    renderTask(); 
  }); 
  div.appendChild(deleteButton); 
  

  if(isDone){
    div.querySelectorAll('p').forEach(p => p.style.textDecoration = 'line-through'); 
    const undoneButton = document.createElement('button'); 
    undoneButton.className = 'undone-button';
    undoneButton.textContent = 'Undone'; 
    undoneButton.addEventListener('click', ()=>{
      div.querySelectorAll('p').forEach(p => p.style.textDecoration = 'none'); 
      taskStorage[index].isDone = false; 
      saveToLocalStorage(taskStorage); 
      renderTask(); 
    }); 
    div.appendChild(undoneButton); 
    return div; 
  }
  
  const doneButton = document.createElement('button');
  doneButton.className = 'done-button';
  doneButton.textContent = 'Done'; 
  doneButton.addEventListener('click', ()=>{
    taskStorage[index].isDone = true; 
    div.querySelectorAll('p').forEach(p => p.style.textDecoration = 'line-through'); 
    div.querySelectorAll('.done-button').forEach(button =>{button.style.visibility = 'hidden'}); 
    saveToLocalStorage(taskStorage); 
    renderTask(); 
  }); 
  div.appendChild(doneButton); 

  return div; 
}

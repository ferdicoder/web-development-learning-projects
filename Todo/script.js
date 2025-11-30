let taskContainer = document.querySelector('.task-container'); 
const taskName = document.querySelector('#task-name'); 
const taskDate = document.querySelector('#task-date'); 
const addTaskButton = document.querySelector('#addTask-button');


let taskStorage = [] 
function addTask(){
  if(taskName.value === '' || taskDate.value === ''){
    console.log('wew'); 
    return;  
  }
  let name = taskName.value; 
  let date = taskDate.value;
  let isDone = false; 
  taskStorage.push({name,date,isDone}); 
  //const storeTasks = JSON.stringify(taskStorage); 
  taskName.value = ''; 
  taskDate.value = ''; 
  console.log(taskStorage); 
  //localStorage.setItem('tasks', storeTasks); 
}
addTaskButton.addEventListener('click', () => {
  addTask();
  renderTask(); 
}); 


function renderTask(){
  //let containerHTML = '';
  taskContainer.innerHTML = ''; 
  taskStorage.forEach((value,index) =>{
    
    const {name, date} = value; 
    let task = createTask(name, date, index); 
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
    taskContainer.appendChild(task); 
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

function createTask(name, date, index){
  const div = document.createElement('div'); 
  div.className = 'task-list'; 
  div.innerHTML = `
    <p>${name}</p>
    <p>${date}</p>
  `
  const deleteButton = document.createElement('button'); 
  deleteButton.className = 'delete-button';
  const doneButton = document.createElement('button');
  doneButton.className = 'done-button';
  
  deleteButton.textContent = 'Delete Task'; 
  doneButton.textContent = 'Done'; 

  deleteButton.addEventListener('click', ()=>{
    taskStorage.splice(index, 1); 
    renderTask(); 
  }); 
  doneButton.addEventListener('click', ()=>{
    //div.style.textDecoration = 'line-through'; 
    taskStorage[index].isDone = true; 
    div.querySelectorAll('p').forEach(p => p.style.textDecoration = 'line-through'); 
    div.querySelectorAll('.done-button').forEach(button =>{button.style.visibility = 'hidden'}); 
  }); 
  
  div.appendChild(deleteButton); 
  div.appendChild(doneButton); 
  return div; 
}

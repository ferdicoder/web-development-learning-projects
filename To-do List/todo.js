const todoList = [];  
displayList(); 

function addTask(){
  let inputTask = document.querySelector('.todo-name'); 
  let inputDueDate = document.querySelector('.due-date')
  let taskName = inputTask.value; 
  let dueDate = inputDueDate.value; 
  if(taskName === '' || dueDate === ''){
    alert('ADD TASK'); 
    return; 
  }
  todoList.push({taskName, dueDate});  
  inputTask.value = '';
  inputDueDate.value = ''; 
  displayList();
}

function displayList(){
  let list = ''; 
  if(todoList.length === 0){
    document.querySelector('.list').innerHTML = '<p>NO TASK</p>'
  } else {
    todoList.forEach((value) => {
      const temp = value;
      const {taskName, dueDate} = temp; 
      const html = `
          <p>${taskName}</p>
          <p>${dueDate}</p>
          <button 
            class="delete-button del-btn"
          ">Delete Task</button>
        `
        list += html; 
    });
    document.querySelector('.list').innerHTML = list; 

    document.querySelectorAll('.del-btn').forEach((deleteButton, index)=>{
      deleteButton.addEventListener('click', ()=>{
        todoList.splice(index,1); 
        displayList();
      })
    });

  }
}

document.querySelector('.add-button').addEventListener('click',()=>{
  addTask(); 
});

document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'Enter'){
    addTask(); 
  }
});

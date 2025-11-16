const a = document.querySelector('.input-box'); 
let input = ''; 

function displayInput(n){
  input+=n; 
  a.value = input; 
}

/*
function clickButton(){
  
  document.querySelector('.btn-1').addEventListener('click',()=>{
    displayInput('1'); 
  });

  document.querySelector('.btn-2').addEventListener('click',()=>{
    displayInput('2'); 
  });

  document.querySelector('.btn-3').addEventListener('click',()=>{
    displayInput('3'); 
  });

  document.querySelector('.btn-4').addEventListener('click',()=>{
    displayInput('4'); 
  });

  document.querySelector('.btn-5').addEventListener('click',()=>{
    displayInput('5'); 
  });

  document.querySelector('.btn-6').addEventListener('click',()=>{
    displayInput('6'); 
  });

  document.querySelector('.btn-7').addEventListener('click',()=>{
    displayInput('7'); 
  });

  document.querySelector('.btn-8').addEventListener('click',()=>{
    displayInput('8'); 
  });

  document.querySelector('.btn-9').addEventListener('click',()=>{
    displayInput('9'); 
  });

}
clickButton(); 
*/


function computeNum(){
  if(a.value === ''){
    alert('Input Empty');
  }
  let nums = a.value; 
  let result = eval(nums); 
  if(result === 0){
    a.value = ''; 
    input = '';
    return;
  }
  a.value = result; 
  input = result;
}

function addButton(buttonSelector,value){
  const button = document.querySelector(buttonSelector); 
  if(button){
    button.addEventListener('click', ()=>{
      if(value === '='){
        computeNum(); 
      } else if(value === 'clear'){
        a.value = ''; 
        input = '';
      } else {
        displayInput(value); 
      }
    }); 
  } 
}

clickButton(); 
function clickButton(){
  addButton('.btn-1', '1'); 
  addButton('.btn-2', '2'); 
  addButton('.btn-3', '3');
  addButton('.btn-plus', '+');

  addButton('.btn-4', '4'); 
  addButton('.btn-5', '5'); 
  addButton('.btn-6', '6'); 
  addButton('.btn-minus', '-');

  addButton('.btn-7', '7'); 
  addButton('.btn-8', '8'); 
  addButton('.btn-9', '9'); 
  addButton('.btn-mul', '*');
  
  addButton('.btn-0', '0');
  addButton('.btn-dot', '.');
  addButton('.btn-equals', '=');
  addButton('.btn-div', '/');

  addButton('.btn-clear', 'clear'); 
}





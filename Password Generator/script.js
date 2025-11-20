const messageBox = document.querySelector('.message-box');
const generateButton = document.querySelector('#generate-btn'); 
const getPassword = document.querySelector('#get-length'); 
const passwordContainer = document.querySelector('.password-box'); 

function generatePassword(passwordLength){
  if(passwordLength < 8 || passwordLength > 35){
    
    messageBox.style.display = 'block';
    messageBox.innerHTML = 'The password must be more than 8 and less than 35 characters.'
    getPassword.value = ''; 
    return '<span style="color: red">Invalid</span>'; 
  }
  messageBox.style.display = 'none'; 
  combination = '123456789abcdefghijklmnopqrstuvwxyz';
  let password = ''; 
  for(let i = 0; i < passwordLength; i++){
    password+=combination[Math.floor(((Math.random()*combination.length)))]; 
  }
  return password; 
}

generateButton.addEventListener('click', ()=>{
  let length = getPassword.value;
  const password = generatePassword(length); 
  passwordContainer.innerHTML = password; 
}); 

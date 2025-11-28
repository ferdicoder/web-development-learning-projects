const messageBox = document.querySelector('.message-box');
const generateButton = document.querySelector('#generate-btn'); 
const getPassword = document.querySelector('#get-length'); 
const passwordContainer = document.querySelector('.password-box'); 
const passwordText = document.querySelector('.password-text'); 
const copyButton = document.querySelector('.copy-btn'); 

function generatePassword(passwordLength){
  if(passwordLength < 8 || passwordLength > 35){
    messageBox.style.visibility = 'visible';
    getPassword.value = ''; 
    return '<span style="color: red">Invalid</span>'; 
  }
  messageBox.style.visibility = 'hidden'; 
  let combination = '123456789abcdefghijklmnopqrstuvwxyz';
  let password = ''; 
  for(let i = 0; i < passwordLength; i++){
    password+=combination[Math.floor(((Math.random()*combination.length)))]; 
  }
  return password; 
}

function givePassword(){
  let length = getPassword.value;
  const password = generatePassword(length); 
  return password; 
}

generateButton.addEventListener('click', ()=>{
  passwordText.innerHTML = givePassword(); 
}); 


getPassword.addEventListener('keydown', (event)=>{
  console.log(event.key);   
  if(event.key === 'Enter'){
    passwordText.innerHTML = givePassword(); 
  }
});

copyButton.addEventListener('click', () => {
  const textToCopy = passwordText.textContent;
  if (!textToCopy) return;

  copyButton.innerHTML = '<img src="check.jpg">';
  navigator.clipboard.writeText(textToCopy).finally(() => {
    setTimeout(() => {
      copyButton.innerHTML = '<img src="copy.png">';
    }, 1000);
  });
});

/*
copyButton.addEventListener('click', (event)=>{
  copyButton.innerHTML = '<img src="check.jpg">' 
  if(event.target.classList.contains('password-text')){
    const passwordText = passwordText.textContent;  
    console.log(passwordText); 
    navigator.clipboard.writeText(passwordText); 
  }
  setTimeout(()=>{
    copyButton.innerHTML = '<img src="copy.png">'
  }, 1000); 
}); 
*/
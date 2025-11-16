//* list of DOM for usage stored in a variable
let num1 = document.querySelector('#num-1'); //* first num
let num2 = document.querySelector('#num-2'); //* second num
let op = document.querySelector('#op'); //* operator that will use
let input = document.querySelector('#input-box'); //* the input box for answer
let scoreBox = document.querySelector('.score-box'); //*container for feedback and score
let score = document.querySelector('.score'); //* score for update
let resetScore = document.querySelector('.reset'); //* update the score when resetting

//* score variables 
let correctCount = 0; 
let wrongCount = 0; 

/* learned from yt tutorial
  * localStorage for storing the score locally
  ? retrieves the score data from the localStorage and parse into number to display as score
*/
if(localStorage.getItem('correctAnswers')){
  correctCount = Number(localStorage.getItem('correctAnswers'))
}
if(localStorage.getItem('wrongAnswers')){
  wrongCount = Number(localStorage.getItem('wrongAnswers')); 
}
//* display the current or retrieved
scoreBox.innerHTML = `
  <p style="color: green">CORRECT: ${correctCount}</p>
  <p style="color: red">WRONG: ${wrongCount}</p>
`;

/*
  ? a function that generates arithmetic operators randomly 
  * the result of Math.random method is 0 to 1 
  * divided into four(4) sections 
  * each part represent an operator 
  * therefore the probability of each operator will appear is 25% or 1/4
*/
function generateOperator(){
  let a = 0; 
  a =  Math.random();   
  if(a >= 0 && a < 1/4){ // * '+' is  between 0  but less 1/4
    op.innerHTML = '+'; 
  } else if (a >= 1/4 && a < 2/4){ // * '-' is  between 1/4  and but less  < 2/4
    op.innerHTML = '-'; 
  } else if (a >= 2/4 && a < 3/4){ // * '*' is  between 2/4  and but less  < 3/4
    op.innerHTML = '*'; 
  } else if (a >= 3/4 && a < 1){ // * '/' is  between 3/4  and but less  < 1
    op.innerHTML = '/'; 
  }
}
generateOperator(); //* a function for the initial equation 

/*
  ? function that generates the two (2) numbers using Math.random method between 1-10
  ? division = using the formula between multiplication and division I ensure that dividend is always divisible by divisor
  * after generation the number will directly display in the web 
*/
function generateNum(){  
  //* for division it ensures that it always divisible by the divisor and no decimal
  if(op.innerHTML === '/'){
    // * derived from multiplication table 
    let divisor = Math.floor(Math.random()*10)+1;  
    let multiplier = Math.floor(Math.random()*10)+1; 
    let dividend = divisor * multiplier;  
    
    //* display random number
    num1.innerHTML = dividend; 
    num2.innerHTML = divisor;
  } else {
    //* other operators 
    let a = Math.floor(Math.random()*10)+1;
    let b = Math.floor(Math.random()*10)+1;
    num1.innerHTML = a; 
    num2.innerHTML = b;
  }
}
generateNum(); //* generate a num for starting equation


/*
  ? function that takes the displayed two numbers then return the answer 
  * the displayed operation from the browser will be matched to perform the operation
*/
function computeNum(){
  /* 
  * get the displayed two(2) and then parsed in the variable to make it a number
  *matched the displayed operation then perform it 
  */
  let n1 = Number(num1.innerHTML);
  let n2 = Number(num2.innerHTML); 
  let ans = 0; //* stored the answer for each operation 
  // *matched the displayed operation then perform it 
  if(op.innerHTML === '+'){
    ans = n1 + n2; 
  } else if (op.innerHTML === '-'){
    ans = n1 - n2; 
  } else if (op.innerHTML === '*'){
    ans = n1 * n2; 
  } else if (op.innerHTML === '/'){
    ans = n1 / n2; 
  }
  return ans; //* return the computed nums
}

/*
  ? evaluate the result of the operation and the user input
  * generates the score and result/feedbacks for the score
*/
function confirmAnswer(){
  let ans = computeNum(); //* variable from computeNum() that contains correct answer

  //*validate the input if blank or not a number (NaN)
  if(input.value.trim() === '' || isNaN(input.value)){
    alert('ENTER A VALID INPUT');
    input.value = ''; 
    return;
  }

  //* get the value of the current input  and evaluate using "==" that converts and compare
  if(input.value == ans){
    correctCount++; //* increase the correct

    //* generate HTML <p> tag with green for right ans and red for wrong
    scoreBox.innerHTML = `
    <p style="color: green" class="feedback">CORRECT: ${correctCount}</p>
    <p style="color: red" class="feedback">WRONG: ${wrongCount}</p>`;

    localStorage.setItem('correctAnswers', correctCount); //* save correct count to the local storage 

  } else { //* similar to previous one but with wrong
    wrongCount++; //* increase the wrong

    scoreBox.innerHTML = `
    <p style="color: green" class="feedback">CORRECT: ${correctCount}</p>
    <p style="color: red" class="feedback">WRONG: ${wrongCount}</p>`; 

    localStorage.setItem('wrongAnswers', wrongCount); //* save the  wrong answers to the local storage
  } 
  input.value = ''; //* reset the input box
}


/*
  ? event listener for input box
  * when user type the answer, they can use "enter" key for faster answering 
  * @param the built in keydown for reading the keyboard's key and arrow function's event, reading the updates
*/
input.addEventListener('keydown', (event)=>{
  //* after the pressing enter the code blocks inside the functions will excute again 
  if(event.key === 'Enter'){
    confirmAnswer(); 
    generateOperator(); 
    generateNum(); 
  }  
}); 

/*
  ? event listener for the reset button 
  * instantly resets the score by assigning zero to the score
  * @param the parameter is built-in "click" which reads the activity of the cursor
*/
resetScore.addEventListener('click',()=>{
  //* reset the scores
  wrongCount = 0; 
  correctCount = 0; 
  scoreBox.innerHTML = `<p style="color: gray;">SCORE HAS BEEN RESET</p>`; //*regenarate the reset score
  localStorage.clear(); //* clear the items of local storage
}); 


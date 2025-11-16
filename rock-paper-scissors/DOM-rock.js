const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function displayScore(){
  document.querySelector(".js-score").innerHTML = `Win:${score.wins} 
      Losses:${score.losses} 
      Ties:${score.ties}`;
}

displayScore();

function updateScore() {
  document.querySelector(".js-score").innerHTML = `
      Win:${score.wins} 
      Losses:${score.losses} 
      Ties:${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  document.querySelector(".js-moves").innerHTML = ''; 
  document.querySelector(".js-result  ").innerHTML = ''; 
  updateScore();
}

function pickComputerMove() {
  const randomNum = Math.random();
  let computerMove;

  if (randomNum >= 0 && randomNum < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNum >= 2 / 3 && randomNum < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}


function getResult(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "Rock") {
    if (computerMove === playerMove) {
      result = "Game Tie";
    } else if (computerMove === "Scissors") {
      result = "You Win";
    } else if (computerMove === "Paper") {
      result = "You Lose";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === playerMove) {
      result = "Game Tie";
    } else if (computerMove === "Scissors") {
      result = "You Lose";
    } else if (computerMove === "Rock") {
      result = "You Win";
    }
  } else if (playerMove === "Scissors") {
    if (computerMove === playerMove) {
      result = "Game Tie";
    } else if (computerMove === "Rock") {
      result = "You Lose";
    } else if (computerMove === "Paper") {
      result = "You Win";
    }
  }

  if (result === "Game Tie") {
    score.ties++;
  } else if (result === "You Win") {
    score.wins++;
  } else if (result === "You Lose") {
    score.losses++;
  }

  document.querySelector(".js-result").innerHTML = `${result}`;
  document.querySelector(".js-moves").innerHTML = `
      YOU
      <img src="${playerMove}-emoji.png" alt="player-move" class="move-image">
      <img src="${computerMove}-emoji.png"  class="move-image">
      COMPUTER`;
  updateScore();
  localStorage.setItem("score", JSON.stringify(score));
}

document.querySelector('#rock-button').addEventListener('click',()=>{
  getResult('Rock'); 
});
document.querySelector('#paper-button').addEventListener('click',()=>{
  getResult('Paper');
}); 
document.querySelector('#scissor-button').addEventListener('click',()=>{
  getResult('Scissors'); 
}); 
document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'r'){
    getResult('Rock'); 
  } else if (event.key === 'p'){
    getResult('Paper'); 
  } else if (event.key === 's'){
    getResult('Scissors'); 
  }
});

let isPlaying = false; 
let intervalID; 
function autoPlay(){
  if(!isPlaying){
    intervalID = setInterval(() =>{
      const playerMove = pickComputerMove(); 
      getResult(playerMove);
      isPlaying = true; 
    }, 1000)
  } else {
    clearInterval(intervalID); 
    isPlaying = false; 
  }
  
}
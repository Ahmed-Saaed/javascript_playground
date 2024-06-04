import {startConfetti, stopConfetti, removeConfetti} from './confetti.js';
const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');
const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');
const resultText = document.getElementById('resultText');

const choices = {
  rock: {name: 'Rock', defeats: ['scissors', 'lizard']},
  paper: {name: 'Paper', defeats: ['rock', 'spock']},
  scissors: {name: 'Scissors', defeats: ['paper', 'lizard']},
  lizard: {name: 'Lizard', defeats: ['paper', 'spock']},
  spock: {name: 'Spock', defeats: ['scissors', 'rock']},
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';

// select value and styling icons for computer
function displayComputerChoice() {
  //Add selected styling & computer choice

  switch (computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = '--- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = '--- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = '--- Scissors';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = '--- Spock';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = '--- Lizard';
      break;
    default:
      break;
  }
}

//update score
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.textContent = 'You Won!';
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = 'You Lost!';
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

// Reset all selected icons
function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
}

//Reset our score & player, computer chocies
function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resetSelected();
}
window.resetAll = resetAll;

// Random computer choice

function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = 'rock';
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = 'paper';
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = 'scissors';
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = 'lizard';
  } else {
    computerChoice = 'spock';
  }
}

// call function to process turn
function checkResults(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// passing player selection value and styling icons
function select(playerChoice) {
  checkResults(playerChoice);

  //Add selected styling & player choice
  switch (playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = '--- Rock';
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = '--- Paper';
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = '--- Scissors';
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = '--- Spock';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = '--- Lizard';
      break;
    default:
      break;
  }
}
window.select = select; // check why this one is not working ? - because of the module should be .js in the import statment

//Event Listeners

// on start up set initial values
resetAll();

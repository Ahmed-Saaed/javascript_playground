// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionsAmount = 0;
let equationsArray = [];
let playerGuessArray = [];
let bestScoreArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';

// Scroll
let valueY = 0;

//Refresh Splash Page Best Scores
function bestScoresToDOM() {
  bestScores.forEach((score, i) => {
    const bestScoreEl = score;
    bestScoreEl.textContent = `${bestScoreArray[i].bestScore}s`;
  });
}
// check local storage for Best Scores, set bestScoresArray
function getSavedBestScores() {
  if (localStorage.getItem('bestScores')) {
    bestScoreArray = JSON.parse(localStorage.bestScores);
  } else {
    bestScoreArray = [
      {questions: 10, bestScore: finalTimeDisplay},
      {questions: 25, bestScore: finalTimeDisplay},
      {questions: 50, bestScore: finalTimeDisplay},
      {questions: 99, bestScore: finalTimeDisplay},
    ];
    localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
  }
  bestScoresToDOM();
}

//update Best Score Array
function updateBestScore() {
  bestScoreArray.forEach((score, i) => {
    // Select the correct the best score to update
    if (questionsAmount == score.questions) {
      // return the best score as number with one decimal
      const savedBestScore = Number(bestScoreArray[i].bestScore);
      // update if the final score is less or replacing zero
      if (savedBestScore === 0 || savedBestScore > finalTime) {
        bestScoreArray[i].bestScore = finalTimeDisplay;
      }
    }
  });
  // update splash page
  bestScoresToDOM();
  //  save to local storage
  localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
}

//show score page
function showScorePage() {
  setTimeout(() => {
    playAgainBtn.hidden = false;
  }, 1000);
  gamePage.hidden = true;
  scorePage.hidden = false;
}

// Format & display Time in Dom
function scoresToDOM() {
  finalTimeDisplay = finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.toFixed(1);
  baseTimeEl.textContent = `Base Time: ${baseTime}`;
  penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`;
  finalTimeEl.textContent = `${finalTimeDisplay}s`;
  updateBestScore();
  //Scroll to Top, go to Score Page
  itemContainer.scrollTo({top: 0, behavior: 'instant'});
  showScorePage();
}

// Reset Game
function playAgain() {
  gamePage.addEventListener('click', startTimer);
  scorePage.hidden = true;
  splashPage.hidden = false;
  equationsArray = [];
  playerGuessArray = [];
  valueY = 0;
  playAgainBtn.hidden = true;
}

// stop timer , process results , go to score page
function checkTime() {
  if (playerGuessArray.length == questionsAmount) {
    clearInterval(timer);
    console.log('Player Guesses: ', playerGuessArray);

    //Check for wron Guesses, adad penalty time
    equationsArray.forEach((equation, index) => {
      if (equation.evaluated === playerGuessArray[index]) {
        //correct Guess, No Penalty
      } else {
        // Incorrect Guess, Add Penalty
        penaltyTime += 0.5;
      }
    });
    console.log('', questionsAmount, playerGuessArray.length);
    finalTime = timePlayed + penaltyTime;
    console.log(
      'time: ',
      timePlayed,
      'penalty x0.5: ',
      penaltyTime,
      'final: ',
      finalTime
    );
    scoresToDOM();
  }
}

// Add a tenth of a second to time played
function addTime() {
  timePlayed += 0.1;
  checkTime();
}

//start timer when game page is clicked
function startTimer() {
  // Reset times
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
  timer = setInterval(addTime, 100);
  gamePage.removeEventListener('click', startTimer);
}

// Scroll, Store the user Selection
function select(guessedTrue) {
  //scroll 80 pixels

  valueY += 80;
  itemContainer.scroll(0, valueY);
  // Add player guess to array
  return guessedTrue
    ? playerGuessArray.push('true')
    : playerGuessArray.push('false');
}

// Displays Game Page
function showGamePage() {
  gamePage.hidden = false;
  countdownPage.hidden = true;
}
// Get Random Number up to a max number
function GetRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = GetRandomInt(questionsAmount);
  // Set amount of wrong equations
  const wrongEquations = questionsAmount - correctEquations;
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = GetRandomInt(9);
    secondNumber = GetRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = {value: equation, evaluated: 'true'};
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = GetRandomInt(9);
    secondNumber = GetRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = GetRandomInt(2);
    const equation = wrongFormat[formatChoice];
    equationObject = {value: equation, evaluated: 'false'};
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);

  console.log(
    'wrongEquations: ',
    wrongEquations,
    'correctEquations: ',
    correctEquations
  );
}

// Add Equations to DOM
function equationToDOM() {
  equationsArray.forEach((equation) => {
    // ITem
    const item = document.createElement('div');
    item.classList.add('item');
    //equation text
    const equationText = document.createElement('h1');
    equationText.textContent = equation.value;
    // append
    item.appendChild(equationText);
    itemContainer.appendChild(item);
  });
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationToDOM();
  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

// diplays 3,2,1 go
function countdownStart() {
  countdown.textContent = '3';

  setTimeout(() => {
    countdown.textContent = '2';
  }, 1000);

  setTimeout(() => {
    countdown.textContent = '1';
  }, 2000);

  setTimeout(() => {
    countdown.textContent = 'GO!';
  }, 3000);

  // let count = 3;
  // countTimer = setInterval(() => {
  //   if (count === -1) {
  //     countdown.textContent = 'Go!';
  //     clearInterval(countTimer);
  //   } else {
  //     countdown.textContent = count;
  //     count--;
  //   }
  // }, 500);
}

// Navigate from Splash Page to Countdown Page
function showCountdown() {
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdownStart();
  populateGamePage();
  setTimeout(showGamePage, 4000);
}
// Get the value from our selected radio button
function getRadioValue() {
  let radioValue;
  radioInputs.forEach((radioInput) => {
    if (radioInput.checked) {
      radioValue = radioInput.value;
    }
  });
  return radioValue; //keep it out of the loop
}

// Form that decides amount of questions
function selectQuestionAmount(e) {
  e.preventDefault();
  questionsAmount = getRadioValue();
  if (questionsAmount) showCountdown();
}

startForm.addEventListener('click', () => {
  radioContainers.forEach((radioElement) => {
    // Remove the selected label from each one
    radioElement.classList.remove('selected-label');
    // Add it back if the radio input is checked
    if (radioElement.children[1].checked) {
      radioElement.classList.add('selected-label');
    }
  });
});

// EventListeners

startForm.addEventListener('submit', selectQuestionAmount);
gamePage.addEventListener('click', startTimer);

// OnLoad

getSavedBestScores();

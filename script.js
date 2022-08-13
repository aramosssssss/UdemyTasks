'use strict';

//elements selection
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

//game initial conditions
let totalScores, currentScore, activePlayer, isPlaying;
const initGame = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.remove('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');
  diceElement.classList.add('hidden');
};
initGame();

const scwitchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//Roll the dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    //1generate random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);
    //2display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;
    //3 if the number 1, switch on the next player,if not add number to current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      scwitchActivePlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    //1. add current score to active player total score
    totalScores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    //2. if total score of active player >=100, active player won, if not - switch active player
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      scwitchActivePlayer();
    }
  }
});
// button new game
btnNew.addEventListener('click', initGame);

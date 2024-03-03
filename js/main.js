const playButton = document.getElementById('play');
const levelConatiner = document.getElementById('level');
const highScorecontainer = document.getElementById('high-score');
const board = document.querySelector('.board');
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const yellow = document.querySelector('.yellow');
const tiles = [green, red, blue, yellow];

const colors = ['green', 'red', 'blue', 'yellow'];

let computerChoices = [];
let playerChoices = [];
let level = 0;
let highScore = 0;

playButton.addEventListener('click', play);

function reset() {
  level = 0;
  computerChoices = [];
  playerChoices = [];
  levelConatiner.innerText = level;
  board.classList.add('unclickable');
}

function play() {
  nextLevel();
}

function nextLevel() {
  level++;
  if (level > highScore) {
    highScore = level - 1;
    highScorecontainer.innerText = highScore;
  }
  levelConatiner.innerText = level;
  computerChoices.push(colors[Math.floor(Math.random() * 4)]);
  computerDisplay();
}

function computerDisplay() {
  for (let i = 0; i < computerChoices.length; i++) {
      setTimeout(() => {
        const tile = document.querySelector('.' + computerChoices[i]);
        board.classList.add('unclickable');
        playAudio(computerChoices[i]);
        tile.classList.remove('inactive');
        setTimeout(() => {
          tile.classList.add('inactive');
          board.classList.remove('unclickable');
        }, 500);
      }, i * 800);
  }
}

function playerClick(clickedColor) {
  playerChoices.push(clickedColor);
  playAudio(clickedColor);
  for (let i = 0; i < playerChoices.length; i++) {
    if (playerChoices[i] != computerChoices[i]) {
      alert('YOU LOSE!');
      const audio = new Audio('sounds/game-over.wav');
      audio.play();
      reset();
      return;
    }
  }
  if (playerChoices.length == computerChoices.length) {
    if (level == 12) {
      const audio = new Audio('sounds/game-win.wav');
      audio.play();
      alert('YOU WIN!');
      highScorecontainer.innerText = 12;
      reset();
    }
    else {
      playerChoices = [];
      setTimeout(nextLevel, 800);
    }
  }
}

function playAudio(audioName) {
  const audio = new Audio(`sounds/${audioName}.mp3`);
  audio.play();
}

tiles.forEach ((color, i) => {
  color.addEventListener('click', () => playerClick(colors[i]));
});
const playButton = document.querySelector('#play');
const highScore = document.querySelector('#high-score');
const levelConatiner = document.querySelector('#level');
const tiles = document.querySelectorAll('.tile');
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const yellow = document.querySelector('.yellow');

const colors = ['green', 'red', 'blue', 'yellow'];

let computerChoices = [];
let playerChoices = [];
let level = 0;

playButton.addEventListener('click', play);

function play() {
  level = 0;
  computerChoices = [];
  playerChoices = [];
  levelConatiner.innerText = level;
  nextLevel();
}

function nextLevel() {
  level++;
  levelConatiner.innerText = level;
  computerChoices.push(colors[Math.floor(Math.random() * 4)]);
  computerDisplay();
}

function computerDisplay() {
  for (let i = 0; i < computerChoices.length; i++) {
      setTimeout(() => {
        document.querySelector('.' + computerChoices[i]).classList.add('unclickable');
        playAudio(computerChoices[i]);
        document.querySelector('.' + computerChoices[i]).classList.remove('inactive');
        setTimeout(() => {
          document.querySelector('.' + computerChoices[i]).classList.add('inactive');
        }, 500);
      }, i * 800);
  }
  playerChoices();
}

function playAudio(audioName) {
  const audio = new Audio(`sounds/${audioName}.mp3`);
  audio.play();
}
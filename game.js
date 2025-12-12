const themeMenuButton = document.getElementById("themeMenuButton");
const themeMenuDropdown = document.getElementById("themeMenuDropdown");
const themeDefaultBtn = document.getElementById("themeDefault");
const themePastelBtn = document.getElementById("themePastel");
const themeDarkBtn = document.getElementById("themeDark");

function applySavedTheme() {
  const saved = localStorage.getItem("theme") || "default";
  document.body.classList.remove("theme-pastel", "theme-dark");
  if (saved === "pastel") document.body.classList.add("theme-pastel");
  if (saved === "dark") document.body.classList.add("theme-dark");
}

function saveTheme(value) {
  localStorage.setItem("theme", value);
  applySavedTheme();
}

applySavedTheme();

themeMenuButton.addEventListener("click", function (event) {
  event.stopPropagation();
  themeMenuDropdown.classList.toggle("open");
});

document.addEventListener("click", function () {
  themeMenuDropdown.classList.remove("open");
});

themeDefaultBtn.addEventListener("click", function () {
  saveTheme("default");
  themeMenuDropdown.classList.remove("open");
});

themePastelBtn.addEventListener("click", function () {
  saveTheme("pastel");
  themeMenuDropdown.classList.remove("open");
});

themeDarkBtn.addEventListener("click", function () {
  saveTheme("dark");
  themeMenuDropdown.classList.remove("open");
});

const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");

const playerChoiceText = document.getElementById("playerChoice");
const computerChoiceText = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");

const rpsEffect = document.getElementById("rpsEffect");
const confetti = document.getElementById("confetti");

const choices = ["Rock", "Paper", "Scissors"];

const sadSound = new Audio("sounds/sad-horn.mp3");
const cheerSound = new Audio("sounds/cheer.mp3");

sadSound.volume = 0.3;
cheerSound.volume = 0.1;

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function clearEffects() {
  rpsEffect.textContent = "";
  confetti.innerHTML = "";
}

function playLoseEffect() {
  clearEffects();
  rpsEffect.textContent = "🥺";
  sadSound.currentTime = 0;
  sadSound.play();
}

function playWinEffect() {
  clearEffects();
  rpsEffect.textContent = "🎉";
  cheerSound.currentTime = 0;
  cheerSound.play();

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDelay = Math.random() * 0.4 + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.appendChild(piece);
  }

  setTimeout(function () {
    confetti.innerHTML = "";
  }, 1400);
}

function playGame(playerChoice) {
  const computerChoice = getComputerChoice();

  playerChoiceText.textContent = "Your choice: " + playerChoice;
  computerChoiceText.textContent = "Computer choice: " + computerChoice;

  clearEffects();

  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie!";
    return;
  }

  const playerWins =
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper");

  if (playerWins) {
    resultText.textContent = "You win!";
    playWinEffect();
  } else {
    resultText.textContent = "You lose!";
    playLoseEffect();
  }
}

rockBtn.addEventListener("click", function () {
  playGame("Rock");
});

paperBtn.addEventListener("click", function () {
  playGame("Paper");
});

scissorsBtn.addEventListener("click", function () {
  playGame("Scissors");
});

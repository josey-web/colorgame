// Predefined colors for the game
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "cyan",
  "lime",
  "teal",
];

// Select necessary DOM elements
const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");
const nextRoundButton = document.getElementById("nextRoundButton");
const resetButton = document.getElementById("resetButton");

// Initialize score
let score = 0;
let targetColor = "";

// Function to generate a random color from the predefined colors
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to start a new game or first round
function startNewGame() {
  score = 0; // Reset score
  scoreDisplay.textContent = `Score: ${score}`;
  startNewRound(); // Start the first round
}

// Function to start the next round
function startNewRound() {
  // Select a random target color
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  // Clear previous status
  gameStatus.textContent = "";

  // Generate random color options
  const shuffledColors = shuffle(colors);
  colorOptionsContainer.innerHTML = "";
  shuffledColors.slice(0, 6).forEach((color) => {
    const colorButton = document.createElement("button");
    colorButton.style.backgroundColor = color;
    colorButton.classList.add("shadow")
    colorButton.setAttribute("data-testid", "colorOption");
    colorButton.addEventListener("click", () => checkGuess(color));
    colorOptionsContainer.appendChild(colorButton);
  });

  // Disable the Next Round button initially
  nextRoundButton.disabled = true;
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Function to check the player's guess
function checkGuess(guess) {
  if (guess === targetColor) {
    gameStatus.textContent = "Correct!";
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    nextRoundButton.disabled = false; // Enable Next Round button
  } else {
    gameStatus.textContent = "Wrong! Try again.";
  }
}

// Event listener for the New Game button (Resets the game completely)
newGameButton.addEventListener("click", startNewGame);

// Event listener for the Next Round button (Moves to the next round without waiting)
nextRoundButton.addEventListener("click", startNewRound);

// Event listener for the Reset button (Resets the entire game)
resetButton.addEventListener("click", startNewGame);

// Start the first game
startNewGame();

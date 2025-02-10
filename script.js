const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");
const resetButton = document.getElementById("resetButton");

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

  // Previous status
  gameStatus.textContent = "Select a matching color";

  // Generate 5 random incorrect color options
  const incorrectColors = shuffle(
    colors.filter((color) => color !== targetColor)
  ).slice(0, 5);

  // Add the correct target color to the list of options
  const options = [...incorrectColors, targetColor];

  // Shuffle the options to randomize the target color's position
  const finalOptions = shuffle(options);

  // Create buttons for the options
  colorOptionsContainer.innerHTML = "";
  finalOptions.forEach((color) => {
    const colorButton = document.createElement("button");
    colorButton.style.backgroundColor = color;
    colorButton.classList.add("shadow");
    colorButton.setAttribute("data-testid", "colorOption");
    colorButton.addEventListener("click", () => checkGuess(color));
    colorOptionsContainer.appendChild(colorButton);
  });

}

// Function to shuffle an array
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Function to check the player's guess
function checkGuess(guess) {
  if (guess === targetColor) {
    gameStatus.textContent = "Correct!🎉";
    score++;
    scoreDisplay.textContent = `Score: ${score}`;

    setTimeout(() => startNewRound(), 2000);
  } else {
    gameStatus.textContent = "Wrong! Try again.😌";
  }
}

// Event listener for the New Game button (Resets the game completely)
newGameButton.addEventListener("click", startNewGame);

// Start the first game
startNewGame();

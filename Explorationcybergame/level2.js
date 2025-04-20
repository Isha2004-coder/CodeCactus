const emails = [
  { image: "level2img1.png", isPhishing: true },
  { image: "level2img2.png", isPhishing: false },
  // Add more emails if needed
];

let currentEmailIndex = 0;
let score = 0;

// Sound variables
const correctSound = new Audio("correct.mp3"); // Correct answer sound
const incorrectSound = new Audio("incorrect.mp3"); // Incorrect answer sound
const drumrollSound = new Audio("drumroll.mp3"); // Drumroll sound for completion

const playAgainBtn = document.getElementById("play-again-btn");
const homeBtn = document.getElementById("home-btn");
const emailDisplay = document.getElementById("email-display");
const feedback = document.getElementById("feedback");
const scoreboard = document.getElementById("score");
const emailNumber = document.getElementById("level");
const popup = document.getElementById("popup");
const startBtn = document.getElementById("start-btn");
const greenFlagBtn = document.getElementById("green-flag-btn");
const redFlagBtn = document.getElementById("red-flag-btn");
const tryAgainBtn = document.getElementById("try-again-btn");
const gameContainer = document.getElementById("game-container");
const completionScreen = document.getElementById("completion-screen");

// Load the current email
function loadEmail() {
  if (currentEmailIndex >= emails.length) {
    // All emails completed, show final score and transition to congratulations
    feedback.textContent = `✨ You finished this task! Final Score: ${score}`;
    setTimeout(() => {
      showCompletionMessage(); // Show completion message after delay
    }, 1500); // Delay before showing the congratulatory message
    return;
  }

  emailNumber.textContent = currentEmailIndex + 1;
  emailDisplay.innerHTML = `<img src="${emails[currentEmailIndex].image}" alt="Email Screenshot" class="email-img">`;

  feedback.textContent = "";
  greenFlagBtn.style.display = "inline-block";
  redFlagBtn.style.display = "inline-block";
  tryAgainBtn.style.display = "none";
}

// Handle user selection for phishing or not phishing
function handleFlagClick(userChoice) {
  const correctAnswer = emails[currentEmailIndex].isPhishing ? "red" : "green";

  if (userChoice === correctAnswer) {
    score += 10; // Add 10 points for correct answer
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    scoreboard.textContent = score;
    currentEmailIndex++;

    // Play correct answer sound
    correctSound.play();

    greenFlagBtn.style.display = "none";
    redFlagBtn.style.display = "none";
    tryAgainBtn.style.display = "none";

    setTimeout(() => {
      loadEmail(); // Load the next email after a brief delay
    }, 1500);
  } else {
    feedback.textContent = "❌ Incorrect! Try again.";
    feedback.style.color = "red";

    // Play incorrect answer sound
    incorrectSound.play();

    greenFlagBtn.style.display = "none";
    redFlagBtn.style.display = "none";
    tryAgainBtn.style.display = "inline-block";
  }
}

// Show completion message and transition to congrats screen
function showCompletionMessage() {
  document.getElementById("completion-screen").style.display = "block"; // Show congrats screen
  document.getElementById("game-container").style.display = "none"; // Hide game container
  document.body.style.backgroundImage = "none"; // Hide background image

  // Play drumroll sound for the completion
  drumrollSound.play();

  // Optionally, you can add a background color to the body for a clean look
  document.body.style.backgroundColor = "#fffae5"; // Light yellow color as background
}

// Button click handlers
greenFlagBtn.onclick = () => handleFlagClick("green");
redFlagBtn.onclick = () => handleFlagClick("red");

// Start Level 2
startBtn.onclick = () => {
  popup.style.display = "none";
  gameContainer.style.display = "block";
  loadEmail();
};

// Try again logic for incorrect answers
tryAgainBtn.onclick = () => {
  feedback.textContent = "";
  tryAgainBtn.style.display = "none";
  greenFlagBtn.style.display = "inline-block";
  redFlagBtn.style.display = "inline-block";
};

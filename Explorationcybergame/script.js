// Initialize the DOM elements and game variables
const flag = document.getElementById("flag");
const submitBtn = document.getElementById("submit-btn");
const tryAgainBtn = document.getElementById("try-again-btn");
const seeCorrectBtn = document.getElementById("see-correct-btn");
const nextEmailBtn = document.getElementById("next-email-btn");
const completionMessage = document.getElementById("completion-message");
const startLevel2Btn = document.getElementById("start-level-2-btn");
const feedback = document.getElementById("feedback");
const emailDisplay = document.getElementById("email-display");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");

let score = 0; // Score starts from 0
let level = 0; // Starting from level 0 (Level 1)
let tryAgainAttempts = 0;
let currentEmail = null;

// Load sound effects
const correctSound = new Audio("correct.mp3"); // Replace with actual sound file
const incorrectSound = new Audio("incorrect.mp3"); // Replace with actual sound file
const drumrollSound = new Audio("drumroll.mp3"); // Replace with actual sound file

const emails = [
  {
    from: { text: "support@amaz0n-updates.com", phishy: true },
    subject: { text: "Your urgent account alert!", phishy: false },
    body: {
      text: "Click here to verify your account now or your access will be blocked.",
      phishy: true,
    },
    isPhishing: true,
  },
  {
    from: { text: "info@banksecure-login.com", phishy: true },
    subject: { text: "Unusual login detected", phishy: false },
    body: {
      text: "Please login to confirm your identity.",
      phishy: true,
    },
    isPhishing: true,
  },
  // ... Add more emails
];

// Ensure the level is valid
function ensureValidLevel() {
  if (level >= emails.length) {
    level = emails.length - 1; // Clamp level to the highest email index
    localStorage.setItem("level", level);
  }
}

// Function to load the email content and setup interactions
function loadEmail() {
  ensureValidLevel();
  const current = emails[level];
  currentEmail = current;

  // Display the email content
  emailDisplay.innerHTML = `
    <p><strong>From:</strong> <span class="droppable" data-phishy="${current.from.phishy}">${current.from.text}</span></p>
    <p><strong>Subject:</strong> <span class="droppable" data-phishy="${current.subject.phishy}">${current.subject.text}</span></p>
    <p><strong>Message:</strong><br><span class="droppable" data-phishy="${current.body.phishy}">${current.body.text}</span></p>
  `;

  // Set up drag-and-drop functionality for flagged elements
  document.querySelectorAll(".droppable").forEach((el) => {
    el.classList.remove("flagged");
    el.removeAttribute("data-flagged");
    el.addEventListener("dragover", (e) => e.preventDefault());
    el.addEventListener("drop", (e) => {
      e.preventDefault();
      el.classList.add("flagged");
      el.dataset.flagged = "true";
    });
  });

  // Update level display
  levelEl.textContent = `${level + 1}`;
  feedback.textContent = "";
  tryAgainBtn.style.display = "none";
  seeCorrectBtn.style.display = "none";
  nextEmailBtn.style.display = "none";
  submitBtn.style.display = "block";
}

// Handle submit button click
submitBtn.addEventListener("click", () => {
  const drops = document.querySelectorAll(".droppable");
  let correct = 0;
  let flagged = 0;
  let totalPhishy = 0;

  drops.forEach((el) => {
    const isPhishy = el.dataset.phishy === "true";
    const isFlagged = el.dataset.flagged === "true";
    if (isPhishy) totalPhishy++;
    if (isFlagged) flagged++;
    if (isPhishy && isFlagged) correct++;
  });

  // Check if the correct number of items are flagged
  if (correct === totalPhishy && flagged === correct) {
    score += 10;
    scoreEl.textContent = score;
    feedback.textContent = "\uD83C\uDF89 Correct! Moving to next email...";
    feedback.style.color = "green";

    // Play correct sound
    correctSound.play();

    setTimeout(() => {
      if (level < emails.length - 1) {
        level++;
        tryAgainAttempts = 0;
        localStorage.setItem("score", score);
        localStorage.setItem("level", level);
        loadEmail(); // Load the next email
      } else {
        // All emails completed, show congrats
        feedback.textContent = `\uD83C\uDF35 Great job! You've completed the quiz! Final Score: ${score}`;

        setTimeout(() => {
          window.location.href = "congrats.html"; // Redirect to the congratulatory page
        }, 2000);
      }
    }, 1500);
  } else {
    feedback.textContent = "\u274C Some flags are incorrect. Try again!";
    feedback.style.color = "red";

    // Play incorrect sound
    incorrectSound.play();

    tryAgainBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
    tryAgainAttempts++;
    if (tryAgainAttempts >= 2) {
      seeCorrectBtn.style.display = "inline-block";
      tryAgainBtn.style.display = "none"; // ✅ Hide Try Again when See Correct is shown
    }
  }
});

// Handle "try again" button click
tryAgainBtn.addEventListener("click", () => {
  document.querySelectorAll(".droppable").forEach((el) => {
    el.classList.remove("flagged");
    el.removeAttribute("data-flagged");
  });
  feedback.textContent = "";
  tryAgainBtn.style.display = "none";
  seeCorrectBtn.style.display = "none";
  submitBtn.style.display = "block";
});

// Handle "see correct" button click
seeCorrectBtn.addEventListener("click", () => {
  document.querySelectorAll(".droppable").forEach((el) => {
    if (el.dataset.phishy === "true") {
      el.classList.add("flagged");
      el.dataset.flagged = "true";
    } else {
      el.classList.remove("flagged");
      el.removeAttribute("data-flagged");
    }
  });
  feedback.textContent = "\u2705 These are the correct flags!";
  feedback.style.color = "green";
  tryAgainBtn.style.display = "none";
  seeCorrectBtn.style.display = "none";
  submitBtn.style.display = "none";
  nextEmailBtn.style.display = "inline-block";
});

// Handle "next email" button click
nextEmailBtn.addEventListener("click", () => {
  level++;
  tryAgainAttempts = 0;
  nextEmailBtn.style.display = "none";
  localStorage.setItem("level", level);
  if (level < emails.length) {
    loadEmail(); // Load the next email
  } else {
    // All emails completed, show congrats
    feedback.textContent = `\u2728 You finished this task! Final Score: ${score}`;

    // Play drumroll sound before redirect
    drumrollSound.play();

    setTimeout(() => {
      window.location.href = "congrats.html"; // Redirect to the congratulatory page
    }, 1500);
  }
});

// Call loadEmail initially to load the first email
loadEmail();


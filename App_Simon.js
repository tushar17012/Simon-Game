let gameSeq = [];
let userSeq = [];
let level = 0;
let highest_Score = 0;
const colors = ["red", "green", "blue", "yellow"];
let started = false;

const levelText = document.querySelector("h2");
const allButtons = document.querySelectorAll(".btn");

// ✅ Start game on any keypress
document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    levelText.innerText = `Level ${level}`;
    nextLevel();
  }
});

// ✅ Generate next level
function nextLevel() {
  userSeq = [];
  level++;
  levelText.innerText = `Level ${level}`;

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSeq.push(randomColor);

  const button = document.querySelector(`#${randomColor}`);
  flashButton(button);
  console.log("Game Sequence:", gameSeq);
}

// ✅ Flash a button
function flashButton(button) {
  if (!button) return;
  button.classList.add("flash");
  setTimeout(() => button.classList.remove("flash"), 300);
}

// ✅ Handle user button click
function handleUserClick() {
  const selectedColor = this.id;
  userSeq.push(selectedColor);
  flashButton(this);
  console.log("User Sequence:", userSeq);

  checkAnswer(userSeq.length - 1);
}

// ✅ Compare user input to game sequence
function checkAnswer(currentIndex) {
  if (userSeq[currentIndex] === gameSeq[currentIndex]) {
    if (userSeq.length === gameSeq.length) {
      document.body.classList.add("game-next-level");
      setTimeout(() => {
        document.body.classList.remove("game-next-level");
        nextLevel();
      }, 1000);
    }
  } else {
    // ✅ Fix: Update high score correctly
    if (level > highest_Score) {
      highest_Score = level;
    }

    levelText.innerHTML = `Wrong! Press any key to restart.<br>Your Score: <b>${level}</b> | Highest Score: <b>${highest_Score}</b>`;
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 300);
    resetGame();
  }
}

// ✅ Reset game state
function resetGame() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  started = false;
}

// ✅ Set up button event listeners
allButtons.forEach((btn) => {
  btn.addEventListener("click", handleUserClick);
});

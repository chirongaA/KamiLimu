const metaphors = [
  "🧍 You as a Person",
  "🎭 Dr. C",
  "🪙 Steelie",
  "🪞 Mirror",
  "📖 Chapter",
  "🌵 Cactus Leaf",
  "🔪 Swiss Knife",
  "♟️ Chess Board"
];

const explanations = {
  "🧍 You as a Person": "Scholarship prep made me pause and ask: Why am I doing this? That inward journey reminded me that personal clarity is the first step toward opportunity.",
  "🎭 Dr. C": "Like Dr. C, scholarship essays aren’t as rigid as they seem — formality and storytelling can coexist. That balance is what brings them to life.",
  "🪙 Steelie": "A steelie is small but powerful. Even when I doubt myself, I’m learning that showing up, applying, and risking rejection is a power move.",
  "🪞 Mirror": "I realized that the things I crave — connection, growth, peace — are mirrored in others too. We’re not as alone as we think.",
  "📖 Chapter": "Failure isn’t the whole story — just one chapter. And every chapter is a chance to rewrite the next with intention and strength.",
  "🌵 Cactus Leaf": "Every problem looks spiky from the outside — but digging deeper helps reveal the real issue beneath. That’s where responsible solutions start.",
  "🔪 Swiss Knife": "The most powerful tools in public speaking are small — a pause, a gesture, a smile. Like a Swiss knife, subtlety holds strength.",
  "♟️ Chess Board": "Same pieces, same board — yet every speech is a new game. I’ve learned that storytelling evolves, and no script is ever final."
};

let boxes = [];
let score = 0;
let remaining = 16;

const grid = document.getElementById('grid');
const resultTitle = document.getElementById('resultTitle');
const resultText = document.getElementById('resultText');
const resultCard = document.getElementById('resultCard');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

function shufflePresents() {
  let outcomes = [...metaphors.map(m => ({ type: 'win', content: m }))];
  for (let i = 0; i < 8; i++) outcomes.push({ type: 'lose' });
  outcomes = outcomes.sort(() => Math.random() - 0.5);

  grid.innerHTML = '';
  const gridWidth = grid.clientWidth;
  const gridHeight = grid.clientHeight;

  boxes = outcomes.map((outcome, i) => {
    const div = document.createElement('div');
    div.classList.add('box');
    div.textContent = `Box ${i + 1}`;

    const randX = Math.random() * (gridWidth - 120);
    const randY = Math.random() * (gridHeight - 120);
    div.style.left = `${randX}px`;
    div.style.top = `${randY}px`;

    div.onclick = () => openBox(div, outcome);
    grid.appendChild(div);
    return div;
  });
}

function openBox(box, outcome) {
  if (box.classList.contains('disabled')) return;
  box.classList.add('disabled');
  remaining--;

  if (outcome.type === 'win') {
    score++;
    resultTitle.textContent = outcome.content;
    resultText.textContent = explanations[outcome.content];
    winSound.play();
  } else {
    resultTitle.textContent = "Oops!";
    resultText.textContent = "You got nothing!!";
    loseSound.play();
  }

  updateScore();
  resultCard.style.display = 'block';

  if (remaining === 0) {
    restartBtn.style.display = 'block';
  } else {
    setTimeout(() => reshufflePositions(), 400);
  }
}

function reshufflePositions() {
  const gridWidth = grid.clientWidth;
  const gridHeight = grid.clientHeight;
  boxes.forEach(box => {
    if (!box.classList.contains('disabled')) {
      const randX = Math.random() * (gridWidth - 120);
      const randY = Math.random() * (gridHeight - 120);
      box.style.left = `${randX}px`;
      box.style.top = `${randY}px`;
    }
  });
}

function closeCard() {
  resultCard.style.display = 'none';
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score} | Remaining: ${remaining}`;
}

function restartGame() {
  score = 0;
  remaining = 16;
  restartBtn.style.display = 'none';
  resultCard.style.display = 'none';
  shufflePresents();
  updateScore();
}

// Initialize
shufflePresents();
updateScore();

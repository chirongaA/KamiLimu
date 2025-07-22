const metaphors = [
  {
    type: 'win',
    content: " You as a Person",
    explanation: "Scholarship prep made me pause and ask: Why am I doing this? That inward journey reminded me that personal clarity is the first step toward opportunity.",
    image: "images/self.avif"
  },
  {
    type: 'win',
    content: " Dr. C",
    explanation: "Like Dr. C, scholarship essays aren’t as rigid as they seem — formality and storytelling can coexist. That balance is what brings them to life.",
    image: "images/dr-c.jpg"
  },
  {
    type: 'win',
    content: " Steelie",
    explanation: "A steelie is small but powerful. Even when I doubt myself, I’m learning that showing up, applying, and risking rejection is a power move.",
    image: "images/steelie.jpg"
  },
  {
    type: 'win',
    content: " Mirror",
    explanation: "I realized that the things I crave — connection, growth, peace — are mirrored in others too. We’re not as alone as we think.",
    image: "images/mirror.png"
  },
  {
    type: 'win',
    content: " Chapter",
    explanation: "Failure isn’t the whole story — just one chapter. And every chapter is a chance to rewrite the next with intention and strength.",
    image: "images/chapter.jpg"
  },
  {
    type: 'win',
    content: " Cactus Leaf",
    explanation: "Every problem looks spiky from the outside — but digging deeper helps reveal the real issue beneath. That’s where responsible solutions start.",
    image: "images/cactus.jpg"
  },
  {
    type: 'win',
    content: " Swiss Knife",
    explanation: "The most powerful tools in public speaking are small — a pause, a gesture, a smile. Like a Swiss knife, subtlety holds strength.",
    image: "images/sknife.jpeg"
  },
  {
    type: 'win',
    content: " Chess Board",
    explanation: "Same pieces, same board — yet every speech is a new game. I’ve learned that storytelling evolves, and no script is ever final.",
    image: "images/chess.jpg"
  }
];

const explanations = {
  " You as a Person": "Scholarship prep made me pause and ask: Why am I doing this? That inward journey reminded me that personal clarity is the first step toward opportunity.",
  " Dr. C": "Like Dr. C, scholarship essays aren’t as rigid as they seem — formality and storytelling can coexist. That balance is what brings them to life.",
  " Steelie": "A steelie is small but powerful. Even when I doubt myself, I’m learning that showing up, applying, and risking rejection is a power move.",
  " Mirror": "I realized that the things I crave — connection, growth, peace — are mirrored in others too. We’re not as alone as we think.",
  " Chapter": "Failure isn’t the whole story — just one chapter. And every chapter is a chance to rewrite the next with intention and strength.",
  " Cactus Leaf": "Every problem looks spiky from the outside — but digging deeper helps reveal the real issue beneath. That’s where responsible solutions start.",
  " Swiss Knife": "The most powerful tools in public speaking are small — a pause, a gesture, a smile. Like a Swiss knife, subtlety holds strength.",
  " Chess Board": "Same pieces, same board — yet every speech is a new game. I’ve learned that storytelling evolves, and no script is ever final."
};

let boxes = [];
let score = 0;
let remaining = 16;
let winCount = 0;
let missCount = 0;

const grid = document.getElementById('grid');
const resultTitle = document.getElementById('resultTitle');
const resultText = document.getElementById('resultText');
const resultImage = document.getElementById('resultImage');
const resultCard = document.getElementById('resultCard');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const winCountDisplay = document.getElementById('winCount');
const missCountDisplay = document.getElementById('missCount');


function shufflePresents() {
let outcomes = metaphors.map(m => ({ ...m })); 
  for (let i = 0; i < 8; i++) outcomes.push({ type: 'lose' });

  outcomes = outcomes.sort(() => Math.random() - 0.5);
  grid.innerHTML = ''; // ⬅️ Clears old cards

  outcomes.forEach((outcome, i) => {
    const div = document.createElement('div');
    div.classList.add('box');
    div.textContent = `Box ${i + 1}`;
    div.onclick = () => openBox(div, outcome);
    grid.appendChild(div);
  });
}



function openBox(box, outcome) {
  if (box.classList.contains('disabled')) return;
  box.classList.add('disabled');
  remaining--;

  const resultImage = document.getElementById('resultImage');

  if (outcome.type === 'win') {
    score++;
    winCount++; // optional if you're tracking wins
    resultTitle.textContent = outcome.content;
    resultText.textContent = outcome.explanation;
    resultImage.src = outcome.image;
    resultImage.style.display = 'block';
    winSound.play();
  } else {
    missCount++;
    resultTitle.textContent = "Oops!";
    resultText.textContent = "You got nothing!!";
    resultImage.style.display = 'none';
    loseSound.play();
  }

  updateScore();
  winCountDisplay.textContent = winCount;
  missCountDisplay.textContent = missCount;
  resultCard.style.display = 'none'; // Hide first just in case
  resultCard.style.animation = 'none'; // Clear previous animation
  void resultCard.offsetWidth;        // Force reflow
  resultCard.style.animation = 'zoomIn 0.4s ease-out forwards';
  resultCard.style.display = 'block'; // Now show with animation

  if (winCount === 8) {
    setTimeout(() => {
      alert(" You've found all 8 metaphors! Let's play again.");
      restartGame();
    }, 1500); // Delay to let user read the last card
  } else if (remaining === 0) {
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
  remaining = 0; 
  winCount = 0;
  missCount = 0; 
  winCountDisplay.textContent = '0';
  missCountDisplay.textContent = '0';
  scoreDisplay.textContent = 'Score: 0 | Remaining: 16';
  restartBtn.style.display = 'none';
  resultCard.style.display = 'none';
  shufflePresents();
  updateScore();
}

// Initialize
shufflePresents();
updateScore();

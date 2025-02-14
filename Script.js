const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');

// Settings
const box = 20; // Snake and the food size
const rows = canvas.height / box;
const cols = canvas.width / box;

// Starting Position
let snake = [{ x: 5 * box, y: 5 * box }];
let direction = 'RIGHT';

// Food
let food = {
  x: Math.floor(Math.random() * cols) * box,
  y: Math.floor(Math.random() * rows) * box,
};

// Score
let score = 0;

// Game Over Flag
let isGameOver = false;

// Pause State
let isPaused = false;

// Snake (Draw)
function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(segment.x, segment.y, box, box);
  });
}

// Food (Draw)
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);
}

// Movement
function moveSnake() {
  let head = { ...snake[0] };

  if (direction === 'RIGHT') head.x += box;
  if (direction === 'LEFT') head.x -= box;
  if (direction === 'UP') head.y -= box;
  if (direction === 'DOWN') head.y += box;

  snake.unshift(head);

  // Eating Food 
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * cols) * box,
      y: Math.floor(Math.random() * rows) * box,
    };
  } else {
    snake.pop();
  }
}

// Crash Control
function checkCollision() {
  if (isGameOver) return; // Prevent multiple alerts

  const head = snake[0];

  // Crash Wall
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
    isGameOver = true; // Set the game over flag
    alert(`Game Over! Score: ${score}`);
    document.location.reload();
    return;
  }

  // Crash Own Body
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      isGameOver = true; // Set the game over flag
      alert(`Game Over! Score: ${score}`);
      document.location.reload();
      return;
    }
  }
}

// Direction
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT'; 
  if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Pause/Resume Game
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    isPaused = !isPaused; // Toggle pause state
    if (isPaused) {
      alert("Game Paused. Press Esc to resume.");
    }
  }
});

// Game Loop
function gameLoop() {
  if (isPaused || isGameOver) return; // Stop updating if paused or game over

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}
// Game Speed
setInterval(gameLoop, 150);  

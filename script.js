const boxes = document.querySelectorAll('.box');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

// Winning combinations
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Variable to track the current player
let currentPlayer = '❌';

// Function to check for a winner
function checkWinner() {
  winningCombinations.forEach(combination => {
    const [a, b, c] = combination;
    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      message.textContent =` ${boxes[a].textContent} Wins!`;  // Display winner message
      // Apply celebration to the winning boxes
      boxes[a].classList.add('celebration');
      boxes[b].classList.add('celebration');
      boxes[c].classList.add('celebration');
      boxes.forEach(box => box.classList.add('filled')); // Disable further clicks
    }
  });
}

// Function to switch the current player
function switchPlayer() {
  currentPlayer = currentPlayer === '❌' ? '✔' : '❌'; // Alternate between ❌ and ✔
  message.textContent = `Player ${currentPlayer} Turn`;
}

// Add click event to boxes
boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (!box.textContent && !box.classList.contains('filled')) { // Prevent clicking on filled boxes
      box.textContent = currentPlayer; // Mark the box with the current player's symbol
      box.classList.add('filled');
      checkWinner();
      if (!message.textContent.includes('Wins')) {
        switchPlayer(); // Switch player if no winner yet
      }
    }
  });
});

// Reset button logic
resetButton.addEventListener('click', () => {
  boxes.forEach(box => {
    box.textContent = '';
    box.classList.remove('filled', 'celebration'); // Remove all marks and effects
  });
  message.textContent = `Player ${currentPlayer} Turn`; // Reset the message
});
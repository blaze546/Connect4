const rows = 6;
const columns = 7;
let currentPlayer = 'purple';
const board = Array.from({ length: rows }, () => Array(columns).fill(null));

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const modal = document.getElementById('winnerModal');
const winnerMessageElement = document.getElementById('winnerMessage');
const closeModal = document.getElementById('closeModal');

function createBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleClick);
            boardElement.appendChild(cell);
        }
    }
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(event) {
    const col = parseInt(event.target.dataset.col);
    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            updateBoard();
            if (checkWin(row, col)) {
                winnerMessageElement.textContent = `Player ${currentPlayer} wins!`;
                modal.style.display = "block";
                closeModal.addEventListener('click', closeModalHandler);
                return;
            }
            currentPlayer = currentPlayer === 'purple' ? 'yellow' : 'purple';
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
            return;
        }
    }
}

function updateBoard() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = boardElement.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            if (board[row][col]) {
                cell.classList.add(board[row][col]);
            } else {
                cell.classList.remove('purple', 'yellow');
            }
        }
    }
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
           checkDirection(row, col, 0, 1) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal /
           checkDirection(row, col, 1, -1);  // Diagonal \
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;
        if (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function closeModalHandler() {
    modal.style.display = "none";
    resetGame();
}

function resetGame() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            board[row][col] = null;
        }
    }
    currentPlayer = 'purple';
    updateBoard();
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

createBoard();


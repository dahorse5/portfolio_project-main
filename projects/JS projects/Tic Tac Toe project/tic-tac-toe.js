const openingScreen = document.querySelector("#openingScreen");
const loadingScreen = document.querySelector("#loadingScreen");
const gameContainer = document.querySelector("#gameContainer");
const friendButton = document.querySelector("#friendButton");
const aiButton = document.querySelector("#aiButton");
const difficultySelector = document.querySelector("#difficultySelector");
const startAiGame = document.querySelector("#startAiGame");
const difficultySelect = document.querySelector("#difficulty");
const menuBtn = document.querySelector("#menuBtn");


let playMode = "friend"; 
let difficulty = "hard";

menuBtn.addEventListener("click", () => {
    gameContainer.style.display = "none";
    openingScreen.style.display = "block";
    loadingScreen.style.display = "none";
    difficultySelector.style.display = "none";
    openingScreen.style.position = "fixed";
    openingScreen.style.top = "0";
    openingScreen.style.left = "0";
    openingScreen.style.width = "100%";
    openingScreen.style.height = "100%";
    openingScreen.style.zIndex = "9999";
    openingScreen.style.backgroundColor = "rgba(20, 20, 20, 0.95)";
    openingScreen.style.display = "flex";
    openingScreen.style.justifyContent = "center";
    openingScreen.style.alignItems = "center";
    openingScreen.style.flexDirection = "column";
    restartGame();
});

friendButton.addEventListener("click", () => {
    playMode = "friend";
    startGame();
});

aiButton.addEventListener("click", () => {
    playMode = "ai";
    difficultySelector.style.display = "block";
});

startAiGame.addEventListener("click", () => {
    difficulty = difficultySelect.value; 
    startGame();
});

function startGame() {
    openingScreen.style.display = "none";
    loadingScreen.style.display = "flex";

    setTimeout(() => {
        loadingScreen.style.display = "none";
        gameContainer.style.display = "block";
    }, 2000); 
}

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let aiPlayer = "O"; 
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach((cell) => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.dataset.cellIndex;

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

    if (running && playMode === "ai" && currentPlayer === aiPlayer) {
        setTimeout(aiMove, 500); 
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach((cell) => (cell.textContent = ""));
    running = true;
}

function aiMove() {
    const bestMove = minimax(options, aiPlayer).index;

    if (bestMove !== undefined) {
        const cell = cells[bestMove];
        updateCell(cell, bestMove);
        checkWinner();
    }
}

function minimax(board, player) {
    const emptyCells = board.map((val, index) => (val === "" ? index : null)).filter((val) => val !== null);

    if (checkWinFor(board, aiPlayer)) {
        return { score: 10 };
    }
    
    if (checkWinFor(board, currentPlayer)) {
        return { score: -10 };
    }

    if (emptyCells.length === 0) {
        return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < emptyCells.length; i++) {
        const move = {};
        move.index = emptyCells[i];

        board[emptyCells[i]] = player;

        if (player === aiPlayer) {
            const result = minimax(board, currentPlayer);
            move.score = result.score;
        } else {
            const result = minimax(board, aiPlayer);
            move.score = result.score;
        }

        board[emptyCells[i]] = "";
        moves.push(move);
    }

    for (let i = 0; i < emptyCells.length; i++) {
        board[emptyCells[i]] = aiPlayer;
        if (checkWinFor(board, aiPlayer)) {
            board[emptyCells[i]] = "";
            return { index: emptyCells[i], score: 10 };
        }
        board[emptyCells[i]] = "";
    }

    for (let i = 0; i < emptyCells.length; i++) {
        board[emptyCells[i]] = currentPlayer;
        if (checkWinFor(board, currentPlayer)) {
            board[emptyCells[i]] = "";
            return { index: emptyCells[i], score: -10 }; 
        }
        board[emptyCells[i]] = "";
    }

    let bestMoves = [];
    if (player === aiPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMoves = [moves[i]];
            } else if (moves[i].score === bestScore) {
                bestMoves.push(moves[i]);
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMoves = [moves[i]];
            } else if (moves[i].score === bestScore) {
                bestMoves.push(moves[i]);
            }
        }
    }

    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}



function checkWinFor(board, player) {
    return winConditions.some((condition) =>
        condition.every((index) => board[index] === player)
    );
}

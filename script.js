const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game-board");
const winningMessageElement = document.getElementById("winning-message");
const winnerText = document.getElementById("winner");
const restartButton = document.getElementById("restart-button");

const X_CLASS = "X";
const O_CLASS = "O";
let isOTurn = false;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
    isOTurn = false;
    cells.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.classList.remove("taken");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    winningMessageElement.classList.remove("show");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isOTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
    cell.classList.add(currentClass);
    cell.classList.add("taken");
}

function swapTurns() {
    isOTurn = !isOTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every((cell) => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw) {
    if (draw) {
        winnerText.textContent = "It's a Draw!";
    } else {
        winnerText.textContent = `${isOTurn ? "O" : "X"} Wins!`;
    }
    winningMessageElement.classList.add("show");
}

//board
var blockSize = 25;
var rows = 20;
var cols = 20; 
var board;
var context;

//snake head (starting point 5,5)
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = []
//food
var foodX;
var foodY;

var score = 0;
var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    //Run update 10 times a second
    setInterval(update, 1000/10);
}

function update() {
    if (gameOver) { 
        return;
    }
    //board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score+=1;
        document.getElementById("score").innerText = "Score: " + score;
    }

    for (let i = snakeBody.length - 1; i >= 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    //snake
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    //out of bounds
    if (snakeX < 0 || snakeX + blockSize > cols*blockSize || snakeY < 0 || snakeY + blockSize > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }
    

    //eating yourself
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }

    if (gameOver) {
        let playAgain = confirm("Do you want to play again?");
        if (playAgain) {
            resetGame();
        }
    }

}

function changeDirection(e) {
    //Moves the snake in different directions
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

}

function placeFood() {
    //Random 0 - 1 * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function resetGame() {
    //Reset snake's position
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    
    //Reset velocity
    velocityX = 0;
    velocityY = 0;

    //Clear the snake body
    snakeBody = [];

    //Place new food
    placeFood();

    //Reset score
    score = 0;
    document.getElementById("score").innerText = "Score: " + score;

    //Reset game over flag
    gameOver = false;
}

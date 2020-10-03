const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");
const board_border = 'black';
const board_background = "white";
const snake_col = 'lightgreen';
const snake_border = 'darkgreen';

let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},];

main();

function main() {
    setTimeout(function onTick() {
        clear_board();
        move_snake();
        drawSnake();
        main();
    }, 100)
}

function clearCanvas() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnakePart(snakePart) {  
    snakeboard_ctx.fillStyle = 'lightblue';  
    snakeboard_ctx.strokestyle = 'darkblue';
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);wa
}

function drawSnake() {  
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Directional velocities
let dx = 10;
let dy = 0;

function move_snake() {
    // Create the new Snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of snake body
    snake.unshift(head);
    snake.pop();
}
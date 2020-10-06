const boardBorder = 'black';
const boardBackground = "lightgrey";
const snakeCol = 'lightblue';
const snakeBorder = 'darkblue';
const button = document.querySelector("#restartButton");

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
]

let score = 0;
// True if changing direction
let changingDirection = false;
// Spawn food
let food_x;
let food_y;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;

// Get the canvas element
const snakeboard = document.getElementById("gameCanvas");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");
// Start game
main();
// Generate food
genFood();

// Restarts the page when button is clicked
button.addEventListener("click", () => {
    location.reload()
});

// Listens if key has been pressed, runs change direction function
document.addEventListener("keydown", changeDirection);

// main function called repeatedly to keep the game running
function main() {
    if (hasGameEnded()) return;
    changingDirection = false;
    setTimeout(function onTick() {
    clearBoard();
    moveSnake();
    drawSnake();
    drawFood();
    // Call main again
    main();
    }, 100)
}

// draw a border around the canvas
function clearBoard() {
    //  Select the colour to fill the drawing
    snakeboard_ctx.fillStyle = boardBackground;
    //  Select the colour for the border of the canvas
    snakeboard_ctx.strokestyle = boardBorder;
    // Draw a "filled" rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // Draw a "border" around the entire canvas
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
    // Draw each part
    snake.forEach(drawSnakePart)
}

// Draw one snake part
function drawSnakePart(snakePart) {
    // Set the colour of the snake part
    snakeboard_ctx.fillStyle = snakeCol;
    // Set the border colour of the snake part
    snakeboard_ctx.strokestyle = snakeBorder;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    // Draw a border around the snake part
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function hasGameEnded() {
    // Checks to make sure that the head hasn't collided with any body parts
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    // Checks to ensure that the snake hasn't hit the canvas borders
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changingDirection) return;
        changingDirection = true;
        const keyPressed = event.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

// Returns a random coordinate on the grid to spawn the food
function randomFood(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function genFood() {
    // Generate a random number the food x-coordinate
    food_x = randomFood(0, snakeboard.width - 10);
    // Generate a random number for the food y-coordinate
    food_y = randomFood(0, snakeboard.height - 10);
    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) genFood();
    });
}

// Draws the food icon when called upon
function drawFood() {
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function moveSnake() {
    // Create the new Snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of snake body
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        // Increase score
        score += 1;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new food location
        genFood();
    } else {
        // Remove the last part of snake body
        snake.pop();
    }
}
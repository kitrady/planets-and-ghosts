const BIRD_DIAMETER = 90, OBSTACLE_WIDTH = 150, OBSTACLE_HEIGHT = 600;
const OBSTSACLE_SEPARATION = 800, TOP_OBSTACLE_MIN_Y = -250, TOP_OBSTACLE_MAX_Y = 50;
const GRAVITY = 3, BIRD_MOVE_AMOUNT = 50, BIRD_MOVE_SPEED = 5, OBSTACLE_VEL = 3;
let screen = "start", newTopObstacleY;
let skyBlue, birdYellow, obstacleGray, btnBrown, btnBorderBrown;
let bird, topObstacle1, btmObstacle1, topObstacle2, btmObstacle2;
let gameStart, gameOver, playAgainBtn;

function setup() {
    createCanvas(1000, 600);
    assignVariableValues();
    createSprites();
    background(skyBlue);
}

function draw() {
    if (screen === "start") {
        background(skyBlue);
        spritesToStartingPos();

        if (kb.released("space")) {
            moveOffScreen(gameStart);
            screen = "game";
        }
    } else if (screen === "game") {
        background(skyBlue);
        world.gravity.y = GRAVITY;

        if (kb.presses("space")) {
            bird.move(BIRD_MOVE_AMOUNT, "up", BIRD_MOVE_SPEED);
        }
        if (topObstacle1.x <= -OBSTACLE_WIDTH / 2) {
            resetObstacle(topObstacle1, btmObstacle1);
        }
        if (topObstacle2.x <= -OBSTACLE_WIDTH / 2) {
            resetObstacle(topObstacle2, btmObstacle2);
        }
        if (bird.collides(topObstacle1) ||
            bird.collides(btmObstacle1) ||
            bird.collides(topObstacle2) ||
            bird.collides(btmObstacle2) ||
            bird.y > height - BIRD_DIAMETER / 2) {
            screen = "end";
        }
    } else if (screen === "end") {
        background(skyBlue);
        world.gravity.y = 0;
        setVelZero(bird, topObstacle1, btmObstacle1, topObstacle2, btmObstacle2);
        gameOver.pos = { x: width / 2, y: height / 2 - 60 };
        playAgainBtn.pos = { x: width / 2, y: height / 2 + 60 };

        if (playAgainBtn.mouse.released()) {
            moveOffScreen(gameOver, playAgainBtn);
            screen = "start";
        }
    }
}

function assignVariableValues() {
    skyBlue = color(132, 167, 207);
    birdYellow = color(252, 186, 3);
    obstacleGray = color(117, 111, 110);
    btnBrown = color(191, 168, 99);
    btnBorderBrown = color(133, 117, 69);
}

function createSprites() {
    bird = new Sprite(-100, -100, BIRD_DIAMETER, "d");
    bird.color = birdYellow;
    bird.stroke = birdYellow;

    topObstacle1 = new Sprite(-100, -100, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, "k");
    btmObstacle1 = new Sprite(-100, -100, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, "k");
    topObstacle2 = new Sprite(-100, -100, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, "k");
    btmObstacle2 = new Sprite(-100, -100, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, "k");
    configureObstacle(topObstacle1, btmObstacle1, topObstacle2, btmObstacle2);

    gameStart = new Sprite(-100, -100, 0, 0, "none");
    gameStart.textColor = "white";
    gameStart.textSize = 50;
    gameStart.text = "Press 'space' to start";

    gameOver = new Sprite(-100, -100, 0, 0, "none");
    gameOver.textColor = "white";
    gameOver.textSize = 100;
    gameOver.text = "GAME OVER!";

    playAgainBtn = new Sprite(-100, -100, 300, 70, "k");
    playAgainBtn.color = btnBrown;
    playAgainBtn.strokeWeight = 4;
    playAgainBtn.stroke = btnBorderBrown;
    playAgainBtn.textColor = "white";
    playAgainBtn.textSize = 50;
    playAgainBtn.text = "Play Again?";
}

function configureObstacle() {
    for (let obstacle of arguments) {
        obstacle.color = obstacleGray;
        obstacle.stroke = obstacleGray;
    }
}

function spritesToStartingPos() {
    bird.pos = { x: width / 5, y: height / 2 };

    topObstacle1.pos = { x: width / 2, y: -100 };
    topObstacle1.vel.x = -OBSTACLE_VEL;
    btmObstacle1.pos = { x: width / 2, y: topObstacle1.y + OBSTSACLE_SEPARATION };
    btmObstacle1.vel.x = -OBSTACLE_VEL;

    topObstacle2.pos = { x: width + OBSTACLE_WIDTH / 2, y: random(TOP_OBSTACLE_MIN_Y, TOP_OBSTACLE_MAX_Y) };
    topObstacle2.vel.x = -OBSTACLE_VEL;
    btmObstacle2.pos = { x: width + OBSTACLE_WIDTH / 2, y: topObstacle2.y + OBSTSACLE_SEPARATION };
    btmObstacle2.vel.x = -OBSTACLE_VEL;

    gameStart.pos = { x: width / 2, y: height / 2 };
}

function resetObstacle(topObstacle, btmObstacle) {
    topObstacle.x = width + OBSTACLE_WIDTH / 2;
    btmObstacle.x = width + OBSTACLE_WIDTH / 2;
    newTopObstacleY = random(TOP_OBSTACLE_MIN_Y, TOP_OBSTACLE_MAX_Y);
    topObstacle.y = newTopObstacleY;
    btmObstacle.y = newTopObstacleY + OBSTSACLE_SEPARATION;
}

function setVelZero() {
    for (let sprite of arguments) {
        sprite.vel.x = 0;
        sprite.vel.y = 0;
    }
}

function moveOffScreen() {
    for (let sprite of arguments) {
        sprite.pos = { x: -100, y: -100 };
    }
}

/*
IDEAS
- draw custom bird and obstacles
- make point counter
*/
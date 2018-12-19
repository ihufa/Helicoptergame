const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const chopperright = document.getElementById('chop')
const chopperleft = document.getElementById('chop1')
const colors = ['#4286f4', '#68326d'];

let Obstacle = class {
    constructor(x, y, height, width, color) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
    };
};

class Bullet {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        if (direction) {this.velocity = 10;}
        else {this.velocity = -10;}
        }
    }


wall1 = new Obstacle(200, 300, 300, 20, 'yellow');

wall2 = new Obstacle(400, 0, 300, 20, 'purple');

const goal = {
    x: 1190,
    y: 500,
    height: 100,
    width: 10,
}

let ball = {
    x: 15,
    y: 285,
    size: 30,
    velocityX: 0,
    velocityY: 0,
    direction: true,
};


function render(){
    drawBackground();
    drawBall();
    updateBall();
    collisionControl();
    wall1collision();
    wall2collision();
    goalcollision();
    updateShot();



    window.requestAnimationFrame(render);
}
function drawBall() {
    if(ball.direction) {
    context.drawImage(chopperright, ball.x, ball.y)}
    else {context.drawImage(chopperleft, ball.x, ball.y)}
};

function collisionControl() {
    if (-2 > ball.x || ball.x > canvas.width - ball.size || -2 > ball.y || ball.y > canvas.height - ball.size) {
        resetGame();
    }
}

function wall1collision() {
    if (((ball.x + ball.size) > wall1.x) && ((ball.x) < (wall1.x + wall1.width))
        &&
        ((ball.y + ball.size) > wall1.y) && ((ball.y) < (wall1.y + wall1.height))) { resetGame(); }
}

function wall2collision() {
    if (((ball.x + ball.size) > wall2.x) && ((ball.x) < (wall2.x + wall2.width))
        &&
        ((ball.y + ball.size) > wall2.y) && ((ball.y) < (wall2.y + wall2.height))) { resetGame(); }
}

function goalcollision() {
    if (((ball.x + ball.size) > goal.x) && ((ball.x) < (goal.x + goal.width))
        &&
        ((ball.y + ball.size) > goal.y) && ((ball.y) < (goal.y + goal.height))) { winGame(); }
}

function drawBackground() {

    context.fillStyle = colors[0];
    context.fillRect(0, 0, canvas.clientWidth, canvas.height);
    context.fillStyle = colors[1];
    context.fillRect(wall1.x, wall1.y, wall1.width, wall1.height)
    context.fillStyle = colors[1];
    context.fillRect(wall2.x, wall2.y, wall2.width, wall2.height)
    context.fillStyle = 'green';
    context.fillRect(goal.x, goal.y, goal.width, goal.height)
}

function updateBall() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    // Gravity set here
    ball.velocityY += 0.01;
}

function updateShot() {
    shot.x += shot.velocity;
    context.fillStyle = 'black';
    context.fillRect(shot.x, shot.y, 10, 5);
}

function shot() { shot = new Bullet(ball.x, ball.y, ball.direction)
    console.log(shot)}  

function resetGame(){
    ball = {
        x: 20,
        y: 285,
        size: 30,
        velocityX: 0,
        velocityY: 0,
    }
    alert('you lost, try again idiot');
}

function winGame(){
    ball = {
        x: 20,
        y: 285,
        size: 30,
        velocityX: 0,
        velocityY: 0,
    }
    alert('you did it, now go outside');
}
addEventListener("keydown", takeInput)
function takeInput(e) {
if (e.keyCode === 37) {
    ball.velocityX += -1;
    ball.direction = false;
};
if (e.keyCode === 38) {
    ball.velocityY += -1;
};
if (e.keyCode === 39) {
    ball.velocityX += +1;
    ball.direction = true;
};
if (e.keyCode === 40) {
    ball.velocityY += +1;
};
if (e.keyCode === 76) {
    shot();
}
};





window.requestAnimationFrame(render);
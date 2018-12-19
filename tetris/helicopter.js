const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const chopperright = document.getElementById('chop');
const chopperleft = document.getElementById('chop1');
const brick = document.getElementById('brick');
const goal = document.getElementById('goal');
const turret = document.getElementById('turret');
const color = '#4286f4';
const level = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 9, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

];

let player = {
    lives: 3,
    lost: false,
    won: false,
    play: false,
    pause: false,
}
let helicopter = {
    x: 15,
    y: 285,
    size: 30,
    velocityX: 0,
    velocityY: 0,
    direction: true,
};

let Brick = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.img = brick;
        this.markedForRemoval = 0;
    };
};

let Goal = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.img = goal;
        this.markedForRemoval = 0;
    };
};

let Turret = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.img = turret;
        this.markedForRemoval = 0;

    }
};
Turret.prototype.shoot = function() {
    bullets = bullets.concat(new Bullet(this.x, this.y, false, ((1-2*Math.random())*1), 5, 'purple', 10))
    
};


let time = Date.now();
function turretShoot(turrets) {
if(time + 2000 < Date.now()) {
    for(i = 0; i < turrets.length; i++) {
        turrets[i].shoot();
        time = Date.now()
    }}
}

let Bullet = class {
    constructor(x, y, direction, velocityY=0, velocityX=10, color='black', size=5) {
        this.color = color
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocityY = velocityY;
        if (direction) { this.velocity = +velocityX; }
        else { this.velocity = -velocityX; }
    }
}

let bricks = [];
let bullets = [];
let goals = [];
let turrets = [];

function addBricksToLevel(level) {
    for(let i = 0; i < level.length; i++) {
        for (let u = 0; u < level[i].length; u++) {
            if (level[i][u] === 1) {
            let nextBrick = new Brick(u * 40, i * 40);
            bricks.push(nextBrick)};
        }
    }
};

function addTurretsToLevel(level) {
    for (let i = 0; i < level.length; i++) {
        for (let u = 0; u < level[i].length; u++) {
            if (level[i][u] === 2) {
                let nextTurret = new Turret(u * 40, i * 40);
                turrets.push(nextTurret)
            };
        }
    }
};

function addGoalsToLevel(level) {
    for (let i = 0; i < level.length; i++) {
        for (let u = 0; u < level[i].length; u++) {
            if (level[i][u] === 9) {
                let newGoal = new Goal(u * 40, i * 40);
                goals.push(newGoal)
            };
        }
    }
};

function drawBackground(color){
context.fillStyle = color
context.fillRect(0, 0, canvas.clientWidth, canvas.height)
};

function removeObjects() {
bricks = bricks.filter(function (item) {
        return item.markedForRemoval < 6;
    });
    turrets = turrets.filter(function (item) {
        return item.markedForRemoval < 6;
    });
}

function drawObjects(bricks, brick) {
        for (i = 0; i < bricks.length; i++) {
   context.drawImage(brick, bricks[i].x, bricks[i].y);}
    
    };
   

function drawHelicopter(helicopter) {
    if (helicopter.direction) {
        context.drawImage(chopperright, helicopter.x, helicopter.y)
    }
    else { context.drawImage(chopperleft, helicopter.x, helicopter.y) }
};

function drawBullets(bullets) {
    if (bullets.length > 0) {
    for( let i = 0; i < bullets.length; i++){
    context.fillStyle = bullets[i].color;
    context.fillRect(bullets[i].x, bullets[i].y, bullets[i].size, bullets[i].size);
}}}

addEventListener("keydown", takeInput)
function takeInput(e) {
    if (e.keyCode === 37) {
        helicopter.velocityX += -1;
        helicopter.direction = false;
    };
    if (e.keyCode === 38) {
        helicopter.velocityY += -0.8;
    };
    if (e.keyCode === 39) {
        helicopter.velocityX += +1;
        helicopter.direction = true;
    };
    if (e.keyCode === 40) {
        helicopter.velocityY += +1;
    };
    if (e.keyCode === 76) {
        shoot(helicopter);
    }
};



function collisionEdges(object) {
    if (-2 > object.x || object.x > canvas.width - object.size || -2 > object.y || object.y > canvas.height - object.size) {
        return true;}
    }


function collision(object, bricks){
    for(let i = 0; i < bricks.length; i++) {
        if (object.x > bricks[i].x && object.x < bricks[i].x+bricks[i].size && object.y > bricks[i].y && object.y < bricks[i].y+bricks[i].size) {
        bricks[i].markedForRemoval++
        console.log(bricks[i]);
        return bricks[i];}
    }
}

function loseSides (helicopter) {
    if (collisionEdges(helicopter))
{ resetGame();}
}
function loseBricks (helicopter, bricks) {
    if (collision(helicopter, bricks)) 
    { resetGame();}
}

function resetGame() {
    helicopter = {
        x: 20,
        y: 285,
        size: 30,
        velocityX: 0,
        velocityY: 0,
    };
    bullets = []
}

function shoot(helicopter) {
    bullet = new Bullet(helicopter.x, helicopter.y, helicopter.direction)
    bullets.push(bullet);
    console.log(bullets);
}

function updateHelicopter(helicopter) {
    helicopter.x += helicopter.velocityX;
    helicopter.y += helicopter.velocityY;
    // Gravity set here
    helicopter.velocityY += 0.01;
}

function updateShot(bullets) {
    if(bullets.length > 0) {
    for(let i = 0; i < bullets.length; i++) {
    bullets[i].x += bullets[i].velocity;
    bullets[i].y += bullets[i].velocityY}}
    }

    // remove bullets when they hit things
function bulletHits(bullets) {
    if(bullets.length>0){
    for (let i = 0; i < bullets.length; i++) {
    if ((bullets.length > 0) && (collisionEdges(bullets[i]) || collision(bullets[i], bricks) || collision(bullets[i], turrets))) {bullets.shift()}};
}
}
function turretHits(bullets, helicopter) {
    if (bullets.length>0){
        for(let i=0; i<bullets.length; i++) {
            if(collision(bullets[i], helicopter))
                {player.lives--;
                console.log(player.lives);}
        }
    }
}

function handleState(player) {
    if (player.lost) {
        resetGame()
        context.
        player.lost = false}
    if (player.won) {
        winGame()
    }
}

// function goalCollision(helicopter, goals) {
//     if (collision(helicopter, goals[0])) {
//         player.won = true}
//     }
function winGame() {
    alert('You Won!')
}

addBricksToLevel(level);
addTurretsToLevel(level);
addGoalsToLevel(level);
function gameEngine() {
            drawBackground(color);
            drawObjects(bricks, brick);
            drawObjects(goals, goal);
            drawObjects(turrets, turret);
            drawHelicopter(helicopter);
            updateHelicopter(helicopter);
            drawBullets(bullets);
            handleState(player);
            loseSides(helicopter);
            loseBricks(helicopter, bricks);
            updateShot(bullets);
            bulletHits(bullets);
            removeObjects(bricks, turrets);
            turretShoot(turrets)
            turretHits(bullets, helicopter);
           // goalCollision();


        requestAnimationFrame(gameEngine);
    }
    gameEngine();


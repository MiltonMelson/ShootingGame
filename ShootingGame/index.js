import Player from './Player.js'
import Enemy from './Enemy.js';
import BulletController from './BulletController.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 700;

const wallpaper = new Image();
wallpaper.src = './wallpaper.png';

const enemyColor = "green";

const bulletController = new BulletController(canvas);
const player = new Player(canvas.width / 2.2, canvas.height / 1.3, bulletController, canvas);
const enemies = [
    new Enemy(50, 20, enemyColor, 50),
    new Enemy(150, 20, enemyColor, 50),
    new Enemy(250, 20, enemyColor, 50),
    new Enemy(350, 20, enemyColor, 50),
    new Enemy(450, 20, enemyColor, 50),
    new Enemy(550, 20, enemyColor, 50),
    new Enemy(650, 20, enemyColor, 50),

    new Enemy(100, 100, enemyColor, 30),
    new Enemy(200, 100, enemyColor, 30),
    new Enemy(300, 100, enemyColor, 30),
    new Enemy(400, 100, enemyColor, 30),
    new Enemy(500, 100, enemyColor, 30),
    new Enemy(600, 100, enemyColor, 30),
    new Enemy(700, 100, enemyColor, 30),

    new Enemy(50, 180, enemyColor, 25),
    new Enemy(150, 180, enemyColor, 25),
    new Enemy(250, 180, enemyColor, 25),
    new Enemy(350, 180, enemyColor, 25),
    new Enemy(450, 180, enemyColor, 25),
    new Enemy(550, 180, enemyColor, 25),
    new Enemy(650, 180, enemyColor, 25),
]

function gameLoop() {
    // requestAnimationFrame(gameLoop);
    setCommonStyle();
    ctx.drawImage(wallpaper, 0, 0, canvas.width, canvas.height);
    
    bulletController.draw(ctx);
    
    player.draw(ctx);
    
    enemies.forEach((enemy) => {
        if (bulletController.collideWith(enemy)) {
            if (enemy.health <= 0) {
                const index = enemies.indexOf(enemy);
                enemies.splice(index, 1);
            }
        }
        else {
            enemy.draw(ctx);
        }
    })
}

function setCommonStyle() {
    ctx.shadowColor = "blue";
    ctx.shadowBlur = 20;
    ctx.lineJoin = "bevel";
    ctx.lineWidth = 6;
}

setInterval(gameLoop, 1000 / 60);
// gameLoop();
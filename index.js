import Player from './Player.js'
import Enemy from './Enemy.js';
import BulletController from './BulletController.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
var score = document.getElementById("score");

canvas.width = 800;
canvas.height = window.innerHeight/1.4;

const bulletController = new BulletController(canvas);

const player = new Player(canvas.width / 2.2, canvas.height / 1.3, bulletController, canvas);

const enemyColor = "black";
var health1 = Math.floor(Math.random() * 30 + 1);
var health2 = Math.floor(Math.random() * 30 + 1);
var health3 = Math.floor(Math.random() * 30 + 1);

const enemies = [        
    new Enemy(25, 20, enemyColor, health1),
    new Enemy(125, 20, enemyColor, health1),
    new Enemy(225, 20, enemyColor, health1),
    new Enemy(325, 20, enemyColor, health1),
    new Enemy(425, 20, enemyColor, health1),
    new Enemy(525, 20, enemyColor, health1),
    new Enemy(625, 20, enemyColor, health1),
    new Enemy(725, 20, enemyColor, health1),

    new Enemy(65, 100, enemyColor, health2),
    new Enemy(165, 100, enemyColor, health2),
    new Enemy(265, 100, enemyColor, health2),
    new Enemy(365, 100, enemyColor, health2),
    new Enemy(465, 100, enemyColor, health2),
    new Enemy(565, 100, enemyColor, health2),
    new Enemy(665, 100, enemyColor, health2),

    new Enemy(25, 180, enemyColor, health3),
    new Enemy(125, 180, enemyColor, health3),
    new Enemy(225, 180, enemyColor, health3),
    new Enemy(325, 180, enemyColor, health3),
    new Enemy(425, 180, enemyColor, health3),
    new Enemy(525, 180, enemyColor, health3),
    new Enemy(625, 180, enemyColor, health3),
    new Enemy(725, 180, enemyColor, health3),
]

function gameLoop() {
    setCommonStyle();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bulletController.draw(ctx);

    player.draw(ctx);


    enemies.forEach( (enemy) => {
        if (bulletController.collideWith(enemy)) {
            if (enemy.health <= 0) {
                enemy.health = Math.floor(Math.random() * 50);
                enemy.y = Math.floor(Math.random() * 500 * (-1));
                score.innerHTML++;
            }
        }
        else {
            enemy.draw(ctx);
        }
    });
}

function setCommonStyle() {
    ctx.shadowBlur = 10;
    ctx.lineJoin = "bevel";
    ctx.lineWidth = 6;
}

setInterval(gameLoop, 1000 / 30);
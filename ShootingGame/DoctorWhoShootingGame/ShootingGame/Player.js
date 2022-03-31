export default class Player {
    constructor(x, y, bulletController, canvas) {
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 25;
        this.canvas = canvas;
        this.bulletController = bulletController;
        this.speed = 10;

        // EventListeners for keypress
        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    draw(ctx) {
        // Draw Player
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "cyan"
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Player methods/functions
        this.move();
        this.boundaryCheck();
        this.shoot();
    }

    // Keeps player inside canvas
    boundaryCheck() {
        if (this.y <= 0) {
            this.y = 0;
        }
        if (this.y + this.height >= this.canvas.height) {
            this.y = this.canvas.height - this.height;
        }
        if (this.x + this.width >= this.canvas.width) {
            this.x = this.canvas.width - this.width;
        }
        if (this <= 0) {
            this.x = 0;
        }
    }

    // Provides bullet speed, rate, and damage to bulletController
    shoot() {
        if (this.shootPressed) {
            const speed = 15;
            const delay = 10;
            const dmg = 3;
            const bulletX = this.x + (this.width/2); 
            this.bulletController.shoot(bulletX, this.y, speed, dmg, delay);
        }
    }
    
    // Moves Player based on keyPressed
    move() {
        if (this.upPressed) {
            this.y -= this.speed;
        }
        if (this.downPressed) {
            this.y += this.speed;
        }
        if (this.leftPressed) {
            this.x -= this.speed;
        }
        if (this.rightPressed) {
            this.x += this.speed;
        }
    }

    // Events when keys are pressed
    keydown = (e) => {
        if (e.code === "ArrowUp") {
            this.upPressed = true;
        }
        if (e.code === "ArrowDown") {
            this.downPressed = true;
        }
        if (e.code === "ArrowLeft") {
            this.leftPressed = true;
        }
        if (e.code === "ArrowRight") {
            this.rightPressed = true;
        }
        if (e.code === "Space") {
            this.shootPressed = true;
        }
    }

    // events when keys are released
    keyup = (e) => {
        if (e.code === "ArrowUp") {
            this.upPressed = false;
        }
        if (e.code === "ArrowDown") {
            this.downPressed = false;
        }
        if (e.code === "ArrowLeft") {
            this.leftPressed = false;
        }
        if (e.code === "ArrowRight") {
            this.rightPressed = false;
        }
        if (e.code === "Space") {
            this.shootPressed = false;
        }
    };
}

/*

Triangle Player 

ctx.beginPath();
ctx.moveTo(this.x, this.y);
ctx.lineTo(this.x + 25, this.y + 25);
ctx.lineTo(this.x - 25, this.y + 25);
ctx.closePath();
ctx.stroke();

*/
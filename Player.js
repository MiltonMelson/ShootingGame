export default class Player {
    constructor(x, y, bulletController, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.bulletController = bulletController;

        this.width = 15;
        this.height = 25;
        this.speed = 10;
        this.special = false;

        // EventListeners for keypress
        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    draw(ctx) {
        // Draw Player
        ctx.strokeStyle = "#39FF14";
        ctx.fillStyle = "yellow";
        ctx.shadowColor = "#39FF14";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x - this.width, this.y + this.height);
        ctx.closePath();
        ctx.stroke();

        // Player methods/functions
        this.move();
        this.boundaryCheck();
        this.shoot();
    }

    // Player boundary
    boundaryCheck() {
        if (this.y <= (this.canvas.height / 3) * 2) {
            this.y = (this.canvas.height / 3) * 2;
        }
        if (this.y + this.height > this.canvas.height - 5) {
            this.y = this.canvas.height - this.height - 5;
        }
        if (this.x + this.width >= this.canvas.width - 5) {
            this.x = this.canvas.width - 5 - this.width;
        }
        if (this.x - this.width <= 5) {
            this.x = 5 + this.width;
        }
    }

    collideWithEnemy(sprite) {
        if (this.y <= sprite.y + sprite.height &&
            this.y >= sprite.y &&
            this.x >= sprite.x &&
            this.x <= sprite.x + sprite.width) {
            return true;
        }
        return false;
    }

    // Provides bullet location of player
    shoot() {
        if (this.shootPressed) {
            this.bulletController.shoot(this.x, this.y);
        }
        if (this.special) {
            this.bulletController.shootSpecial(this.x, this.y);
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
        // "b"
        if (e.keyCode == 66) {
            this.special = true;
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
        // "b"
        if (e.keyCode == 66) {
            this.special = false;
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
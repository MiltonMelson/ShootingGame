export default class Player {
    constructor(x, y, bulletController, canvas) {
        this.x = x;
        this.y = y;
        this.height = 15;
        this.width = 15;
        this.canvas = canvas;
        this.bulletController = bulletController;
        this.speed = 10;
        this.special = false;

        // EventListeners for keypress
        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    draw(ctx) {
        // Draw Player
        ctx.strokeStyle = "black";
        ctx.fillStyle = "lightgreen";
        ctx.shadowColor = "lightgreen";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Player methods/functions
        this.move();
        this.boundaryCheck();
        this.shoot();
    }

    // Player Space
    boundaryCheck() {
        if (this.y <= (this.canvas.height / 3)*2) {
            this.y = (this.canvas.height / 3)*2;
        }
        if (this.y + this.height > this.canvas.height - 10) {
            this.y = this.canvas.height - this.height - 10;
        }
        if (this.x + this.width >= this.canvas.width -10) {
            this.x = this.canvas.width - this.width -10;
        }
        if (this.x <= 10) {
            this.x = 10;
        }
    }

    // Provides bullet speed, rate, and damage to bulletController
    shoot() {
        if (this.shootPressed) {
            const speed = 15;
            const delay = 5;
            const dmg = 3;
            const bulletX = this.x + (this.width/2); 
            this.bulletController.shoot(bulletX, this.y, speed, dmg, delay);
        }
        if (this.special) {
            const speed = 15;
            const delay = 50;
            const dmg = 35;
            const bulletColor = "yellow";
            const bulletX = this.x + (this.width/2); 
            this.bulletController.shootSpecial(bulletX, this.y, speed, dmg, delay, bulletColor);
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
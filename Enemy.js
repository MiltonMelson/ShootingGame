export default class Enemy {
    constructor(x, y, color, health) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.health = health;
        this.width = 50;
        this.height = 50;
        this.speed = .35;
    }

    draw(ctx) {
        // Draw enemy box
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.shields();
        ctx.shadowColor = "red";
        this.y += this.speed;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Draw Health
        ctx.fillStyle = this.shields();
        ctx.font = "20px Arial";
        ctx.fillText(this.health, this.x + (this.width / 3.3), this.y + (this.height / 1.6));
    }

    shields() {
        if (this.health >= 20) {
            return "white";
        }
        else if (this.health >= 8) {
            return "orange";
        }
        else {
            return "red";
        }
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    reset() {
        this.health = Math.floor(Math.random() * 30 + 1);
        this.y = Math.floor(Math.random() * 250 * (-1));
        this.speed = this.speed*2 % 1;
    }
}
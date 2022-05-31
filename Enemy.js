export default class Enemy {
    constructor(x, y, color, health) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.health = health;
        this.width = 50;
        this.height = 50;
    }

    draw(ctx) {
        // Draw enemy box
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.shields();
        ctx.shadowColor = "red";
        this.y = this.y+.25;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Draw Health
        ctx.fillStyle = this.shields();
        ctx.font = "25px Arial";
        ctx.fillText(this.health, this.x + this.width / 4, this.y + this.height / 1.5);
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
}
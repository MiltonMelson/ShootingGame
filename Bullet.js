export default class Bullet {
    constructor(x, y, speed, dmg) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.dmg = dmg;
        
        this.width = 3;
        this.height = 10;
        this.color = "lightgreen";
    }

    // draw the bullet
    draw (ctx) {
        ctx.fillStyle = this.color;
        this.y -= this.speed;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // If sprite and bullet overlap
    collideWith (sprite) {
        if (this.y <= sprite.y + sprite.height &&
            this.y >= sprite.y && 
            this.x >= sprite.x &&
            this.x <= sprite.x + sprite.width) {
                sprite.takeDamage(this.dmg);
                return true;
            } 
            return false;
    }
}
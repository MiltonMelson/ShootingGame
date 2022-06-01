import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = [];
    timerTillNextBullet = 0;

    constructor(canvas) {
        this.canvas = canvas;
    }

    shoot(x, y, speed, dmg, delay) {
        if (this.timerTillNextBullet <= 0) {
            this.bullets.push(new Bullet(x, y, speed, dmg));
            this.timerTillNextBullet = delay;
        }
        this.timerTillNextBullet--;
    }

    shootSpecial(x, y, speed, dmg, delay, bulletColor) {
        if (this.timerTillNextBullet <= 0) {
            let bullet = new Bullet(x, y, speed, dmg);
            bullet.color = bulletColor;
            bullet.dmg = 35;
            bullet.height = 20;
            bullet.width = 8;
            
            this.bullets.push(bullet);
            this.timerTillNextBullet = delay;
        }
        this.timerTillNextBullet--;
    }

    // draws bullets and removes the ones that are off screen
    draw(ctx) {
        this.bullets.forEach((bullet) => {
            if (this.isBulletOffScreen(bullet)) {
                const index = this.bullets.indexOf(bullet);
                this.bullets.splice(index, 1);
            }
            bullet.draw(ctx);
        });
    }

    // Removes bullets on collision and returns true
    collideWith(sprite) {
        return this.bullets.some((bullet)=>{
            // Checks for collision in bullet class
            if (bullet.collideWith(sprite)) {
                const index = this.bullets.indexOf(bullet);
                this.bullets.splice(index, 1);
                return true;
            }
            return false;
        })
    }

    isBulletOffScreen(bullet) {
        return bullet.y <= -bullet.height;
    }
}

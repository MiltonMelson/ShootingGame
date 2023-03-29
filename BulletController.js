import Bullet from "./Bullet.js";

const cooldownTimer = document.getElementById("cooldown");

export default class BulletController {
    bullets = [];
    timerTillNextBullet = 0;
    cooldown = 0;
    specialDuration = 100;

    constructor(canvas) {
        this.canvas = canvas;
    }

    shoot(x, y) {
        if (this.timerTillNextBullet <= 0) {
            const speed = 10;
            const dmg = 2;
            this.bullets.push(new Bullet(x, y, speed, dmg));
            this.timerTillNextBullet = 5;
        }
        this.timerTillNextBullet--;
        this.cooldown--;
        if (this.cooldown >= 0) {
            cooldownTimer.innerHTML = this.cooldown;
        }
    }

    shootSpecial(x, y) {
        if (this.cooldown <= 0) {
            const speed = 10;
            const dmg = 30;
            let bullet = new Bullet(x, y, speed, dmg);
            bullet.color = 'yellow';
            this.bullets.push(bullet);
            this.specialDuration--;
            if (this.specialDuration <= 0) {
                this.cooldown = 2500;
                this.specialDuration = 100;
            }
        }
        this.cooldown--;
        if (this.cooldown >= 0) {
            cooldownTimer.innerHTML = this.cooldown;
        }
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

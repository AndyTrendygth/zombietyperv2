import { Game } from "../scenes/Game";
import { Bullet } from "./Bullet";
import { Zombie } from "./Zombie";

export class Fortress {
    scene: Phaser.Scene;
    bullets: Phaser.Physics.Arcade.Group;
    fortressObject: Phaser.GameObjects.Sprite;
    healthPoints: number;
    healthPointsText: Phaser.GameObjects.Text;
    ammunition: number;
    ammunitionText: Phaser.GameObjects.Text;
    maxAmmunition: number;

    constructor(scene: Phaser.Scene, healthPoints: number) {
        this.scene = scene;
        this.healthPoints = healthPoints;
        //this.ammunition = ammunition;
        this.bullets = this.scene.physics.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });
        this.fortressObject = this.scene.add
            .sprite(0, window.innerHeight - 96, "fortress")
            .setScale(1.5)
            .setOrigin(0, 1)
            .setDepth(1);
        this.scene.add
            .image(150, window.innerHeight - 98, "pistol")
            .setDepth(1)
            .setScale(1.5)
            .setOrigin(0, 1);
        this.scene.physics.add.existing(this.fortressObject, true);
        this.healthPointsText = this.scene.add
            .text(
                10, // X position
                10, // Y position
                `HP: ${this.healthPoints}`,
                { fontSize: "20px" } // Style
            )
            .setScrollFactor(0); // Ensure the text stays in place

        this.scene.physics.add.collider(
            this.bullets,
            (this.scene as Game).zombieManager.aliveZombies,
            this.handleBulletZombieCollision,
            undefined,
            this
        );
        this.scene.physics.add.collider(
            (this.scene as Game).zombieManager.aliveZombies,
            this.fortressObject,
            this.handleZombieFortressCollision,
            undefined,
            this
        );
    }

    handleBulletZombieCollision(bullet: any, zombie: any) {
        const bulletGameObject = bullet as Bullet;
        const zombieGameObject = zombie as Zombie;
        zombieGameObject.takeDamage(1); // Example damage value
        this.bullets.remove(bulletGameObject, true, true);
    }

    handleZombieFortressCollision(zombie: any, fortress: any) {
        const zombieGameObject = fortress as Zombie;

        // Get the current time
        const currentTime = this.scene.time.now;

        // Check if the zombie can attack (use a cooldown of 1 second)
        if (
            !zombieGameObject.lastAttackTime ||
            currentTime - zombieGameObject.lastAttackTime >= 1000
        ) {
            zombieGameObject.play("attack");
            zombieGameObject.lastAttackTime = currentTime; // Update the last attack time
            this.takeDamage(); // Apply damage to the fortress
        }
    }

    shootAtZombie() {
        if (this.getAmmunition() > 0) {
            const bullet = new Bullet(
                this.scene,
                100,
                this.scene.scale.height - 120,
                900,
                0
            );
            this.bullets.add(bullet);
            this.reduceAmmunition();
        }
    }

    shootAndMissZombie() {
        if (this.getAmmunition() > 0) {
            const bullet = new Bullet(
                this.scene,
                100,
                this.scene.scale.height - 150,
                900,
                -300
            );
            this.bullets.add(bullet);
            bullet.setRotation(Phaser.Math.DegToRad(-15));
            this.reduceAmmunition();
        }
    }

    takeDamage() {
        if (this.healthPoints <= 0) {
            this.scene.events.emit("fortressDestroyed");
        } else {
            this.healthPoints -= 1;
            this.healthPointsText.setText(`HP: ${this.healthPoints}`);
        }
    }

    setAmmuntion(ammunition: number) {
        this.ammunition = ammunition;
        this.maxAmmunition = ammunition;
        this.ammunitionText = this.scene.add
            .text(10, 30, `${ammunition}/${this.maxAmmunition} Ammunition`, {
                fontSize: "20px",
            })
            .setDepth(1);
    }
    getAmmunition() {
        return this.ammunition;
    }
    reduceAmmunition() {
        if (this.ammunition > 0) {
            this.ammunition--;
            this.ammunitionText.setText(
                `${this.ammunition}/${this.maxAmmunition}`
            );
        }
    }
}

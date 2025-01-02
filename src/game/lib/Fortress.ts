import { Game } from "../scenes/Game";
import { Bullet } from "./Bullet";
import { Zombie } from "./Zombie";

export class Fortress {
    scene: Phaser.Scene;
    bullets: Phaser.Physics.Arcade.Group;
    fortressObject: Phaser.GameObjects.Sprite;
    healthPoints: number;
    healthPointsText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, healthPoints: number) {
        this.scene = scene;
        this.healthPoints = healthPoints;
        this.bullets = this.scene.physics.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });
        this.fortressObject = this.scene.add
            .sprite(100, this.scene.scale.height - 120, "fortress")
            .setDepth(1);
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
        bulletGameObject.setActive(false);
        bulletGameObject.setVisible(false);
        zombieGameObject.takeDamage(1); // Example damage value
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
        const bullet = new Bullet(
            this.scene,
            100,
            this.scene.scale.height - 120,
            900,
            0
        );
        this.bullets.add(bullet);
    }

    shootAndMissZombie() {
        const bullet = new Bullet(
            this.scene,
            100,
            this.scene.scale.height - 150,
            900,
            -300
        );
        this.bullets.add(bullet);
        bullet.setRotation(Phaser.Math.DegToRad(-15));
    }

    takeDamage() {
        if (this.healthPoints <= 0) {
            this.scene.events.emit("fortressDestroyed");
        } else {
            this.healthPoints -= 1;
            this.healthPointsText.setText(`HP: ${this.healthPoints}`);
        }
    }
}

import { Game } from "../scenes/Game";
import { ZombieManager } from "./ZombieManager";

export class Zombie extends Phaser.Physics.Arcade.Sprite {
    healthPoints: number;
    sprite: Phaser.Physics.Arcade.Sprite;
    scene: Phaser.Scene;
    velocity: number;
    lastAttackTime: number;
    zombieManager: ZombieManager;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        healthPoints: number,
        velocity: number,
        zombieManager: ZombieManager
    ) {
        super(scene, x, y, "zombie");
        this.scene = scene;
        this.velocity = velocity;
        this.healthPoints = healthPoints;
        this.zombieManager = zombieManager;
        this.lastAttackTime = 0;

        this.scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.scene.add.existing(this).setScale(2);
        this.body?.setSize(32, 32);
        this.body?.setOffset(30, 25);
        this.setBounce(0);
        this.scene.physics.add.collider(this, (this.scene as Game).ground);
        this.setVelocityX(-velocity);
        this.play("walk");
    }

    takeDamage(damage: number) {
        this.healthPoints -= damage;
        console.log("hp" + this.healthPoints);
        if (this.healthPoints <= 0) {
            this.setSize(32, 1);
            this.play("die").once("animationcomplete", () => {
                this.zombieManager.removeZombie(this);
            });
        } else {
            this.play("hurt").once("animationcomplete", () => {
                this.play("walk");
            });
        }
    }

    update() {
        this.setVelocityX(-this.velocity);
        if (this.x < -50) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    destroy() {
        super.destroy();
    }
}

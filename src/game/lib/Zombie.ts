import { Game } from "../scenes/Game";

export class Zombie extends Phaser.Physics.Arcade.Sprite {
    healthPoints: number;
    sprite: Phaser.Physics.Arcade.Sprite;
    scene: Phaser.Scene;
    velocity: number;
    lastAttackTime: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        healthPoints: number,
        velocity: number
    ) {
        super(scene, x, y, "zombie");
        this.scene = scene;
        this.velocity = velocity;
        this.healthPoints = healthPoints;
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
        if (this.healthPoints <= 0) {
            this.setSize(32, 1);
            this.play("die").once("animationcomplete", () => {
                this.destroy();
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

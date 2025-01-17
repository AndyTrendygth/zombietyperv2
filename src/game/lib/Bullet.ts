/**
 * Bullet welche von der Fortress abgefeuert wird.
 */
export class Bullet extends Phaser.Physics.Arcade.Sprite {
    velocityx: number;
    velocityy: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        velocityx: number,
        velocityy: number
    ) {
        super(scene, x, y, "bullet");
        this.velocityx = velocityx;
        this.velocityy = velocityy;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setVelocityX(velocityx);
        this.setVelocityY(velocityy);
        this.setBounce(0, 0);
    }

    update() {
        if (
            this.x > this.scene.scale.width ||
            this.y > this.scene.scale.height
        ) {
            this.setActive(false);
            this.setVisible(false);
        }
        this.setVelocityX(this.velocityx);
        this.setVelocityY(this.velocityy);
    }
}

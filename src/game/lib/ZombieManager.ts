import { Zombie } from "./Zombie";

export class ZombieManager {
    scene: Phaser.Scene;
    aliveZombies: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.aliveZombies = this.scene.physics.add.group({
            classType: Zombie,
            runChildUpdate: true,
        });
    }

    spawnZombies(zombies: { normal?: number; tank?: number }) {
        const normalZombieCount = zombies.normal || 0;
        const tankZombieCount = zombies.tank || 0;

        for (let i = 0; i < normalZombieCount; i++) {
            this.scene.time.delayedCall(1000, () => {
                console.log("Spawning normal zombie");
                this.spawnZombie(100, 50);
            });
        }

        for (let i = 0; i < tankZombieCount; i++) {
            this.scene.time.delayedCall(1000, () => {
                this.spawnZombie(300, 20);
            });
        }
    }

    spawnZombie(healthPoints: number, velocity: number) {
        const enemyX = this.scene.scale.width + 50;
        const enemyY = this.scene.scale.height - 150;
        const zombie = new Zombie(
            this.scene,
            enemyX,
            enemyY,
            healthPoints,
            velocity
        );
        this.aliveZombies.add(zombie);
    }

    update() {}
}

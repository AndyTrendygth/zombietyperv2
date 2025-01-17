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
            setTimeout(() => {
                console.log("Spawning normal zombie");
                this.spawnZombie(5, 50);
            }, 1000 * i);
        }

        for (let i = 0; i < tankZombieCount; i++) {
            setTimeout(() => {
                console.log("Spawning normal zombie");
                this.spawnZombie(10, 20);
            }, 1000 * i);
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
            velocity,
            this
        );
        this.aliveZombies.add(zombie);
    }

    removeZombie(zombie: Zombie) {
        this.aliveZombies.remove(zombie, true, true); // Remove zombie from the list
    }

    update() {}
}

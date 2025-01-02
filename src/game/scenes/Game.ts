import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { ZombieManager } from "../lib/ZombieManager";
import { TextManager } from "../lib/TextManager";
import { Fortress } from "../lib/Fortress";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    ground: Phaser.GameObjects.TileSprite;
    zombieManager: ZombieManager;
    levelConfig: any;
    textManager: TextManager;
    currentWave: number;
    currentLevel: number;
    fortress: Fortress;

    constructor() {
        super("Game");
        this.currentWave = 0;
        this.currentLevel = 1;
    }

    preload() {
        this.load.setPath("assets");
        this.load.image("background", "game-bg-night.png");
        this.load.image("ground", "ground.png");
        this.load.image("man", "man.png");
        this.load.json("levelConfig", "levelConfig.json");
        this.load.image("bullet", "bullet.png");
        this.load.image("fortress", "fortress.png");
        this.load.spritesheet("textures", "Textures-16.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("zombie", "zombie.png", {
            frameWidth: 22,
            frameHeight: 16,
        });
        this.load.spritesheet("zombie_keys", "zombie_keys.png", {
            frameWidth: 100,
            frameHeight: 100,
        });
    }

    create() {
        this.zombieManager = new ZombieManager(this);
        this.textManager = new TextManager(this);
        this.fortress = new Fortress(this, 20);
        this.scale.on("resize", this.resizeGame, this);
        this.camera = this.cameras.main;
        this.background = this.add.image(800, 500, "background").setDepth(0);
        this.createGround();
        this.levelConfig = this.cache.json.get("levelConfig");
        this.input.keyboard?.on("keydown", this.handleKeyInput, this); // Listen to keystrokes
        this.events.once("fortressDestroyed", this.gameOver, this);
        this.startWave();
        this.physics.world.createDebugGraphic();
        this.physics.world.setBoundsCollision();
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("zombie_keys", {
                start: 15,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "hurt",
            frames: this.anims.generateFrameNumbers("zombie_keys", {
                start: 36,
                end: 39,
            }),
            frameRate: 10,
            repeat: 0,
        });
        this.anims.create({
            key: "attack",
            frames: this.anims.generateFrameNumbers("zombie_keys", {
                start: 23,
                end: 18,
            }),
            frameRate: 10,
            repeat: 0,
        });
        EventBus.emit("current-scene-ready", this);
    }

    createGround() {
        this.ground = this.add
            .tileSprite(
                0,
                this.scale.height - 64,
                this.scale.width,
                16,
                "textures",
                this.calculateFrameIndex(30, 2, 32)
            )
            .setScale(2)
            .setOrigin(0, 1);
        this.add
            .tileSprite(
                0,
                this.scale.height - 32,
                this.scale.width,
                16,
                "textures",
                this.calculateFrameIndex(31, 2, 32)
            )
            .setScale(2)
            .setOrigin(0, 1);
        this.add
            .tileSprite(
                0,
                this.scale.height,
                this.scale.width,
                16,
                "textures",
                this.calculateFrameIndex(32, 2, 32)
            )
            .setScale(2)
            .setOrigin(0, 1);
        this.physics.add.existing(this.ground, true);
    }

    resizeGame(gameSize: Phaser.Structs.Size) {
        const width = gameSize.width;
        const height = gameSize.height;

        this.ground.width = width;
        this.camera.setSize(width, height);
        //this.textManager.textObjects.setPosition(width / 2, height / 2);
    }

    calculateFrameIndex(row: number, column: number, columnsPerRow: number) {
        return (row - 1) * columnsPerRow + (column - 1);
    }

    startWave() {
        const level = this.levelConfig.levels.find(
            (l: any) => l.levelNumber === this.currentLevel
        );
        const wave = level.waves[this.currentWave];
        this.textManager.setText(wave.text);
        this.zombieManager.spawnZombies(wave.zombies);
    }

    update(): void {
        this.zombieManager.update();
    }

    handleKeyInput(event: KeyboardEvent) {
        if (event.key === this.textManager.getCurrentKey()) {
            //makeKeyWhite/Green
            this.textManager.setCurrentKeyToNext(true);
            this.fortress.shootAtZombie(); // Shoot at zombie
        } else if (event.key === "Backspace") {
            this.textManager.setCurrentKeyToPrevious();
        } else {
            this.textManager.setCurrentKeyToNext(false);
            this.fortress.shootAndMissZombie();
        }

        if (this.textManager.isTextDone()) {
            this.currentWave++;
            const level = this.levelConfig.levels.find(
                (l: any) => l.levelNumber === this.currentLevel
            );
            if (this.currentWave < level.waves.length) {
                this.startWave();
            } else {
                //level survived screen + next level button
            }
        }
    }
    gameOver() {
        this.scene.stop("Game").start("GameOver", {
            level: this.currentLevel,
            waves: this.currentWave,
        });
    }

    levelComplete() {
        //level complete screen + next level button
    }
}


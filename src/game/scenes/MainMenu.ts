import { setCookie } from "typescript-cookie";

export class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height / 2 - 50,
                `Zombietyper`,
                { fontSize: "48px", color: "#ff0000" }
            )
            .setOrigin(0.5);
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height / 2,
                `A game to learn typing with zombies`,
                { fontSize: "18px", color: "#ffffff" }
            )
            .setOrigin(0.5);

        const startGameButton = this.add
            .text(
                this.scale.width / 2,
                this.scale.height / 2 + 50,
                "Start on Day 0",
                {
                    fontSize: "32px",
                    color: "#ffffff",
                    backgroundColor: "#000000",
                }
            )
            .setOrigin(0.5)
            .setInteractive();

        const selectLevelButton = this.add
            .text(
                this.scale.width / 2,
                this.scale.height / 2 + 75,
                "Select a specific level",
                {
                    fontSize: "32px",
                    color: "#ffffff",
                    backgroundColor: "#000000",
                }
            )
            .setOrigin(0.5)
            .setInteractive();

        startGameButton.on("pointerdown", () => {
            setCookie("level", 1);
            this.scene.start("Game");
        });

        selectLevelButton.on("pointerdown", () => {
            //open menu
        });
    }
}

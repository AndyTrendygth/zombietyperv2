import { getCookie, setCookie } from "typescript-cookie";

export class LevelComplete extends Phaser.Scene {
    constructor() {
        super("LevelComplete");
    }

    create() {
        // Add a "Game Over" text
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height / 2 - 50,
                `Day ${getCookie("level")} Completed`,
                { fontSize: "48px", color: "#ff0000" }
            )
            .setOrigin(0.5);

        // Add a "Retry" button
        const startNextLevelButton = this.add
            .text(
                this.scale.width / 2,
                this.scale.height / 2 + 50,
                "Next Day",
                {
                    fontSize: "32px",
                    color: "#ffffff",
                    backgroundColor: "#000000",
                }
            )
            .setOrigin(0.5)
            .setInteractive();

        // Restart the game on click
        startNextLevelButton.on("pointerdown", () => {
            this.increaseLevelCount();
            this.scene.start("Game");
        });
    }

    increaseLevelCount() {
        const currentLevel: number = parseInt(getCookie("level") ?? "1");
        setCookie("level", currentLevel + 1);
    }
}

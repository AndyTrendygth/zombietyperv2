export class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    create() {
        // Add a "Game Over" text
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height / 2 - 50,
                "Game Over",
                { fontSize: "48px", color: "#ff0000" }
            )
            .setOrigin(0.5);

        // Add a "Retry" button
        const retryButton = this.add
            .text(this.scale.width / 2, this.scale.height / 2 + 50, "Retry", {
                fontSize: "32px",
                color: "#ffffff",
                backgroundColor: "#000000",
            })
            .setOrigin(0.5)
            .setInteractive();

        // Restart the game on click
        retryButton.on("pointerdown", () => {
            this.scene.start("Game");
        });
    }
}

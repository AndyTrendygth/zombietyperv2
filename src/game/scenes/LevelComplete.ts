import { getCookie, setCookie } from "typescript-cookie";

export class LevelComplete extends Phaser.Scene {
    constructor() {
        super("LevelComplete");
    }
    level: number;
    levelData: any;

    init(data: any) {
        // this.data.set("levelData", data.levelData);
        // this.data.set("level", data.level);
        this.level = data.level;
        this.levelData = data.levelData;
    }

    create() {
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height / 2 - 50,
                `Day ${getCookie("level")} Completed`,
                { fontSize: "48px", color: "#ff0000" }
            )
            .setOrigin(0.5);
        if (this.levelData.choices != undefined) {
            this.showChoice();
        } else {
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
    }

    showChoice() {
        //Ask the user what they want to do next
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height / 2 + 50,
                this.levelData.choices.text,
                { fontSize: "32px", color: "#ffffff" }
            )
            .setOrigin(0.5);
        const choiceOne = this.add
            .text(
                this.scale.width / 2 - 100,
                this.scale.height / 2 + 200,
                this.levelData.choices.options[0].text
            )
            .setInteractive()
            .setOrigin(0.5);
        const choiceTwo = this.add
            .text(
                this.scale.width / 2 + 100,
                this.scale.height / 2 + 200,
                this.levelData.choices.options[1].text
            )
            .setInteractive()
            .setOrigin(0.5);

        choiceOne.on("pointerdown", () => {
            this.setLevel(this.levelData.choices.options[0].nextLevel);
            this.scene.start("Game");
        });
        choiceTwo.on("pointerdown", () => {
            this.setLevel(this.levelData.choices.options[1].nextLevel);
            this.scene.start("Game");
        });
    }

    increaseLevelCount() {
        const currentLevel: number = parseInt(getCookie("level") ?? "1");
        setCookie("level", currentLevel + 1);
    }

    setLevel(level: number) {
        setCookie("level", level);
    }
}

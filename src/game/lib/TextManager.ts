export class TextManager {
    scene: Phaser.Scene;
    currentKey: string;
    currentKeyIndex: number;
    text: string;
    textObjects: Phaser.GameObjects.Text[]; // Array of text objects for each character

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.currentKey = "";
        this.currentKeyIndex = 0;
        this.textObjects = [];
    }

    setText(text: string) {
        const startX = window.innerWidth / 2 - text.length * 10; // Starting X position
        const startY = window.innerHeight / 3;
        this.text = text;
        this.currentKeyIndex = 0;

        // Create text objects for each character
        this.textObjects = text.split("").map((char, index) => {
            const textObj = this.scene.add.text(
                startX + index * 20, // Adjust spacing
                startY,
                char,
                {
                    fontSize: "32px",
                    color: "#FFFFFF",
                    backgroundColor: index === 0 ? "#444444" : "", // Highlight first character
                }
            );
            return textObj;
        });

        this.currentKey = text[0]; // Set the first key
    }

    getCurrentKey() {
        return this.currentKey;
    }

    setCurrentKeyToNext(isCorrect: boolean) {
        if (this.currentKeyIndex < this.text.length) {
            const currentTextObj = this.textObjects[this.currentKeyIndex];
            currentTextObj.setColor(isCorrect ? "#FFFFFF" : "#FF0000"); // White if correct, red if wrong
            currentTextObj.setBackgroundColor(""); // Remove background color

            this.currentKeyIndex++;
            if (this.currentKeyIndex < this.text.length) {
                this.currentKey = this.text[this.currentKeyIndex];
                this.updateCurrentKeyStyle();
            }
        }
    }

    setCurrentKeyToPrevious() {
        if (this.currentKeyIndex > 0) {
            const previousTextObj = this.textObjects[this.currentKeyIndex];
            previousTextObj.setColor("#FFFFFF"); // Reset color to white
            previousTextObj.setBackgroundColor(""); // Remove background color

            this.currentKeyIndex--;
            this.currentKey = this.text[this.currentKeyIndex];
            this.updateCurrentKeyStyle();
        }
    }

    updateCurrentKeyStyle() {
        const currentTextObj = this.textObjects[this.currentKeyIndex];
        currentTextObj.setBackgroundColor("#444444"); // Add background color for current key
    }

    isTextDone() {
        if (this.currentKeyIndex == this.text.length) {
            this.textObjects.forEach((textObj) => textObj.destroy());
            return true;
        }
        return false;
    }
}

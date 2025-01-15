export class TextManager {
    scene: Phaser.Scene;
    text: string;
    currentKeyIndex: number;
    textDone: Phaser.GameObjects.Text;
    textTodo: Phaser.GameObjects.Text;
    currentKey: string;
    visibleLength: number;
    baseX: number; // Starting X position for alignment
    fontSize: number; // Font size to calculate character width

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.currentKeyIndex = 0;
        this.visibleLength = 20;
        this.baseX = window.innerWidth / 2 - 300;
        this.fontSize = 32; // Assuming 32px font size
    }

    setText(text: string) {
        const startY = window.innerHeight / 3;

        this.text = text;
        this.currentKeyIndex = 0;
        this.currentKey = text[0];

        // Create textDone and textTodo objects
        this.textDone = this.scene.add.text(this.baseX, startY, "", {
            fontSize: `${this.fontSize}px`,
            color: "#FFFFFF",
        });

        this.textTodo = this.scene.add.text(this.baseX + 200, startY, text, {
            fontSize: `${this.fontSize}px`,
            color: "#aaaaaa",
        });

        this.updateDisplay();
    }

    getCurrentKey() {
        return this.currentKey;
    }

    updateDisplay() {
        // Get the parts of the text to display
        const doneStart = Math.max(
            0,
            this.currentKeyIndex - this.visibleLength
        );
        const doneText = this.text.substring(doneStart, this.currentKeyIndex);

        const todoText = this.text.substring(
            this.currentKeyIndex + 1,
            this.currentKeyIndex + this.visibleLength + 1
        );

        const currentKeyChar = this.text[this.currentKeyIndex];

        // Update the textDone content
        this.textDone.setText(doneText);

        // Calculate the new position for textDone to ensure alignment
        const doneTextWidth = this.textDone.width;
        this.textDone.setX(this.baseX + 200 - doneTextWidth);

        // Update the textTodo content
        this.textTodo.setText(`[${currentKeyChar}]${todoText}`);
    }

    setCurrentKeyToNext(isCorrect: boolean) {
        if (this.currentKeyIndex < this.text.length - 1) {
            if (isCorrect) {
            }
            this.currentKeyIndex++;
            this.currentKey = this.text[this.currentKeyIndex];
            this.updateDisplay();
        }
    }

    setCurrentKeyToPrevious() {
        if (this.currentKeyIndex > 0) {
            this.currentKeyIndex--;
            this.currentKey = this.text[this.currentKeyIndex];
            this.updateDisplay();
        }
    }

    isTextDone() {
        return this.currentKeyIndex >= this.text.length;
    }
}

export class TextManagerWithChars {
    scene: Phaser.Scene;
    text: string;
    currentKeyIndex: number;
    textDone: Phaser.GameObjects.Text[];
    textTodo: Phaser.GameObjects.Text[];
    currentKey: string;
    visibleLength: number;
    baseX: number;
    fontSize: number;
    baseY: number;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.currentKeyIndex = 0;
        this.visibleLength = 20;
        this.baseX = window.innerWidth / 2 - 300;
        this.fontSize = 32;
        this.baseY = window.innerHeight / 3;
    }

    setText(text: string) {
        this.text = text;
        this.currentKeyIndex = 0;
        this.currentKey = text[0];
        this.textTodo = [];
        if (!this.textDone) {
            this.textDone = [];
        }
        text.slice(0, 20)
            .split("")
            .forEach((char, index) => {
                const textObj = this.scene.add.text(
                    this.baseX + 200 + index * 20,
                    this.baseY,
                    char,
                    {
                        fontSize: `${this.fontSize}px`,
                        color: "#aaaaaa",
                    }
                );
                this.textTodo.push(textObj);
            });
        this.textTodo[0].setBackgroundColor("#444444");
    }

    setCurrentKeyToNext(isCorrect: boolean) {
        if (this.currentKeyIndex < this.text.length) {
            //referenz auf currentchar im texttodo
            const doneChar = this.textTodo[0];
            doneChar.setBackgroundColor("");
            //gib ihn in textdone
            if (isCorrect) {
                doneChar.setColor("#ffffff");
                this.textDone.push(doneChar);
            } else {
                doneChar.setColor("#ff0000");
                this.textDone.push(doneChar);
            }
            //schmeiß ihn aus todo raus
            this.textTodo.splice(0, 1);
            //wenn größer als
            if (this.textDone.length >= this.visibleLength) {
                this.textDone.splice(0, 1);
                this.textDone[0].destroy();
            }
            //füg neuen character aus text zu todo hinzu
            this.textTodo.push(
                this.scene.add.text(
                    this.baseX +
                        200 +
                        (this.currentKeyIndex +
                            this.visibleLength -
                            this.currentKeyIndex) *
                            20,
                    this.baseY,
                    this.text[this.currentKeyIndex + this.visibleLength],
                    {
                        fontSize: `${this.fontSize}px`,
                        color: "#aaaaaa",
                    }
                )
            );
            //done eines nach links verschieben
            this.textDone.forEach((element, index) => {
                element.setX(
                    this.baseX + 200 - (this.textDone.length - index) * 20
                );
            });
            //todo eines nach links verschieben
            this.textTodo.forEach((element, index) => {
                element.setX(this.baseX + 600 - (20 - index) * 20);
            });
            //background auf current key anwenden
            this.textTodo[0].setBackgroundColor("#444444");
            this.currentKeyIndex++;
            this.currentKey = this.text[this.currentKeyIndex];
        }
    }

    setCurrentKeyToPrevious() {
        if (this.currentKeyIndex > 0) {
            //get the recent char
            const charToReturn = this.textDone[this.textDone.length - 1];
            //remove it from done
            this.textDone.splice(this.textDone.length - 1, 1);
            //add it to the todo
            this.textTodo[0].setBackgroundColor("");
            this.textTodo.unshift(charToReturn);
            this.textTodo[0].setColor("#aaaaaa");
            //remove the last character from todo
            this.textTodo[this.textTodo.length - 1].destroy();
            this.textTodo.pop();
            //move todo one to the right
            this.textTodo.forEach((element, index) => {
                element.setX(this.baseX + 200 + (index + 1) * 20);
            });
            //move done one to the right
            this.textDone.forEach((element, index) => {
                element.setX(
                    this.baseX + 200 - (this.textDone.length - index - 1) * 20
                );
            });
            //set Background of current key
            this.textTodo[0].setBackgroundColor("#444444");
            this.currentKeyIndex--;
            this.currentKey = this.text[this.currentKeyIndex];
        }
    }

    getCurrentKey() {
        return this.currentKey;
    }

    isTextDone() {
        console.log(this.currentKeyIndex + " " + this.text.length);
        return this.currentKeyIndex >= this.text.length;
    }
}

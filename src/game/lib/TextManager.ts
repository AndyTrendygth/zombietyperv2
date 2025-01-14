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

//chatgpt stuff with buffer length that I want to implement but is currently not working
// export class TextManager {
//     scene: Phaser.Scene;
//     currentKey: string;
//     currentKeyIndex: number;
//     text: string;
//     textObjects: Phaser.GameObjects.Text[]; // Array of text objects for each character
//     visibleText: string; // Text currently visible in the display window
//     startIndex: number; // Start index of the visible text
//     endIndex: number; // End index of the visible text
//     visibleLength: number; // Length of the visible text (e.g., 40 characters)
//     bufferLength: number; // Buffer characters visible on either side

//     constructor(
//         scene: Phaser.Scene,
//         visibleLength: number = 40,
//         bufferLength: number = 10
//     ) {
//         this.scene = scene;
//         this.currentKey = "";
//         this.currentKeyIndex = 0;
//         this.textObjects = [];
//         this.visibleLength = visibleLength;
//         this.bufferLength = bufferLength;
//         this.startIndex = 0;
//         this.endIndex = visibleLength;
//     }

//     setText(text: string) {
//         this.text = text;
//         this.currentKeyIndex = 0;
//         this.startIndex = 0;
//         this.endIndex = this.visibleLength;
//         this.updateVisibleText();
//         this.displayText();
//     }

//     updateVisibleText() {
//         const bufferStart = Math.max(0, this.startIndex - this.bufferLength);
//         const bufferEnd = Math.min(
//             this.text.length,
//             this.endIndex + this.bufferLength
//         );
//         this.visibleText = this.text.slice(bufferStart, bufferEnd);
//         console.log(this.visibleText);
//     }

//     displayText() {
//         // Clear existing text objects
//         this.textObjects.forEach((obj) => obj.destroy());
//         this.textObjects = [];

//         const startX = window.innerWidth / 2 - (this.visibleLength * 10) / 2; // Center horizontally
//         const startY = window.innerHeight / 3; // Vertical position

//         // Render the visible text
//         this.visibleText.split("").forEach((char, index) => {
//             const textObj = this.scene.add.text(
//                 startX + index * 20, // Adjust spacing
//                 startY,
//                 char,
//                 {
//                     fontSize: "32px",
//                     color: "#FFFFFF",
//                     backgroundColor:
//                         index + this.startIndex === this.currentKeyIndex
//                             ? "#444444"
//                             : "", // Highlight current character
//                 }
//             );
//             this.textObjects.push(textObj);
//         });

//         this.currentKey = this.text[this.currentKeyIndex];
//     }

//     getCurrentKey() {
//         return this.currentKey;
//     }

//     setCurrentKeyToNext(isCorrect: boolean) {
//         if (this.currentKeyIndex < this.text.length) {
//             const relativeIndex = this.currentKeyIndex - this.startIndex;
//             const currentTextObj = this.textObjects[relativeIndex];
//             currentTextObj.setColor(isCorrect ? "#FFFFFF" : "#FF0000"); // White if correct, red if wrong
//             currentTextObj.setBackgroundColor(""); // Remove background color

//             this.currentKeyIndex++;

//             if (this.currentKeyIndex <= this.endIndex) {
//                 this.startIndex++;
//                 this.endIndex++;
//                 this.updateVisibleText();
//                 this.displayText();
//             } else {
//                 this.updateCurrentKeyStyle();
//             }
//         }
//     }

//     setCurrentKeyToPrevious() {
//         if (this.currentKeyIndex > 0) {
//             const relativeIndex = this.currentKeyIndex - this.startIndex;
//             const previousTextObj = this.textObjects[relativeIndex];
//             previousTextObj.setColor("#FFFFFF"); // Reset color to white
//             previousTextObj.setBackgroundColor(""); // Remove background color

//             this.currentKeyIndex--;

//             if (this.currentKeyIndex < this.startIndex) {
//                 this.startIndex--;
//                 this.endIndex--;
//                 this.updateVisibleText();
//                 this.displayText();
//             } else {
//                 this.updateCurrentKeyStyle();
//             }
//         }
//     }

//     updateCurrentKeyStyle() {
//         const relativeIndex = this.currentKeyIndex - this.startIndex;
//         const currentTextObj = this.textObjects[relativeIndex];
//         currentTextObj.setBackgroundColor("#444444"); // Add background color for current key
//     }

//     isTextDone() {
//         if (this.currentKeyIndex === this.text.length) {
//             this.textObjects.forEach((textObj) => textObj.destroy());
//             return true;
//         }
//         return false;
//     }
// }

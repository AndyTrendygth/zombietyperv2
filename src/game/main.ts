import { Game as MainGame } from "./scenes/Game";
import { AUTO, Game, Types } from "phaser";
import { GameOver } from "./scenes/GameOver";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "game-container",
    backgroundColor: "#1D1B20",
    scene: [MainGame, GameOver],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 1, y: 300 },
            debug: false,
        },
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
};

export default StartGame;


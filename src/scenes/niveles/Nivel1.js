import Phaser from "phaser";

export default class Nivel1 extends Phaser.Scene {
    constructor() {
        super("Nivel1");
    }

    create() {
        this.map = this.make.tilemap({ key: "nivel1" });
        const tiledBackground = this.map.addTilesetImage("atlas-lava", "atlas-lava");
        this.map.createLayer("piso", tiledBackground);
    }

}
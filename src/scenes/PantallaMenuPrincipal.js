import Phaser from "phaser";

export default class PantallaMenuPrincipal extends Phaser.Scene {
    constructor() {
        super("PantallaMenuPrincipal");
    }


    create() {
        this.add.image(0, 0, 'fondo-menu').setOrigin(0);

    }
}
import Phaser from "phaser";
import Boton from "../objetos/Boton";

export default class PatallaGameOver extends Phaser.Scene {
    constructor() {
        super("PatallaGameOver");
    }


    create() {

        this.add.text((this.scale.width / 2), (this.scale.height / 2) - 160, "Fin de la ronda", { fontSize: '200px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);
        // eslint-disable-next-line no-new
        new Boton(this, this.scale.width / 2, (this.scale.height / 2) + 200, 'Menu', () => {
            this.scene.start('PantallaMenu');
        }, 1, 50, 'fondo-boton');

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('PantallaMenu');
        });
    }
}
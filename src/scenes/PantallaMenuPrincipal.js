import Phaser from "phaser";
import Boton from "../objetos/Boton";

export default class PantallaMenuPrincipal extends Phaser.Scene {
    constructor() {
        super("PantallaMenuPrincipal");
    }


    create() {
        this.add.image(0, 0, 'fondo-menu').setOrigin(0);

        this.add.text((this.scale.width / 2), (this.scale.height / 2) - 160, "Win or Die", { fontSize: '200px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);
        // eslint-disable-next-line no-new
        new Boton(this, this.scale.width / 2, (this.scale.height / 2) + 200, 'ENTER', () => {
            this.scene.start('PantallaMenu');
        }, 1, 50, 'fondo-boton');

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('PantallaMenu');
        });
    }
}
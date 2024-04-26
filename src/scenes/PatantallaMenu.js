import Phaser from "phaser";
import BotonAmarrillo from "../objetos/BotonAmarrillo";

export default class PantallaMenu extends Phaser.Scene {
    constructor() {
        super("PantallaMenu");
    }


    create() {
        this.add.image(0, 0, 'fondo-menu').setOrigin(0);

        this.add.text(200, (this.scale.height / 2) - 240, "Win or Die", { fontSize: '80px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);

        this.rectangle = this.add.rectangle(160, (this.scale.height / 2) + 40, 320, 240, 0x000000);
        this.rectangle.alpha = 0.5;

        // eslint-disable-next-line no-new
        new BotonAmarrillo(this, 140, (this.scale.height / 2), 'Equipo', () => {
            this.scene.start('Nivel1');
        }, 1, 50, 'fondo-boton');
        // eslint-disable-next-line no-new
        new BotonAmarrillo(this, 140, (this.scale.height / 2) + 100, 'Controles', () => {
            this.scene.start('PantallaControles');
        }, 1, 50, 'fondo-boton');

        // this.input.keyboard.on('keydown-ENTER', () => {
        //     this.scene.start('PantallaMenu');
        // });
    }
}
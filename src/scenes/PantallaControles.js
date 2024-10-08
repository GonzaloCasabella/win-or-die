import Phaser from "phaser";
import Boton from "../objetos/Boton";
import { getPhrase } from "../traducciones";
import { generalKeys } from "../traducciones/keys";

export default class PantallaControles extends Phaser.Scene {
    constructor() {
        super("PantallaControles");
    }


    create() {
        this.add.image(0, 0, 'fondo-control').setOrigin(0);


        // eslint-disable-next-line no-new
        new Boton(this, this.scale.width / 2, (this.scale.height) - 140, getPhrase(generalKeys.volver), () => {
            this.scene.start('PantallaMenu');
        }, 0.8, 50, 'fondo-boton');
    }
}
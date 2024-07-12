import Phaser from "phaser";
import Boton from "../objetos/Boton";
// import { getTranslations, getPhrase } from "../traducciones";
// import { EN_US } from "../traducciones/languages";

export default class PantallaMenuPrincipal extends Phaser.Scene {
    constructor() {
        super("PantallaMenuPrincipal");
    }


    create() {
        // const traducciones = getTranslations(EN_US).then(res => console.log(res));
        // console.log(traducciones)
        this.add.image(0, 0, 'fondo-menu').setOrigin(0);

        this.add.text((this.scale.width / 2), (this.scale.height / 2) - 160, "Win or Die", { fontSize: '200px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);
        // eslint-disable-next-line no-new
        new Boton(this, this.scale.width / 2, (this.scale.height / 2) + 200, "Entrar", () => {
            this.scene.start('PantallaMenu');
        }, 1, 50, 'fondo-boton');

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('PantallaMenu');
        });
    }
}
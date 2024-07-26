import Phaser from "phaser";
import Boton from "../objetos/Boton";
import { getPhrase, getTranslations } from "../traducciones";
import { FETCHED, FETCHING } from "../traducciones/status";
import { EN_US, ES_AR, IT } from "../traducciones/languages";
import { sceneMenuPrincipal } from "../traducciones/keys";

export default class PantallaMenuPrincipal extends Phaser.Scene {
    constructor() {
        super("PantallaMenuPrincipal");
    }


    create() {
        this.add.image(0, 0, 'fondo-menu').setOrigin(0);
        this.add.text((this.scale.width / 2), (this.scale.height / 2) - 160, "Win or Die", { fontSize: '200px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);
        // eslint-disable-next-line no-new
        this.buttonEnter = new Boton(this, this.scale.width / 2, (this.scale.height / 2) + 200, getPhrase(sceneMenuPrincipal.entrar), () => {
            this.scene.start('PantallaMenu');
        }, 1, 50, 'fondo-boton');

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('PantallaMenu');
        });



        this.add.image(0, 0, "bandera-es").setOrigin(0).setScale(0.07).setInteractive().on('pointerdown', () => {
            this.getTranslations(ES_AR);
        });
        this.add.image(70, 0, "bandera-usa").setOrigin(0).setScale(0.068).setInteractive().on('pointerdown', () => {
            this.getTranslations(EN_US);
        });
        this.add.image(150, 0, "bandera-it").setOrigin(0).setScale(0.25, 0.21).setInteractive().on('pointerdown', () => {
            this.getTranslations(IT);
        });
    }

    updateWasChangedLanguage = () => {
        this.wasChangedLanguage = FETCHED;
    };

    async getTranslations(language) {
        this.language = language;
        this.wasChangedLanguage = FETCHING;
        await getTranslations(language, this.updateWasChangedLanguage);
    }

    update() {
        if (this.wasChangedLanguage === FETCHED) {
            this.buttonEnter.texto.setText(getPhrase(sceneMenuPrincipal.entrar));
        }
    }

}
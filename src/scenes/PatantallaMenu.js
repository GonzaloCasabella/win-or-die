import Phaser from "phaser";
import BotonAmarrillo from "../objetos/BotonAmarrillo";
import { getPhrase } from "../traducciones";
import { sceneMenu } from "../traducciones/keys";
import getWinner from "../firebase/getWinners";

export default class PantallaMenu extends Phaser.Scene {
    constructor() {
        super("PantallaMenu");
    }

    init() {
        if (!this.sound.get('musica-menu').isPlaying) {
            this.sound.play('musica-menu', { loop: true, volume: 0.1 });
        }
    }

    create() {
        this.add.image(0, 0, 'fondo-menu').setOrigin(0);

        this.add.text(200, (this.scale.height / 2) - 240, "Win or Die", { fontSize: '80px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);

        this.rectangle = this.add.rectangle(160, (this.scale.height / 2) + 40, 320, 240, 0x000000);
        this.rectangle.alpha = 0.5;

        // eslint-disable-next-line no-new
        new BotonAmarrillo(this, 140, (this.scale.height / 2), getPhrase(sceneMenu.jugar), () => {
            this.sound.stopByKey('musica-menu');
            this.scene.start('Nivel1');
        }, 1, 50, 'fondo-boton');
        // eslint-disable-next-line no-new
        new BotonAmarrillo(this, 140, (this.scale.height / 2) + 100, getPhrase(sceneMenu.controles), () => {
            this.scene.start('PantallaControles');
        }, 1, 50, 'fondo-boton');

        this.add.text(this.scale.width - 150, (this.scale.height / 2) - 150, `${getPhrase(sceneMenu.puntos)} - ${getPhrase(sceneMenu.equipo)}`, { fontSize: '40px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);

        getWinner().then((winners) => {
            winners.forEach((winner, index) => {
                this.add.text(this.scale.width - 150, (this.scale.height / 2) - 100 + (index * 40), `${winner.points} - ${getPhrase(winner.team)
                    } ⚡`, { fontSize: '30px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);
            });
        });
    }
}
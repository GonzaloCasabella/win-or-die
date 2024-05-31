import Phaser from "phaser";
import Boton from "../objetos/Boton";

export default class PantallaFinRonda extends Phaser.Scene {
    ganador;

    perdedor;

    constructor() {
        super("PantallaFinRonda");
    }

    init(data) {
        this.ganador = data.ganador;
        this.perdedor = data.perdedor;
    }

    create() {


        this.add.text((this.scale.width / 2), (this.scale.height / 2) - 160, "Fin de Ronda", { fontSize: '24px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);

        this.add.text(400, 100, "Gana", { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }).setOrigin(0.5);
        this.add.image(400, 150, this.ganador.textura).setOrigin(0.5);

        this.add.text(400, 200, this.ganador.monedas, { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }).setOrigin(0.5);

        this.add.text(400, 300, this.ganador.numeroRondasGanadas, { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }).setOrigin(0.5);



        // eslint-disable-next-line no-new
        new Boton(this, this.scale.width / 2, (this.scale.height / 2) + 200, 'Siguiente Ronda', () => {
            this.scene.start('PantallaMenu');
        }, 1, 50, 'fondo-boton');

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('PantallaMenu');
        });
    }
}
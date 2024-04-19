import Phaser from "phaser";

export default class PantallaCarga extends Phaser.Scene {
    constructor() {
        super("PantallaCarga");
    }

    preload() {
        this.load.image('fondo-carga', 'assets/fondos/fondo-carga.jpeg')
        this.load.image('fondo-menu', 'assets/fondos/fondo-menu.jpeg')
        this.load.image('fondo-desierto', 'assets/fondos/fondodesierto.jpeg')
        this.load.image('fondo-selva', 'assets/fondos/fondoselva.jpeg')
        this.load.image('fondo-boton', 'assets/sprites/fondo-boton.png')

        this.barraDeCarga();
    }


    create() {
        this.add.image(0, 0, 'fondo-carga').setOrigin(0)
    }

    barraDeCarga() {
        const maxWidth = 400;
        const rectanguloBarra = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, maxWidth, 30, '0xc21f19');

        this.add.text(this.scale.width / 2, this.scale.height / 2 - 40, 'PREPARANDO CONTENIDO', { fontSize: '24px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale' }).setOrigin(0.5)

        const texto = this.add.text(this.scale.width / 2, this.scale.height / 2, '0%', { fontSize: '18px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale' }).setOrigin(0.5)

        this.load.on('progress', (progress) => {
            rectanguloBarra.width = maxWidth * progress;
            texto.setText(`${Math.round(progress * 100)}%`)
        })

        this.load.on('complete', () => {
            this.scene.start('PantallaMenuPrincipal')
        });
    }
}
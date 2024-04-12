export default class Boton {

    constructor(scene, x, y, texto, callback, escala, textura) {
        this.texto = scene.add.text(0, 0, texto, { fontSize: 24, fontStyle: 'bold', color: 'white', fontFamily: 'Montserrat' }).setOrigin(0.5);
        this.image = scene.add
            .image(0, 0, textura)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                // scene.sonidos.sound.btnSFX.play()
                callback();
            })
            .on("pointerover", () => this.container.setScale(escala + 0.1))
            .on("pointerout", () => this.container.setScale(escala))

        this.container = scene.add.container(x, y, [this.image, this.texto]).setScale(escala);
    }
}
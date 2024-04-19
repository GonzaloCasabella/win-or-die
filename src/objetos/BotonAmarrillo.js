export default class BotonAmarrillo {

    constructor(scene, x, y, texto, callback, escala = 1, tamanio = 24) {
        this.texto = scene.add.text(0, 0, texto, { fontSize: tamanio, fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setInteractive({ useHandCursor: true }).setOrigin(0.5);

        this.rectangle = scene.add.rectangle(0, 0, 320, 90, 0xffff00).setOrigin(0.5);
        this.rectangle.alpha = 0; // Set initial opacity to 0
        this.texto.on("pointerdown", () => {
            callback();
        })
        this.texto.on("pointerover", () => {
            this.rectangle.alpha = 0.8; // Set opacity to 1 when pointer is over
        });

        this.texto.on("pointerout", () => {
            this.rectangle.alpha = 0; // Set opacity back to 0 when pointer is out
        });

        this.container = scene.add.container(x, y, [this.rectangle, this.texto]).setScale(escala);
    }
}
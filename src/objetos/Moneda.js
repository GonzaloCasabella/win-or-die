import Phaser from "phaser";

export default class Moneda extends Phaser.Physics.Arcade.Sprite {

    cantidad;

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);

        this.cantidad = 100;

        this.sonidoRecolectado = scene.sound.add('moneda-recolectada', { volume: 0.4 });
        this.animacion();
    }

    animacion() {
        this.scene.tweens.add({
            targets: this,
            scale: 0.9,
            duration: 400,
            ease: 'Easing.Bounce.Out',
            yoyo: true,
            repeat: -1
        });
    }

    recolectar() {
        this.sonidoRecolectado.play();
        this.destroy();
    }
}
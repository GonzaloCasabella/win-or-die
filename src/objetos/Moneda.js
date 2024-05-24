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

        this.animacion();
    }

    animacion() {
        // quiero hacer un tween en yoyo, que cambie la escala de 1 a 0.5 y de 0.5 a 1
        this.scene.tweens.add({
            targets: this,
            scale: 0.9,
            duration: 400,
            ease: 'Easing.Bounce.Out',
            yoyo: true,
            repeat: -1
        });
    }
}
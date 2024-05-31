import Phaser from "phaser";

export default class BolaFuego extends Phaser.Physics.Arcade.Sprite {

    exploto = false;

    constructor(scene, x, y) {
        super(scene, x, y, 'bola-fuego');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(32, 32);
        this.setOrigin(0, 0);
        this.body.setAllowGravity(false);

        this.setScale(1.55);
    }

    destruccion() {
        if (this.exploto) return;
        this.exploto = true;
        this.anims.play('bola-fuego-animacion').on('animationcomplete', () => {
            this.destroy();
        });
    }

};
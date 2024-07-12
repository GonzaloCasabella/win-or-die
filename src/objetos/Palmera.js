import Phaser from "phaser";

export default class Palmera extends Phaser.Physics.Arcade.Sprite {

    impacto = false;

    constructor(scene, x, y) {
        super(scene, x, y, 'palmera');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(32, 32);
        this.setOrigin(0, 0);
        this.body.setAllowGravity(false);

        this.setScale(1.55);
    }

    destruccion() {
        if (this.impacto) return;
        this.impacto = true;
        this.body.enable = false;
        // this.body.setAllowGravity(true);
        // quiero hacer que se caiga el objeto
        this.scene.tweens.add({
            targets: this,
            y: this.y + 124,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.destroy();
            }
        });

    }
}
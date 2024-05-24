import Phaser from 'phaser';

export default class Lava extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'lava');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(32, 32);
        this.setOrigin(0, 0);
        this.body.setAllowGravity(false);
        this.setImmovable();
        this.setVisible(true);
    }
}
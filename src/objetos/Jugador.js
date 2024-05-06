import Phaser from 'phaser';

export default class Jugador extends Phaser.Physics.Arcade.Sprite {

    contadorImpactos;

    ladoEquipo;

    puedeMoverse;

    constructor(scene, x, y, texture, frame, ladoEquipo) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.body.setAllowGravity(false);

        this.ladoEquipo = ladoEquipo;
        this.puedeMoverse = true;
    }

    recibirImpacto() {
        if (this.ladoEquipo === "izquierda") {
            this.scene.vidasEquipoIzquierda -= 1;
        } else if (this.ladoEquipo === "derecha") {
            this.scene.vidasEquipoDerecha -= 1;
        }

        this.contadorImpactos += 1;
    }

    mover(controles) {
        if (!this.puedeMoverse) {
            this.setVelocity(0);
            return;
        }
        if (controles.left.isDown) {
            this.setVelocityX(-150);
        } else if (controles.right.isDown) {
            this.setVelocityX(150);
        } else {
            this.setVelocityX(0);

        }

        if (controles.up.isDown) {
            this.setVelocityY(-150);
        } else {
            this.setVelocityY(0);
        }
    }



}
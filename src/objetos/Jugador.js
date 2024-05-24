import Phaser from 'phaser';
import events from '../scenes/EventCenter';

export default class Jugador extends Phaser.Physics.Arcade.Sprite {

    contadorImpactos;

    ladoEquipo;

    puedeMoverse;

    camara;

    velocidadInicialY;

    velocidadTurboY;

    constructor(scene, x, y, texture, ladoEquipo) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.body.setAllowGravity(false);
        this.setScale(1.55);
        this.ladoEquipo = ladoEquipo;
        this.puedeMoverse = true;

        this.velocidadInicialY = -150;
        this.velocidadTurboY = -350;
    }

    recibirImpacto() {
        if (this.ladoEquipo === "izquierda") {
            this.scene.vidasEquipoIzquierda -= 1;
        } else if (this.ladoEquipo === "derecha") {
            this.scene.vidasEquipoDerecha -= 1;
        }

        this.contadorImpactos += 1;
    }

    recolectarMoneda() {
        if (this.ladoEquipo === "izquierda") {
            this.scene.monedasEquipoIzquierda += 1;
            events.emit("moneda-recolectada", "izquierda", this.scene.monedasEquipoIzquierda);
        } else if (this.ladoEquipo === "derecha") {
            this.scene.monedasEquipoDerecha += 1;
        }
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
            this.setVelocityY(this.velocidadTurboY);
        } else {
            // this.setVelocityY(this.velocidadInicialY);
            this.setVelocityY(0);
        }
    }



}
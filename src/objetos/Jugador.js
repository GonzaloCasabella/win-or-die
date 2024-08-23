import Phaser from 'phaser';
import events from '../scenes/EventCenter';

export default class Jugador extends Phaser.Physics.Arcade.Sprite {
    textura;

    contadorImpactos;

    ladoEquipo;

    puedeMoverse;

    camara;

    velocidadInicialY;

    velocidadTurboY;

    monedas;

    numeroRondasGanadas;

    temporizador;

    acelerando;

    constructor(scene, x, y, texture, ladoEquipo, dataJugador = {}) {
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
        this.acelerando = false;

        this.monedas = dataJugador.monedas || 0;
        this.numeroRondasGanadas = dataJugador.numeroRondasGanadas || 0;
        this.temporizador = dataJugador.temporizador || 0;
        this.textura = texture;

        this.body.setSize(15, 50);
        this.scene.sound.play('auto-motor', { loop: true, volume: 0.2 });
    }

    recibirImpacto() {
        if (this.ladoEquipo === "izquierda") {
            this.scene.vidasEquipoIzquierda -= 1;
        } else if (this.ladoEquipo === "derecha") {
            this.scene.vidasEquipoDerecha -= 1;
        }

        this.contadorImpactos += 1;
    }

    actualizarTiempo() {
        this.temporizador += 1;
    }

    recolectarMoneda(cantidadMonedas) {
        if (this.ladoEquipo === "izquierda") {
            this.monedas += cantidadMonedas;
            events.emit("moneda-recolectada", "izquierda", this.monedas);
        } else if (this.ladoEquipo === "derecha") {
            this.monedas += cantidadMonedas;
            events.emit("moneda-recolectada", "derecha", this.monedas);
        }
    }

    mover(controles) {
        this.actualizarTiempo();
        if (!this.puedeMoverse) {
            this.setVelocity(0);
            return;
        }
        if (controles.left.isDown) {
            this.setVelocityX(-150);
            this.setAngle(-10);
        } else if (controles.right.isDown) {
            this.setVelocityX(150);
            this.setAngle(10);
        } else {
            this.setAngle(0);
            this.setVelocityX(0);
        }

        if (controles.up.isDown) {
            if (!this.acelerando) {
                this.scene.sound.play('auto-acelerar');
                this.acelerando = true;
            }

            this.setVelocityY(this.velocidadTurboY);
            if (controles.left.isDown) {
                this.setAngle(-10); // Gira el sprite 45 grados hacia la izquierda
            } else if (controles.right.isDown) {
                this.setAngle(10); // Gira el sprite 45 grados hacia la derecha
            } else {
                this.setAngle(0); // Mantiene el sprite recto
            }
        } else {
            this.setVelocityY(this.velocidadInicialY);
            // this.setVelocityY(0);
            this.acelerando = false;
        }
    }



}
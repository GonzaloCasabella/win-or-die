import Phaser from "phaser";

export default class Nivel1 extends Phaser.Scene {

    jugador1;

    jugador2;

    tiempo;

    camara1;

    camara2;

    controles;

    constructor() {
        super("Nivel1");
    }

    create() {
        this.map = this.make.tilemap({ key: "nivel1" });
        const tiledBackground = this.map.addTilesetImage("atlas-lava", "atlas-lava");
        this.map.createLayer("piso", tiledBackground);

        const objectsLayer = this.map.getObjectLayer("objetos");

        const spawnJugador1 = objectsLayer.objects.find(obj => obj.name === "jugador1");


        this.jugador1 = this.physics.add.sprite(spawnJugador1.x, spawnJugador1.y, "autocarrera-rojo");
        this.jugador1.setCollideWorldBounds(true);
        this.jugador1.body.setAllowGravity(false);
        this.jugador1.vidasEquipos = 3;
        this.jugador1.contadorImpacto = 0;

        // TODO: Agregar colisiones con los objetos del mapa. Cuando recibe daño, hace un flashback el sprite. 
        // Todo: agrregarle vida.


        this.controles = this.input.keyboard.createCursorKeys();

        // this.jugador2 = this.physics.add.sprite(200, 100, "jugador2");
    }


    update() {
        if (this.controles.left.isDown) {
            this.jugador1.setVelocityX(-150);
        } else if (this.controles.right.isDown) {
            this.jugador1.setVelocityX(150);
        } else {
            this.jugador1.setVelocityX(0);
        }

        if (this.controles.up.isDown) {
            this.jugador1.setVelocityY(-300);
            // TODO: Agregar sonido fuerte de acleracion.
        } else {
            this.jugador1.setVelocityY(0);
        }
    }
}
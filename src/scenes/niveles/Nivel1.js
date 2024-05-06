import Phaser from "phaser";
import Jugador from "../../objetos/Jugador";
import Lava from "../../objetos/Lava";

export default class Nivel1 extends Phaser.Scene {

    jugadorIzquierdo;

    jugadorDerecho;



    tiempo;

    camaraIzquierdo;

    camaraDerecha;

    controlesIzquierdos;

    controlesDerechos;

    vidasEquipoIzquierda = 3;

    vidasEquipoDerecha = 3;

    constructor() {
        super("Nivel1");
    }

    init() {
        this.tiempo = 30;
        this.vidasEquipoIzquierda = 3;
        this.vidasEquipoDerecha = 3;
    }


    create() {
        this.map = this.make.tilemap({ key: "nivel1" });
        const tiled = this.map.addTilesetImage("atlas-lava", "atlas-lava");
        this.map.createLayer("piso", tiled);

        this.map.createLayer("piso", tiled);
        this.map.createLayer("decoracion", tiled);

        const centro = this.map.createLayer("centro", tiled);
        centro.setCollisionByProperty({ collision: true });

        const objectsLayer = this.map.getObjectLayer("objetos");

        const spawnJugador1 = objectsLayer.objects.find(obj => obj.name === "jugador1");
        const spawnJugador2 = objectsLayer.objects.find(obj => obj.name === "jugador2");

        const todasLavas = objectsLayer.objects.filter(obj => obj.type === "lava");


        this.lavaGrupo = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });


        this.jugadorIzquierdo = new Jugador(this, spawnJugador1.x, spawnJugador1.y, "autocarrera-rojo", "izquierda");
        this.jugadorDerecho = new Jugador(this, spawnJugador2.x, spawnJugador2.y, "autocarrera-lila", "derecha");

        for (let i = 0; i < todasLavas.length; i += 1) {
            const lava = todasLavas[i];
            const lavaPhysics = new Lava(this, lava.x, lava.y);
            this.lavaGrupo.add(lavaPhysics);
        }

        this.physics.add.collider(this.jugadorIzquierdo, centro);
        this.physics.add.collider(this.jugadorDerecho, centro);
        this.physics.add.collider(this.jugadorIzquierdo, this.lavaGrupo, this.collisionLava, null, this);
        this.physics.add.collider(this.jugadorDerecho, this.lavaGrupo, this.collisionLava, null, this);


        this.controlesDerechos = this.input.keyboard.createCursorKeys();

        this.controlesIzquierdos = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.camaraIzquierdo = this.cameras.main.setSize(this.scale.width / 2, this.scale.height);
        this.camaraIzquierdo.scrollX = 0;
        this.camaraIzquierdo.setBounds(0, 0, this.map.widthInPixels / 2, this.map.heightInPixels);
        this.camaraIzquierdo.startFollow(this.jugadorIzquierdo);

        // this.establecerCamara(0, 0, this.camaraIzquierdo, this.jugadorIzquierdo, this.map.widthInPixels / 2, this.map.heightInPixels);

        this.camaraDerecha = this.cameras.add(this.scale.width / 2, 0, this.scale.width / 2, this.scale.height);
        this.camaraDerecha.scrollX = this.scale.width / 2;

        // this.establecerCamara(this.scale.width / 2, 0, this.camaraDerecha, this.jugadorDerecho, this.map.widthInPixels / 2, this.map.heightInPixels);
        this.camaraDerecha.setBounds(this.scale.width / 2, 0, this.map.widthInPixels / 2, this.map.heightInPixels);
        this.camaraDerecha.startFollow(this.jugadorDerecho);

    }


    update() {
        if (this.vidasEquipoIzquierda <= 0 || this.vidasEquipoDerecha <= 0) {
            // TODO: cambiar a gameover.
            this.scene.start("PantallaMenuPrincipal");
        }
        this.jugadorDerecho.mover(this.controlesDerechos);

        this.jugadorIzquierdo.mover(this.controlesIzquierdos);
    }

    // establecerCamara(x, y, camara, jugador, width, height) {
    //     const cam = camara;
    //     cam.setBounds(x, y, width, height);
    //     cam.startFollow(jugador);
    // }

    collisionLava(jugador) {
        // Cuando el jugador colisiona con la lava, termina el nivel, accediendo al GameOver. Establecemos la propiedad del jugador puedeMoverse a false, para que no pueda moverse.

        const jugadorLocal = jugador;
        jugadorLocal.puedeMoverse = false;
        this.tweens.add({
            targets: jugadorLocal,
            scaleX: 0.5,
            scaleY: 0.5,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                // jugador.recibirImpacto();
                // jugador.x = spawnJugador.x;
                // jugador.y = spawnJugador.y;

                this.scene.start("PatallaGameOver");
            }
        });
    }

    // collisionObstaculo(jugador, obstaculo, spawnJugador) {
    //     // Cuando 
    //     jugador.puedeMoverse = false;


    //     this.tweens.add({
    //         targets: jugador,
    //         scaleX: 0.5,
    //         scaleY: 0.5,
    //         duration: 1000,
    //         ease: 'Linear',
    //         onComplete: () => {
    //             jugador.recibirImpacto();

    //             // TODO: agregar animacion del obstaculo, cuando termina la animacion este se destruye.
    //             // obstaculo.destroy();
    //         }
    //     });
    // }


}
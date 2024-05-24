import Phaser from "phaser";
import Jugador from "../../objetos/Jugador";
import Lava from "../../objetos/Lava";
import BolaFuego from "../../objetos/BolaFuego";

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
        const todosObsculos = objectsLayer.objects.filter(obj => obj.type === "obstaculo");


        this.jugadorIzquierdo = new Jugador(this, spawnJugador1.x, spawnJugador1.y, "autocarrera-rojo", "izquierda");
        this.jugadorDerecho = new Jugador(this, spawnJugador2.x, spawnJugador2.y, "autocarrera-lila", "derecha");

        // Creacion de grupos de obstaculos:

        this.lavaGrupo = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.obstaculos = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        for (let i = 0; i < todasLavas.length; i += 1) {
            const lava = todasLavas[i];
            const lavaPhysics = new Lava(this, lava.x, lava.y);
            this.lavaGrupo.add(lavaPhysics);
        }

        // crear los boscatulos en el mapa, usando las clase de BolaFuego
        for (let i = 0; i < todosObsculos.length; i += 1) {
            const obstaculo = todosObsculos[i];
            const obstaculoPhysics = new BolaFuego(this, obstaculo.x, obstaculo.y);
            this.obstaculos.add(obstaculoPhysics);
        }

        // Configuracion de las colisiones:

        this.physics.add.collider(this.jugadorIzquierdo, centro);
        this.physics.add.collider(this.jugadorDerecho, centro);
        this.physics.add.collider(this.jugadorIzquierdo, this.lavaGrupo, this.collisionLava, null, this);
        this.physics.add.collider(this.jugadorDerecho, this.lavaGrupo, this.collisionLava, null, this);
        this.physics.add.collider(this.jugadorIzquierdo, this.obstaculos, this.collisionObstaculo, null, this);
        this.physics.add.collider(this.jugadorDerecho, this.obstaculos, this.collisionObstaculo, null, this);


        // Configuracion de los controles de los jugadores:
        this.controlesDerechos = this.input.keyboard.createCursorKeys();

        this.controlesIzquierdos = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


        // Configuracion de las camaras:
        this.camaraIzquierdo = this.cameras.main.setSize(this.scale.width / 2, this.scale.height);
        this.camaraIzquierdo.scrollX = 0;
        this.camaraIzquierdo.setBounds(0, 0, this.map.widthInPixels / 2, this.map.heightInPixels);
        this.camaraIzquierdo.startFollow(this.jugadorIzquierdo);

        this.camaraDerecha = this.cameras.add(this.scale.width / 2, 0, this.scale.width / 2, this.scale.height);
        this.camaraDerecha.scrollX = this.scale.width / 2;

        this.camaraDerecha.setBounds(this.scale.width / 2, 0, this.map.widthInPixels / 2, this.map.heightInPixels);
        this.camaraDerecha.startFollow(this.jugadorDerecho);


        this.scene.launch("ui", { tiempo: (this.map.heightInPixels / this.jugadorIzquierdo.velocidadInicialY) * -0.75 });
    }


    update() {
        if (this.vidasEquipoIzquierda <= 0 || this.vidasEquipoDerecha <= 0) {
            // TODO: cambiar a gameover.
            this.scene.start("PantallaMenuPrincipal");
        }
        this.jugadorDerecho.mover(this.controlesDerechos);

        this.jugadorIzquierdo.mover(this.controlesIzquierdos);
    }

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

    collisionObstaculo(jugador, obstaculo) {

        const jugadorLocal = jugador;
        jugadorLocal.puedeMoverse = false;

        obstaculo.destruccion();
        jugador.recibirImpacto();


        const inicioColor = Phaser.Display.Color.ValueToColor(jugadorLocal.tint);
        const finalColor = Phaser.Display.Color.ValueToColor(0x000000);


        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 50,
            repeat: 1,
            yoyo: true,
            ease: Phaser.Math.Easing.Sine.InOut,
            onUpdate: tween => {

                const value = tween.getValue();
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(inicioColor, finalColor, 100, value)

                const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b)
                jugadorLocal.setTint(color)
            },
            onComplete: () => {
                jugadorLocal.clearTint();
                jugadorLocal.puedeMoverse = true;
            }
        });


        this.camaraIzquierdo.shake(100, 0.01);
        this.camaraIzquierdo.flash(100, 255, 0, 0);
    }


}
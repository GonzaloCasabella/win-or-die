import Phaser from "phaser";
import Jugador from "../../objetos/Jugador";
import Lava from "../../objetos/Lava";
import BolaFuego from "../../objetos/BolaFuego";
import Moneda from "../../objetos/Moneda";
import Meta from "../../objetos/Meta";

export default class Nivel1 extends Phaser.Scene {
    vidasEquipoIzquierda = 3;

    vidasEquipoDerecha = 3;

    monedasEquipoIzquierda = 0;

    monedasEquipoDerecha = 0;

    constructor() {
        super("Nivel1");
    }

    init() {
        this.tiempo = 30;
        this.vidasEquipoIzquierda = 3;
        this.vidasEquipoDerecha = 3;
        this.monedasEquipoIzquierda = 0;
        this.monedasEquipoDerecha = 0;
        this.ganador = null;
    }

    create() {
        this.sound.play('auto-motor', { loop: true, volume: 0.1 });
        this.map = this.make.tilemap({ key: "nivel1" });
        const tiled = this.map.addTilesetImage("atlas-lava", "atlas-lava");
        this.map.createLayer("piso", tiled);
        this.map.createLayer("decoracion", tiled);
        const centro = this.map.createLayer("centro", tiled);
        centro.setCollisionByProperty({ collision: true });

        const objectsLayer = this.map.getObjectLayer("objetos");
        const spawnJugador1 = objectsLayer.objects.find(obj => obj.name === "jugador1");
        const spawnJugador2 = objectsLayer.objects.find(obj => obj.name === "jugador2");

        this.jugadorIzquierdo = new Jugador(this, spawnJugador1.x, spawnJugador1.y, "autocarrera-rojo", "izquierda");
        this.jugadorDerecho = new Jugador(this, spawnJugador2.x, spawnJugador2.y, "autocarrera-lila", "derecha");

        this.createGroups(objectsLayer);
        this.setupCollisions(centro);
        this.setupControls();
        this.setupCameras();

        this.scene.launch("ui", {
            tiempo: (this.map.heightInPixels / this.jugadorIzquierdo.velocidadInicialY) * -0.75,
            jugadorIzquierdo: this.jugadorIzquierdo,
            jugadorDerecho: this.jugadorDerecho
        });
    }

    createGroups(objectsLayer) {
        this.lavaGrupo = this.createGroup(objectsLayer, "lava", Lava);
        this.obstaculos = this.createGroup(objectsLayer, "obstaculo", BolaFuego);
        this.monedas = this.createGroup(objectsLayer, "moneda", Moneda, "moneda");
        this.metas = this.createGroup(objectsLayer, "meta", Meta, null, -32);
    }

    createGroup(objectsLayer, type, ClassType, texture = null, yOffset = 0) {
        const group = this.physics.add.group({ immovable: true, allowGravity: false });
        objectsLayer.objects.filter(obj => obj.type === type).forEach(obj => {
            const instance = new ClassType(this, obj.x, obj.y + yOffset, texture);
            group.add(instance);
        });
        return group;
    }

    setupCollisions(centro) {
        const jugadores = [this.jugadorIzquierdo, this.jugadorDerecho];
        jugadores.forEach(jugador => {
            this.physics.add.collider(jugador, centro);
            this.physics.add.collider(jugador, this.lavaGrupo, this.collisionLava, null, this);
            this.physics.add.collider(jugador, this.obstaculos, this.collisionObstaculo, null, this);
            this.physics.add.overlap(jugador, this.monedas, this.recolectarMoneda, null, this);
            this.physics.add.overlap(jugador, this.metas, () => this.establecerGanador(jugador, 1), null, this);
        });
    }

    setupControls() {
        this.controlesDerechos = this.input.keyboard.createCursorKeys();
        this.controlesIzquierdos = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }

    setupCameras() {
        this.camaraIzquierdo = this.cameras.main.setSize(this.scale.width / 2, this.scale.height);
        this.camaraIzquierdo.setBounds(0, 0, this.map.widthInPixels / 2, this.map.heightInPixels);
        this.camaraIzquierdo.startFollow(this.jugadorIzquierdo);

        this.camaraDerecha = this.cameras.add(this.scale.width / 2, 0, this.scale.width / 2, this.scale.height);
        this.camaraDerecha.setBounds(this.scale.width / 2, 0, this.map.widthInPixels / 2, this.map.heightInPixels);
        this.camaraDerecha.startFollow(this.jugadorDerecho);
    }

    update() {
        if (this.vidasEquipoIzquierda <= 0 || this.vidasEquipoDerecha <= 0) {
            this.sound.stopAll();
            this.scene.stop("ui");
            const jugadorGanador = this.vidasEquipoIzquierda > 0 ? this.jugadorIzquierdo : this.jugadorDerecho;
            this.establecerGanador(jugadorGanador, 2);
        }
        this.jugadorDerecho.mover(this.controlesDerechos);
        this.jugadorIzquierdo.mover(this.controlesIzquierdos);
    }

    collisionLava(jugadorParametro) {
        const jugador = jugadorParametro;
        jugador.puedeMoverse = false;
        this.tweens.add({
            targets: jugador,
            scaleX: 0.5,
            scaleY: 0.5,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                this.sound.stopAll();
                this.scene.stop("ui");
                const jugadorGanador = [this.jugadorIzquierdo, this.jugadorDerecho].find(j => j !== jugador);
                this.establecerGanador(jugadorGanador, 2);
            }
        });
    }

    collisionObstaculo(jugadorParametro, obstaculo) {
        if (obstaculo.exploto) return;
        const jugador = jugadorParametro;
        jugador.puedeMoverse = false;
        obstaculo.destruccion();
        jugador.recibirImpacto();

        const inicioColor = Phaser.Display.Color.ValueToColor(jugador.tint);
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
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(inicioColor, finalColor, 100, value);
                jugador.setTint(Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b));
            },
            onComplete: () => {
                jugador.clearTint();
                jugador.puedeMoverse = true;
            }
        });

        this.camaraIzquierdo.shake(100, 0.01);
        this.camaraIzquierdo.flash(100, 255, 0, 0);
    }

    // eslint-disable-next-line class-methods-use-this
    recolectarMoneda(jugador, moneda) {
        moneda.recolectar();
        jugador.recolectarMoneda(moneda.cantidad);

    }

    establecerGanador(jugador, numero = null) {
        if (this.ganador) return;
        this.ganador = jugador;
        this.ganador.numeroRondasGanadas += numero || 1;

        const jugadorPerdedor = [this.jugadorIzquierdo, this.jugadorDerecho].find(j => j !== jugador);
        this.sound.stopAll();
        this.scene.stop("ui");
        this.scene.start("PantallaFinRonda", { ganador: this.ganador, perdedor: jugadorPerdedor });
    }
}
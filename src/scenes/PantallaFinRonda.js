import Phaser from "phaser";
import Boton from "../objetos/Boton";
import { getPhrase } from "../traducciones";
import { sceneFinRonda } from "../traducciones/keys";
import setWinner from "../firebase/setWinner";

export default class PantallaFinRonda extends Phaser.Scene {
    ganador;

    perdedor;

    constructor() {
        super("PantallaFinRonda");
    }

    init(data) {
        this.ganador = data.ganador;
        this.perdedor = data.perdedor;
    }

    async create() {
        this.add.image(0, 0, "fondo-menu").setOrigin(0).setAlpha(0.5);

        this.add.text((this.scale.width / 2), (this.scale.height / 2) - 300, getPhrase(sceneFinRonda.finNivel), { fontSize: '50px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);

        this.crearContenedorJugador(this.ganador, "J1", getPhrase(sceneFinRonda.gana), this.scale.width - ((this.scale.width / 2) + (this.scale.width / 2) / 2), this.scale.height / 2, "Gana");
        this.crearContenedorJugador(this.perdedor, "J2", getPhrase(sceneFinRonda.pierde), (this.scale.width / 2) + (this.scale.width / 2) / 2, this.scale.height / 2, "Pierde");

        // eslint-disable-next-line no-new
        new Boton(this, this.scale.width / 2, (this.scale.height / 2) + 200, getPhrase(sceneFinRonda.siguienteNivel), () => {
            this.scene.start('Nivel2', { ganador: this.ganador, perdedor: this.perdedor });
        }, 1, 50, 'fondo-boton');

        try {
            await setWinner(this.ganador.monedas, this.ganador.temporizador, this.ganador.ladoEquipo);
        } catch (error) {
            console.log(error);
        }
    }

    crearContenedorJugador(jugador, nombreParametro, condicionParametro, x, y, condicion) {
        const contenedor = this.add.container(x, y, []);

        if (condicion === "Gana") {
            contenedor.add(this.add.rectangle(0, 0, 250, 250, 0x00b050).setOrigin(0.5));
        } else {
            contenedor.add(this.add.rectangle(0, 0, 250, 250, 0x262626).setOrigin(0.5));
        }

        const imagen = this.add.image(0, 0, jugador.textura).setOrigin(0.5).setScale(1.5);

        const nombre = this.add.text(-100, -100, nombreParametro, { fontSize: "40px", fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);

        const tituloMonedas = this.add.text(90, -100, "PTS", { fontSize: "40px", fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);
        const monedas = this.add.text(90, -60, jugador.monedas, { fontSize: "40px", fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);
        const condicionTexto = this.add.text(0, 70, condicionParametro, { fontSize: "40px", fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);
        const rondasGanadas = this.add.text(-100, 100, jugador.numeroRondasGanadas, { fontSize: "40px", fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);

        contenedor.add([imagen, nombre, condicionTexto, tituloMonedas, monedas, rondasGanadas]);

        if (condicion === "Pierde") {
            imagen.alpha = 0.5;
            nombre.alpha = 0.5;
            monedas.alpha = 0.5;
            tituloMonedas.alpha = 0.5;
            condicionTexto.alpha = 0.5;
            rondasGanadas.alpha = 0.5;
        }

        return contenedor;
    }
}
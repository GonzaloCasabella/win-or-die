import Phaser from "phaser";
import events from "./EventCenter";
import { getPhrase } from "../traducciones";
import { sceneUI } from "../traducciones/keys";

// Manejador de eventos centralizados para comunicacion de componentes

// Importacion
// import events from './EventCenter'

// Emisor de mensaje de difusion
// Recibe el nombre del mensaje y los valores de parametro
// events.emit('health-changed', this.health)

// Receptor de mensaje, por ejemplo escena de UI
// Recibe el nombre del mensaje y una funcion callback a ejecutar
// events.on('health-changed', this.handleHealthChanged, this)

export default class UI extends Phaser.Scene {

  tiempoInicial;

  contadorTiempo;

  temporizadorTexto;

  ultimosSegundos = false;

  constructor() {
    super("ui");
  }

  init(data) {
    this.gameOver = false;
    this.tiempoInicial = data.tiempo;
    this.contadorTiempo = this.tiempoInicial;
    this.temporizadorTexto = this.add.text(this.scale.width / 2, 80, `${this.contadorTiempo}`, {
      fontFamily: "AlarmClock",
      fontStyle: "bold",
      fontSize: "60px",
      color: "#ffff00",
      strokeThickness: 2,
      stroke: "#b13208",
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#b13208",
        blur: 16,
        stroke: true,
        fill: true,
      },
    }).setOrigin(0.5);

    this.jugadorIzquierdo = data.jugadorIzquierdo;
    this.jugadorDerecho = data.jugadorDerecho;

    this.ultimosSegundos = false;
  }

  create() {
    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarTiempo,
      callbackScope: this,
      loop: true,
    });


    this.crearTemporizador();
    this.crearContadoresMonedas();

    // crea el evento para actualizar el contador de monedas dependiendo del juegador 

    events.on("moneda-recolectada", (ladoEquipo, numero) => {
      if (ladoEquipo === "izquierda") {
        this.textoIzquierda.setText(`${this.jugadorIzquierdo.monedas || numero}`);
      } else if (ladoEquipo === "derecha") {
        this.textoDerecha.setText(`${this.jugadorDerecho.monedas || numero}`);
      }
    });
  }


  crearTemporizador() {
    const uiArriba = this.add.image(this.scale.width / 2, 0, "temporizador-ui").setOrigin(0.5, 0);
    uiArriba.setScale(0.75)

    this.add.text(this.scale.width / 2, 14, getPhrase(sceneUI.terminaEn), {
      fontFamily: "AlarmClock",
      fontStyle: "bold",
      fontSize: "18px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.temporizadorTexto = this.add.text(this.scale.width / 2, 80, `${this.contadorTiempo}`, {
      fontFamily: "AlarmClock",
      fontStyle: "bold",
      fontSize: "60px",
      color: "#ffff00",
      strokeThickness: 2,
      stroke: "#b13208",
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#b13208",
        blur: 16,
        stroke: true,
        fill: true,
      },
    }).setOrigin(0.5);

    this.sound.play('timer', { loop: true, volume: 0.1 });
  }

  crearContadoresMonedas() {
    const background = this.add.image(0, 0, "contador-ui").setOrigin(0.5, 0);
    background.setScale(0.80);

    const contenedor = this.add.container(this.scale.width / 2, this.scale.height - background.height);

    // Crea un texto en la parte superior iz y derecha. con Jugador/a 1 y Jugador/a 2

    const textoJugador1 = this.add.text(-background.width + (background.width * 0.75), 0 + 14, `${getPhrase(sceneUI.player)} 1`, {
      fontFamily: "AnyMale",
      fontSize: "16px",
      color: "#fff",
    }).setOrigin(0.5);

    const textoJugador2 = this.add.text(background.width - (background.width * 0.75), 0 + 14, `${getPhrase(sceneUI.player)} 2`, {
      fontFamily: "AnyMale",
      fontSize: "16px",
      color: "#fff",
    }).setOrigin(0.5);

    const btnWAD = this.add.image(-background.width + (background.width * 0.75), -35, "botonWAD").setOrigin(0.5).setScale(0.8);
    const btnFlechas = this.add.image(background.width - (background.width * 0.75), -35, "botonesFlechas").setOrigin(0.5).setScale(0.8);

    this.textoIzquierda = this.add.text(-background.width + (background.width * 0.75), background.height / 2 - 10, `${this.jugadorIzquierdo.monedas || 0}`, {
      fontFamily: "AlarmClock",
      fontSize: "30px",
      color: "#c81000",
      strokeThickness: 2,
      stroke: "#c81000",
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#c81000",
        blur: 16,
        stroke: true,
        fill: true,
      },
    }).setOrigin(0.5);

    this.textoDerecha = this.add.text(background.width - (background.width * 0.75), background.height / 2 - 10, `${this.jugadorDerecho.monedas || 0}`, {
      fontFamily: "AlarmClock",
      fontSize: "30px",
      color: "#7000b6",
      strokeThickness: 2,
      stroke: "#7000b6",
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#7000b6",
        blur: 16,
        stroke: true,
        fill: true,
      },
    }).setOrigin(0.5);

    contenedor.add([background, btnWAD, textoJugador1, btnFlechas, textoJugador2, this.textoIzquierda, this.textoDerecha]);


  }


  actualizarTiempo() {
    this.contadorTiempo -= 1;
    this.temporizadorTexto.setText(`${this.contadorTiempo}`);
    if (this.contadorTiempo < 10 && !this.ultimosSegundos) {
      this.sound.play("voz-contador");
      this.ultimosSegundos = true;
    } 

    if (this.contadorTiempo <= 0 && !this.gameOver) {
      this.sound.stopAll()
      this.scene.manager.getScenes(true).forEach(escena => {
        escena.scene.stop();
      });

      let ganador = {};
      let perdedor = {};
      if (this.jugadorIzquierdo.monedas > this.jugadorDerecho.monedas) {
        this.jugadorIzquierdo.numeroRondasGanadas += 1;
        ganador = this.jugadorIzquierdo;
        perdedor = this.jugadorDerecho;
      } else {
        this.jugadorDerecho.numeroRondasGanadas += 1;
        ganador = this.jugadorDerecho;
        perdedor = this.jugadorIzquierdo;
      }

      this.scene.start("PantallaFinRonda", {
        ganador,
        perdedor
      }
      );
      this.gameOver = true;
    }
  }
}

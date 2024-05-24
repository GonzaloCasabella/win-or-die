import Phaser from "phaser";
import events from "./EventCenter";

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

  constructor() {
    super("ui");
  }

  init(data) {
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
  }

  create() {
    this.colliderCount = 0;
    // add text with count collider and date
    this.text = this.add.text(10, 10, `Collider count: ${this.colliderCount}`, {
      font: "16px Courier",
      fill: "#00ff00",
    });



    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarTiempo,
      callbackScope: this,
      loop: true,
    });

    // add listener to the event
    events.on("collider-event", this.colliderEvent, this);


    const uiArriba = this.add.image(this.scale.width / 2, 0, "temporizador-ui").setOrigin(0.5, 0);
    uiArriba.setScale(0.75)
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
  }

  colliderEvent(data) {

    // update text
    this.colliderCount += 1;
    this.text.setText(
      `Collider count: ${this.colliderCount} / Last: ${data.fecha}`
    );
  }


  actualizarTiempo() {
    this.contadorTiempo -= 1;
    this.temporizadorTexto.setText(`${this.contadorTiempo}`);

    if (this.contadorTiempo <= 0) {
      this.scene.start("PantallaGameOver");
    }
  }
}

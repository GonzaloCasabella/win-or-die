import Phaser from "phaser";
import UI from "./scenes/UI";
import PantallaCarga from "./scenes/PantallaCarga";
import PantallaMenuPrincipal from "./scenes/PantallaMenuPrincipal";
import PantallaMenu from "./scenes/PatantallaMenu";
import PantallaControles from "./scenes/PantallaControles";
import Nivel1 from "./scenes/niveles/Nivel1";

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 1280,
      height: 720,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  scene: [PantallaCarga, PantallaMenuPrincipal, PantallaMenu, PantallaControles, Nivel1, UI],
};

export default new Phaser.Game(config);

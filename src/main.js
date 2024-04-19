import Phaser from "phaser";
import UI from "./scenes/UI";
import PantallaCarga from "./scenes/PantallaCarga";
import PantallaMenuPrincipal from "./scenes/PantallaMenuPrincipal";
import PantallaMenu from "./scenes/PatantallaMenu";
import PantallaControles from "./scenes/PantallaControles";

const config = {
  type: Phaser.AUTO,
  width: 1080,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 1080,
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
      debug: false,
    },
  },
  scene: [PantallaCarga, PantallaMenuPrincipal, PantallaMenu, PantallaControles, UI],
};

export default new Phaser.Game(config);

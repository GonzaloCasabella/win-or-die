import Phaser from "phaser";
import UI from "./scenes/UI";
import PantallaCarga from "./scenes/PantallaCarga";
import PantallaMenuPrincipal from "./scenes/PantallaMenuPrincipal";
import PantallaMenu from "./scenes/PatantallaMenu";
import PantallaControles from "./scenes/PantallaControles";
import Nivel1 from "./scenes/niveles/Nivel1";
import PatallaGameOver from "./scenes/PantallaGameOver";
import PantallaFinRonda from "./scenes/PantallaFinRonda";

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 768,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 260,
      height: 280,
    },
    max: {
      width: 1280,
      height: 768,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  scene: [PantallaCarga, PantallaMenuPrincipal, PantallaMenu, PantallaControles, Nivel1, UI, PatallaGameOver, PantallaFinRonda],
};

export default new Phaser.Game(config);

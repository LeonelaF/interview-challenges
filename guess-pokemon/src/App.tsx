import { useState } from "react";
import useSound from "use-sound";
import pokemonIntro from "../assets/sounds/pokemon-intro.mp3";
import quienSfx from "../assets/sounds/quien-es-ese-pokemon.mp3";

import Discover from "./pages/discover";

function App() {
  const [showDiscover, setShowDiscover] = useState(false);
  const [play] = useSound(quienSfx);
  const [playIntro, { stop: stopIntro }] = useSound(pokemonIntro);

  const handleClick = () => {
    setShowDiscover(true);
    stopIntro();
    play();
  };
  if (!showDiscover) {
    return (
      <main>
        <button
          type="button"
          className="nes-btn is-success"
          onClick={() => playIntro()}
        >
          Activar Sonido
        </button>
        <button
          className="nes-btn is-primary"
          type="button"
          onClick={handleClick}
        >
          Start Game
        </button>
      </main>
    );
  }

  return (
    <main>
      <Discover />
    </main>
  );
}

export default App;

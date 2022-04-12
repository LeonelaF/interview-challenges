import { FC, useEffect, useState } from "react";
import api from "../api";
import PokemonForm from "../componentes/pokemon-form";
import { Pokemon } from "../types";
import quienSfx from "../../assets/sounds/quien-es-ese-pokemon.mp3";
import useSound from "use-sound";

interface SoundProps{
  sound: () => void; 
  ref: any;
}

const Discover: FC<SoundProps> = ({ sound, ref }) => {
  console.log("Discover ref",ref.current);
  const [play, { stop }] = useSound(quienSfx);

  const getPoke = async () => {
    setPokemon(await api.random());
  };
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [showed, setIsShowed] = useState<boolean>(false);

  useEffect(() => {
    getPoke();
  }, []);

  const onSubmit = () => {
    setIsShowed(true);
  };

  const handleReplayButton = () => {
    sound();
    stop();
    setPokemon(undefined);
    setIsShowed(false);
    getPoke();
    play();
  };

  if (!pokemon)
    return (
      <progress className="nes-progress is-pattern" max="100" value="50" />
    );

  return (
    <main>
      <h1>¿Quién es este Pokemon?</h1>
      <img
        alt="pokemon"
        className={!showed ? "hidden" : "showed"}
        src={pokemon.image}
      />

      <PokemonForm onSubmit={onSubmit} ref={ref} />
      {showed && (
        <>
          <p>{pokemon.name}</p>
          <button onClick={handleReplayButton}> replay </button>
        </>
      )}
    </main>
  );
};

export default Discover;

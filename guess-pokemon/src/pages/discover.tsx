import { FC, forwardRef, useEffect, useRef, useState } from "react";
import api from "../api";
import PokemonForm from "../componentes/pokemon-form";
import { Pokemon } from "../types";
import quienSfx from "../../assets/sounds/quien-es-ese-pokemon.mp3";
import useSound from "use-sound";

interface SoundProps {
  sound: () => void;
  ref: { current: string };
}

const Discover: FC<any> = ({ sound }) => {
  const [play, { stop }] = useSound(quienSfx);

  const getPoke = async () => {
    setPokemon(await api.random());
  };

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [showed, setIsShowed] = useState<any>({
    view: false,
    isCorrect: undefined,
  });
  const [counter, setCounter] = useState<number>(0);
  const isSamePokemon = (inputValue: string) => pokemon?.name == inputValue;

  useEffect(() => {
    getPoke();
  }, []);

  const onSubmit = (inputValue: string) => {
    if (isSamePokemon(inputValue)) {
      setCounter(counter + 1);
    }

    setIsShowed({...showed, });
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

      <PokemonForm
        onSubmit={onSubmit}
        showed={showed}
        replay={handleReplayButton}
      />
      {showed && (
        <>
          <p>{pokemon.name}</p>
        </>
      )}
      {isCorrect ? "CORRECTO" : "LE ERRASTE"}
    </main>
  );
};

export default Discover;

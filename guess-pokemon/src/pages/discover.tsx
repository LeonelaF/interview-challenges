import { FC, useCallback, useEffect, useMemo, useState } from "react";
import api from "../api";
import PokemonForm from "../componentes/pokemon-form";
import { Pokemon } from "../types";
import quienSfx from "../../assets/sounds/quien-es-ese-pokemon.mp3";
import useSound from "use-sound";

interface SoundProps {
  sound: () => void;
}
const getCounter = () =>
  sessionStorage.getItem("counter")
    ? Number(sessionStorage.getItem("counter"))
    : 0;

const Discover: FC<SoundProps> = ({ sound }) => {
  const [play, { stop }] = useSound(quienSfx);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isShowed, setShowed] = useState<any>(undefined);

  const getPoke = async () => {
    setPokemon(undefined);
    setPokemon(await api.random());
  };

  const isSamePokemon = useCallback(
    (inputValue: string) => pokemon?.name == inputValue,
    [pokemon]
  );

  const counter = useMemo(getCounter, [isShowed]);

  useEffect(() => {
    getPoke();
  }, []);

  const onSubmit = (inputValue: string) => {
    setShowed(isSamePokemon(inputValue));
    if (isSamePokemon(inputValue)) {
      sessionStorage.setItem("counter", (counter + 1).toString());
    }
  };

  const handleReplayButton = () => {
    sound();
    stop();
    setShowed(undefined);
    getPoke();
    play();
  };

  if (!pokemon)
    return (
      <progress className="nes-progress is-pattern" max="100" value="50" />
    );

  return (
    <main>
      <h6>Puntos:{counter}</h6>
      <h1>¿Quién es este Pokemon?</h1>
      <img
        alt="pokemon"
        className={isShowed !=undefined || isShowed ? "showed" : "hidden"}
        src={pokemon.image}
      />

      <PokemonForm
        onSubmit={onSubmit}
        showed={isShowed!=undefined || isShowed}
        replay={handleReplayButton}
      />
      {isShowed != undefined && (
        <>
          <p>{pokemon.name}</p>
          {isShowed ? (
            <section className="message -right">
              <div className="nes-balloon from-right">
                <span className="correcto">Correcto</span>
              </div>
              <i className="nes-charmander"></i>
            </section>
          ) : (
            <section className="message -right">
              <div className="nes-balloon from-right">
                <p className="incorrecto">Incorrecto</p>
              </div>
              <i className="nes-squirtle"></i>
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default Discover;

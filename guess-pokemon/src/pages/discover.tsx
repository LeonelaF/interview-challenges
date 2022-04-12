import { FC, useEffect, useState } from "react";
import api from "../api";
import PokemonForm from "../componentes/pokemon-form";
import { Pokemon } from "../types";

const Discover: FC = () => {
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
    setPokemon(undefined);
    setIsShowed(false);
    getPoke();
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

      <PokemonForm onSubmit={onSubmit} />
      {showed && (
        <>
          <p>{pokemon.name}</p>
          <button onClick={handleReplayButton}> replay</button>
        </>
      )}
    </main>
  );
};

export default Discover;

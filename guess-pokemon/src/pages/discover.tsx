import { FC, useEffect, useState } from "react";
import api from "../api";
import PokemonForm from "../componentes/pokemon-form";
import { Pokemon } from "../types";

const Discover: FC = () => {
  const getPoke = async () => {
    setPokemon(await api.random());
  };
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    getPoke();
  }, []);

  const onSubmit = () => {
    return false;
  };

  if (!pokemon) return <progress className="nes-progress is-pattern" max="100" value="50" />;

  return (
    <main>
      <h1>¿Quién es este Pokemon?</h1>
      <img alt="pokemon" src={pokemon.image} />
      <PokemonForm onSubmit={onSubmit} />
    </main>
  );
};

export default Discover;

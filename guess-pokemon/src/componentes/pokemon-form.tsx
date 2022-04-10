import { FC, useRef } from "react";
import useSound from "use-sound";
import pokemonSfx from "../../assets/sounds/quien-es-ese-pokemon.mp3";

interface PokemonFormProps {
  onSubmit: (pokemonName: string) => void;
}

const PokemonForm: FC<PokemonFormProps> = ({ onSubmit }) => {
  const refInput: any = useRef();
  const [play] = useSound(pokemonSfx);

  return (
    <form
      className="nes-field is-inline"
      onSubmit={(e: any) => {
        e.preventDefault();
        onSubmit(refInput.current.value);
      }}
    >
      <input className="nes-input" id="name_field" ref={refInput} type="text" />
      <button className="nes-btn is-primary" type="submit" onClick={() => play()}>
        ADIVINAR
      </button>
    </form>
  );
};

export default PokemonForm;

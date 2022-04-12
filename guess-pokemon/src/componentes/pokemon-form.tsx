import { FC, useRef } from "react";

interface PokemonFormProps {
  onSubmit: (pokemonName: string) => void;
  ref: any;
}

const PokemonForm: FC<PokemonFormProps> = ({ onSubmit, ref }) => {
  console.log("form ref", ref.current);
  
  const handleOnSubmit = () => {
    onSubmit(ref.current.value);
    ref.current.value = "";
  };

  return (
    <form
      className="nes-field is-inline"
      onSubmit={(e: any) => {
        e.preventDefault();
        handleOnSubmit();
      }}
    >
      <input className="nes-input" id="name_field" ref={ref} type="text" />
      <button
        className="nes-btn is-primary"
        type="submit"
      >
        ADIVINAR
      </button>
    </form>
  );
};

export default PokemonForm;

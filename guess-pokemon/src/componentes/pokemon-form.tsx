import { FC, useRef } from "react";

interface refProps {
  current: string;
}
interface PokemonFormProps {
  onSubmit: (pokemonName: string) => void;
  ref: refProps;
}

const PokemonForm: FC<any> = ({ onSubmit, showed, replay }) => {
  const inputRef = useRef<any>();

  const handleOnSubmit = () => {
    onSubmit(inputRef.current.value);
    console.log(inputRef.current.value);
  };

  return (
    <form
      className="nes-field is-inline"
      onSubmit={(e: any) => {
        if (!showed) {
          e.preventDefault();
          handleOnSubmit();
        } else {
          replay();
        }
      }}
    >
      <input className="nes-input" id="name_field" ref={inputRef} type="text" />
      <button className="nes-btn is-primary" type="submit">
        {showed ? "REPLAY" : "ADIVINAR"}
      </button>
    </form>
  );
};

export default PokemonForm;

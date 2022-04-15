import { FC, forwardRef } from "react";

interface refProps {
  current: string;
}
interface PokemonFormProps {
  onSubmit: (pokemonName: string) => void;
  ref: refProps;
}

const PokemonForm: FC<any> = forwardRef(({ onSubmit }, ref) => {
  console.log("form ref", ref);

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
      <input
        className="nes-input"
        id="name_field"
        onChange={(e) => (ref.current = e.target.value)}
        type="text"
      />
      <button className="nes-btn is-primary" type="submit">
        ADIVINAR
      </button>
    </form>
  );
});

export default PokemonForm;

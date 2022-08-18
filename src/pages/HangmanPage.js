import React, { useState } from "react";
import HangmanMatch from "../components/HangmanMatch";
import "./HangmanPage.css";

const HangmanPage = () => {
  const [ready, setReady] = useState(false);
  const [word, setWord] = useState("");
  const [lives, setLives] = useState("");
  const [hint, setHint] = useState("");
  const [errors, setErrors] = useState({ word: "", hint: "", lives: "" });

  const checkErrors = (word, hint, lives) => {
    let foundErrors = false;

    if (word.length < 2) {
      setErrors({ ...errors, word: "La palabra necesita al menos 2 letras" });
      foundErrors = true;
    }

    if (word.length > 1 && /[^A-zÁ-ù]/.test(word)) {
      setErrors({ ...errors, word: "Usa solo letras para la palabra" });
      foundErrors = true;
    }

    return foundErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { word, lives, hint } = e.target;

    if (!checkErrors(word.value.toUpperCase(), lives.value, hint.value)) {
      setWord(word.value.toUpperCase());
      setLives(lives.value);
      setHint(hint.value);
      setReady(true);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full items-center m-auto">
      <h1 className="text-xl font-bold">EL AHORCADO</h1>
      <h2>Configura la partida:</h2>
      {!ready && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-centet gap-4 w-300 items-center"
        >
          <div>
            {errors.word && <p>{errors.word}</p>}
            <input
              type="password"
              name="word"
              placeholder="Word"
              className="text-center rounded border-b-2 border-blue-300 focus:outline-0"
            />
          </div>
          <div>
            <input
              type="text"
              name="hint"
              placeholder="Hint"
              className="text-center rounded border-b-2 border-blue-300 focus:outline-0"
            />
          </div>
          <div>
            <input
              type="number"
              name="lives"
              placeholder="Lives"
              className="text-center rounded border-b-2 border-blue-300 focus:outline-0"
            />
          </div>
          <input
            type="submit"
            value="Start Match"
            className="text-white bg-blue-500 rounded-lg py-2 px-2 cursor-pointer hover:bg-blue-600 font-bold w-40"
          />
          <p className="w-80 text-sm italic text-gray-500">
            Nota: Si introduces vocales con tilde, el juego requerirá la vocal
            con tilde para marcar un intento como correcto. Puedes omitir el
            tilde si quieres evitar esto.
          </p>
        </form>
      )}
      {ready && (
        <HangmanMatch
          word={word}
          lives={lives}
          hint={hint}
          setReady={setReady}
        />
      )}
    </div>
  );
};

export default HangmanPage;

import React, { useState } from "react";
import HangmanMatch from "../components/HangmanMatch";
import "./HangmanPage.css";

const HangmanPage = () => {
  const [ready, setReady] = useState(false);
  const [word, setWord] = useState("");
  const [lives, setLives] = useState("");
  const [hint, setHint] = useState("");
  const [errors, setErrors] = useState({ word: "", hint: "", lives: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { word, lives, hint } = e.target;
    setWord(word.value.toUpperCase());
    setLives(lives.value);
    setHint(hint.value);
    setReady(true);
  };

  return (
    <div class="flex flex-col gap-3 w-full items-center m-auto">
      <h1 className="text-xl font-bold">EL AHORCADO</h1>
      <h2>Configura la partida:</h2>
      {!ready && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-centet gap-4 w-300 items-center"
        >
          <input
            type="password"
            name="word"
            placeholder="Word"
            className="text-center rounded border-b-2 border-blue-300 focus:outline-0"
          />
          <input
            type="text"
            name="hint"
            placeholder="Hint"
            className="text-center rounded border-b-2 border-blue-300 focus:outline-0"
          />
          <input
            type="number"
            name="lives"
            placeholder="Lives"
            className="text-center rounded border-b-2 border-blue-300 focus:outline-0"
          />
          <input
            type="submit"
            value="Start Match"
            className="text-white bg-blue-500 rounded-lg py-2 px-2 cursor-pointer hover:bg-blue-600 font-bold w-40"
          />
          <p class="w-80 text-sm italic text-gray-500">
            Nota: Si introduces vocales con tilde, el juego requerirá la vocal
            con tilde para marcar un intento como correcto. Puedes omitir el
            tilde si quieres evitar esto.
          </p>
        </form>
      )}
      {ready && (
        <HangmanMatch
          word={word}
          limit={lives}
          hint={hint}
          setReady={setReady}
        />
      )}
    </div>
  );
};

export default HangmanPage;

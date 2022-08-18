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
    let newErrors = { word: "", hint: "", lives: "" };
    setErrors(newErrors);

    if (word.length < 2 || word.length > 23) {
      newErrors.word = "La palabra  debe tener entre 2 y 23 letras";
      setErrors(newErrors);
      foundErrors = true;
    }

    if (word.length > 1 && /[^A-zÁ-ù]/.test(word)) {
      newErrors.word =
        "Usa solo letras para la palabra (Sin símbolos o espacios)";
      setErrors(newErrors);
      foundErrors = true;
    }

    if (hint.length < 1 || hint.length > 30) {
      newErrors.hint = "La pista debe tener entre 1 y 30 letras";
      setErrors(newErrors);
      foundErrors = true;
    }

    return foundErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { word, lives, hint } = e.target;

    if (!checkErrors(word.value.toUpperCase(), hint.value, lives.value)) {
      setWord(word.value.toUpperCase());
      setLives(lives.value);
      setHint(hint.value);
      setReady(true);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full items-center m-auto">
      <h1 className="text-xl font-bold">EL AHORCADO</h1>
      {!ready && <h2>Configura la partida:</h2>}
      {!ready && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-centet gap-4 w-300 items-center"
        >
          <div className="flex flex-col gap-2 items-center">
            {errors.word && (
              <p className="italic text-sm text-red-500">{errors.word}</p>
            )}
            <input
              type="password"
              name="word"
              placeholder="Palabra"
              className="text-center rounded border-b-2 border-blue-300 focus:outline-0 w-44"
            />
          </div>
          <div className="flex flex-col gap-2 items-center">
            {errors.hint && (
              <p className="italic text-sm text-red-500">{errors.hint}</p>
            )}
            <input
              type="text"
              name="hint"
              placeholder="Pista"
              className="text-center rounded border-b-2 border-blue-300 focus:outline-0 w-44"
            />
          </div>
          <div>
            <label className="flex justify-center items-center gap-5">
              <p>Vidas:</p>
              <select
                name="lives"
                className="px-3 py-1 border-2 border-blue-300 cursor-pointer focus:outline-0"
              >
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
            </label>
          </div>
          <input
            type="submit"
            value="Empezar"
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

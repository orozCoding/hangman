import React, { useState } from "react";
import HangmanMatch from "../components/HangmanMatch";
import "./HangmanPage.css";

const HangmanPage = () => {
  const [ready, setReady] = useState(false);
  const [word, setWord] = useState("");
  const [limit, setLimit] = useState("");
  const [hint, setHint] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { word, limit, hint } = e.target;
    setWord(word.value.toUpperCase());
    setLimit(limit.value);
    setHint(hint.value);
    setReady(true);
  };

  return (
    <div class="flex flex-col gap-3 w-full items-center">
      Configura la partida:
      {!ready && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-centet gap-4 w-300"
        >
          <label>
            <input
              type="password"
              name="word"
              placeholder="Word"
              className="text-center rounded border-b-2 border-blue-300 focus:outline-0"
            />
          </label>
          <label>
            <input
              type="number"
              name="limit"
              placeholder="Lives"
              className="text-center rounded border-b-2 border-blue-300 focus:outline-0"
            />
          </label>
          <label>
            <input
              type="text"
              name="hint"
              placeholder="Hint"
              className="text-center rounded border-b-2 border-blue-300 focus:outline-0"
            />
          </label>
          <input
            type="submit"
            value="Start Match"
            className="text-white bg-blue-500 rounded-lg py-2 px-2 cursor-pointer hover:bg-blue-600 font-bold"
          />
        </form>
      )}
      {ready && (
        <HangmanMatch
          word={word}
          limit={limit}
          hint={hint}
          setReady={setReady}
        />
      )}
    </div>
  );
};

export default HangmanPage;

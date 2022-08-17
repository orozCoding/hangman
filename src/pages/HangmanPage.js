import React, { useState } from "react";
import HangmanMatch from "../components/HangmanMatch";

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
    <div>
      Hello from hangPagedd
      {!ready && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Word:
              <input type="text" name="word" />
            </label>
            <label>
              Lives:
              <input type="number" name="limit" />
            </label>
            <label>
              Hint:
              <input type="text" name="hint" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
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

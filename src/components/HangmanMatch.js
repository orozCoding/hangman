import React, { useEffect, useState } from "react";

const HangmanMatch = (props) => {
  const { word, lives, hint, setReady } = props;
  const [tries, setTries] = useState(0);
  const [board, setBoard] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [hp, setHp] = useState(lives);
  const [used, setUsed] = useState([]);
  const [error, setError] = useState(
    <p className="text-black font-bold">Go for it!</p>
  );

  const createBoard = (word) => {
    let newBoard = [];
    for (let i = 0; i < word.length; i++) {
      newBoard.push("_");
    }
    setBoard(newBoard);
    return newBoard;
  };

  useEffect(() => {
    createBoard(word);
  }, [word]);

  useEffect(() => {
    setHp(lives - tries);
  }, [tries, lives]);

  useEffect(() => {
    if (board.indexOf("_") !== -1) {
      return setCompleted(false);
    }
    return setCompleted(true);
  }, [board]);

  const checkLetter = (char) => {
    if (word.split("").indexOf(char) > -1) {
      return true;
    }
    return false;
  };

  const setCorrect = (char) => {
    let newBoard = [...board];
    word.split("").forEach((letter, i) => {
      if (char === letter) {
        newBoard[i] = char;
      }
    });
    setBoard(newBoard);
  };

  const checkError = (letter) => {
    if (letter === "" || !/[A-zÁ-ú]/.test(letter)) {
      setError("Submit a letter");
      return true;
    } else if (board.indexOf(letter) !== -1 || used.indexOf(letter) !== -1) {
      setError("You already used this letter");
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const letter = e.target.letter.value.toUpperCase();
    e.target.letter.value = "";

    setError("");

    if (checkError(letter)) {
      return null;
    }

    if (checkLetter(letter)) {
      setCorrect(letter);
      setError(<p className="text-green-600 font-bold">Correct!</p>);
    } else {
      setTries(tries + 1);
      setUsed([...used, letter]);
      setError("Wrong!");
    }
  };

  const renderForm = () => {
    return (
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <p>Escribe una letra:</p>
        <input
          type="text"
          id="hm-match-letter"
          name="letter"
          placeholder="?"
          maxLength={1}
          className="text-center rounded border-b-2 border-blue-300 focus:outline-0 w-20"
        />
        <input
          type="submit"
          value="Probar"
          className="text-white bg-blue-500 rounded-lg py-2 px-3 cursor-pointer hover:bg-blue-600 font-bold"
        />
      </form>
    );
  };

  const restartGame = () => {
    setReady(false);
  };

  const renderHearts = () => {
    let hearts = [];
    for (let i = hp; i > 0; i--) {
      hearts.push(<span key={i}>❤️</span>);
    }
    return hearts.map((h) => h);
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        {hp > 0 && (
          <div className="flex flex-col gap-6">
            {!completed && (
              <div className="flex flex-col gap-5">
                <p>Adivina la palabra:</p>
                <p className="text-3xl">{board && board.join(" ")}</p>
                {error && <p className="text-red-600 font-bold">{error}</p>}
                <div className="flex justify-center items-center gap-1">
                  <p>Vidas: </p> <ul>{renderHearts()}</ul>
                </div>
                <p>
                  Pista: <strong>{hint}</strong>
                </p>
                {renderForm()}
                {used.length > 0 && (
                  <div>
                    <p>Letras usadas:</p>
                    <p className="text-red-600 font-bold">{used.join(", ")}</p>
                  </div>
                )}
              </div>
            )}
            {completed && (
              <div>
                <p>¡Felicidades!</p>
                {tries > 0 ? (
                  <p>
                    Completaste la palabra con{" "}
                    <strong>{`${tries} fallos`}</strong>
                  </p>
                ) : (
                  <p>
                    ¡Completaste la palabra <strong>sin fallos!</strong>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        {hp <= 0 && (
          <div>
            <p>¡Perdiste!</p>
            <p>
              La palabra era <strong>{word}</strong>
            </p>
          </div>
        )}
        <button
          onClick={restartGame}
          className="text-white bg-yellow-800 rounded-lg py-2 px-2 cursor-pointer hover:bg-yellow-900 font-bold"
        >
          Nuevo juego
        </button>
      </div>
    </div>
  );
}

export default HangmanMatch;
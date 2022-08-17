import React, { useEffect, useState } from "react";

const HangmanMatch = (props) => {
  const { word, lives, hint, setReady } = props;
  const [tries, setTries] = useState(0);
  const [board, setBoard] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [hp, setHp] = useState(lives);
  const [used, setUsed] = useState([]);
  const [error, setError] = useState("Go for it!");

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
      setError("Correct!");
    } else {
      setTries(tries + 1);
      setUsed([...used, letter]);
      setError("Wrong!");
    }
  };

  const renderForm = () => {
    return (
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input type="text" id="hm-match-letter" name="letter" />
        <br />
        <input type="submit" />
      </form>
    );
  };

  const restartGame = () => {
    setReady(false);
  };

  return (
    <div>
      <div>
        {hp > 0 && (
          <div>
            <p>Adivina la palabra:</p>
            <p style={{ fontSize: "30px" }}>{board && board.join(" ")}</p>
            <p>
              Pista: <strong>{hint}</strong>
            </p>
            <div>
              {!completed && (
                <div>
                  <p>Escribe una letra:</p>
                  {renderForm()}
                  {error && <p>{error}</p>}
                  <div>Lives: {hp}</div>
                  {used.length > 0 && (
                    <div>
                      <p>Wrong letters:</p>
                      <p>{used.join(",")}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {completed && (
              <div>
                <p>Congratulations!</p>
                {tries > 0 ? (
                  <p>
                    You completed the word with{" "}
                    <strong>{`${tries} strikes`}</strong>
                  </p>
                ) : (
                  <p>
                    You completed the word with <strong>no strikes!</strong>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        {hp <= 0 && (
          <div>
            <p>You lost</p>
            <p>
              The word was <strong>{word}</strong>
            </p>
          </div>
        )}
        <button
          onClick={restartGame}
          className="text-white bg-blue-500 rounded-lg py-2 px-2 cursor-pointer hover:bg-blue-600 font-bold"
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default HangmanMatch;
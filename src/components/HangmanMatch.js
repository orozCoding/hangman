import React, { useEffect, useState } from "react";

const HangmanMatch = (props) => {
  const [tries, setTries] = useState(0);
  const [board, setBoard] = useState([]);
  const { word } = props;



  const createBoard = (word) => {
    let newBoard = [];
    for (let i = 0; i < word.length; i++) {
      newBoard.push('_')
    }
    setBoard(newBoard)
    return newBoard;
  }

  useEffect(() => {
    createBoard(word)
  }, [word])

  const checkLetter = (char) => {
    if (word.split('').indexOf(char) > -1) {
      return true;
    }
    return false;
  }

  const setCorrect = (char) => {
    let newBoard = [...board]
    word.split('').forEach((letter, i) => {
      if (char === letter) {
        newBoard[i] = char
      }
    })
    setBoard(newBoard)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const letter = e.target.letter.value;

    if (checkLetter(letter)) {
      setCorrect(letter)
    } else {
      setTries(tries + 1)
    }
  }

  const renderResults = () => {
    console.log(board.indexOf('_'));
    if (board.indexOf('_') > -1) {
      return <p>Keep playing!</p>
    }
    return <p>Congratulations!</p>
  }

  return (
    <div>
      Hello from hangman match
      <div>
        <p>Word is {word}</p>
        <p>Play with {board && board.join(' ')}</p>
        <p>Type a letter</p>
        <form
          onSubmit={handleSubmit}>
          <input type="text" id="hm-match-letter" name="letter"></input>
          <input type="submit"></input>
        </form>
        <div>Tries: {tries}</div>
        <div>{board && renderResults()}</div>
      </div>
    </div>
  )
}

export default HangmanMatch;
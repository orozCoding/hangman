import React, { useEffect, useState } from "react";

const HangmanMatch = (props) => {
  const { word, limit } = props;
  const [tries, setTries] = useState(0);
  const [board, setBoard] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [hp, setHp] = useState(limit);
  const [used, setUsed] = useState([]);

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

  useEffect(() => {
    setHp(limit - tries)
  }, [tries, limit])

  useEffect(() => {
    if (board.indexOf('_') !== -1) {
      return setCompleted(false)
    }
    return setCompleted(true)
  }, [board])

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
    e.target.letter.value = '';

    if (letter === '' || used.indexOf(letter) !== -1) {
      return null
    }

    if (checkLetter(letter)) {
      setCorrect(letter)
    } else {
      setTries(tries + 1)
      setUsed([...used, letter])
    }
  }

  const isCompleted = () => {
    return board.infexOf('_') === -1
  }

  const renderResults = () => {
    console.log(board.indexOf('_'));
    if (board.indexOf('_') > -1) {
      return <p>Keep playing!</p>
    }
    return <p>Congratulations!</p>
  }

  const renderForm = () => {
    return (
      <form
      autoComplete='off'
        onSubmit={handleSubmit}>
        <input type="text" id="hm-match-letter" name="letter"></input>
        <input type="submit"></input>
      </form>
    )
  }

  return (
    <div>
      Hello from hangman match
      <div>
        <p>Word is {word}</p>
        {hp > 0 &&
          <div>
            <p>Guess the word {board && board.join(' ')}</p>
            <div>{!completed && <div>
              <p>Type a letter</p>
              {renderForm()}
              <div>Lives: {hp}</div>
              {used.length > 0 && <div>
                <p>Wrong letters:</p>
                <p>{used.join(',')}</p>
              </div>}
            </div>}</div>

            {completed &&
              <div>
                <p>
                  Congratulations!
                </p>
                {tries > 0 ? <p>
                  You completed the word with <strong>{`${tries} strikes`}</strong>
                </p>
                  : <p>You completed the word with <strong>no strikes!</strong></p>}
              </div>}
          </div>}
        {hp <= 0 &&
          <div>
            <p>You lost</p>
            <p>The word was <strong>{word}</strong></p>
          </div>}
      </div>
    </div>
  )
}

export default HangmanMatch;
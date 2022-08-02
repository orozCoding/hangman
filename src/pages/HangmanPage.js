import React from "react";
import HangmanMatch from "../components/HangmanMatch";

const HangmanPage = () => {
  return (
    <div>
      Hello from hangPage
      <HangmanMatch word={'mamita'} limit={5}/>
    </div>
  )
}

export default HangmanPage;
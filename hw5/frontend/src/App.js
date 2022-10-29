import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { guess, startGame, restart } from "./axios";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [range, setRange] = useState("");
  const [computerHasWon, setComputerHasWon] = useState(false);

  const handleGuess = async () => {
    const response = await guess(number);
    if (response === "503 Service Unavailable") {
      setStatus("");
      setRange("");
      setError(true);
    } else {
      if (response.msg === "Equal") setHasWon(true);
      else {
        setStatus(response.msg);
        setRange(response.range);
        setError(false);
        setNumber("");
        if (response.msg.includes("Computer WON") ) setComputerHasWon(true);
      }
    }
  };

  const handleStart = async () => {
    const msg = await startGame();
    if (msg === "The game has started.") {
      setHasStarted(true);
      setError(false);
    } else if (msg === "503 Service Unavailable") {
      setError(true);
    }
  };

  const handleRestart = async () => {
    const msg = await restart();
    if (msg === "The game has restarted.") {
      setHasWon(false)
      setComputerHasWon(false)
      setError(false);
      setNumber("");
      setStatus("")
      setRange("")
    } else if (msg === "503 Service Unavailable") {
      setError(true);
    }
  };

  const startMenu = (
    <div>
      <button
        onClick={
          handleStart
          // someFunctionToBackend; and setHasStarted
        }
      >
        {" "}
        start game{" "}
      </button>
      {error ? (
        <div>
          <p>503 Service Unavailable</p>
          <p>Please try again later.</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );

  const gameMode = (
    <>
      <p className="title">Guess a number between 1 to 100</p>
      <input
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        value = {number}
      ></input>
      <button // Send number to backend
        onClick={handleGuess}
        disabled={computerHasWon || !number || error}
        className="button"
      >
        guess!
      </button>
      <p>{status}</p>
      <p>{range}</p>
      {error ? (
        <div>
          <p>503 Service Unavailable</p>
          <p>Please try again later.</p>
        </div>
      ) : (
        ""
      )}
      {computerHasWon || error ? (
        <button
        onClick={handleRestart}
      >
        restart
      </button>
      ) : (
        ""
      )}
    </>
  );

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={handleRestart}
      >
        restart
      </button>
      {error ? (
        <div>
          <p>503 Service Unavailable</p>
          <p>Please try again later.</p>
        </div>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div className="App-header">
      {hasStarted ? (hasWon ? winningMode : gameMode) : startMenu}
    </div>
  );
}

export default App;

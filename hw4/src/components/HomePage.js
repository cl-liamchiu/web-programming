/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/HomePage.css";
import React, { useState } from "react";

const HomePage = ({
  startGameOnClick,
  mineNumOnChange,
  boardSizeOnChange,
  mineNum,
  boardSize /* -- something more... -- */,
}) => {
  const [showPanel, setShowPanel] = useState(false); // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false); // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {
    /* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */
  }

  return (
    <div className="HomeWrapper">
      <p className="title">MineSweeper</p>

      {/* Basic TODO:  Implemen start button */}

      {mineNum > boardSize ** 2 ? (
        <button className="btn">Start Game</button>
      ) : (
        <button className="btn" onClick={startGameOnClick}>
          Start Game
        </button>
      )}

      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className="controlContainer">
        <button className="btn" onClick={() => setShowPanel(!showPanel)}>
          Difficulty Adjustment
        </button>
        {showPanel ? (
          <div className="controlWrapper">
            <div
              className="error"
              style={
                mineNum >= boardSize ** 2
                  ? { color: "#880000" }
                  : { color: "lightblue" }
              }
            >
              ERROR: Mines number and board size are invalid
            </div>

            <div className="controlPanel">
              <div className="controlCol">
                <p className="controlTitle">Mines Number</p>
                <input
                  type="range"
                  step="1"
                  min="0"
                  max="50"
                  defaultValue={mineNum}
                  onChange={(e) => mineNumOnChange(e.target.value)}
                />
                <p
                  className="controlNum"
                  style={
                    mineNum >= boardSize ** 2
                      ? { color: "#880000", fontWeight: "bold" }
                      : {}
                  }
                >{`${mineNum}`}</p>
              </div>
              <div className="controlCol">
                <p className="controlTitle">Board Size (n x n)</p>
                <input
                  type="range"
                  step="1"
                  min="2"
                  max="15"
                  defaultValue={boardSize}
                  onChange={(e) => boardSizeOnChange(e.target.value)}
                />
                <p
                  className="controlNum"
                  style={
                    mineNum >= boardSize ** 2
                      ? { color: "#880000", fontWeight: "bold" }
                      : {}
                  }
                >{`${boardSize}`}</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default HomePage;

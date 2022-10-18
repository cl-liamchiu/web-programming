/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import "./css/Board.css";
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
  const notGuess = [
    { char: "", color: "" },
    { char: "", color: "" },
    { char: "", color: "" },
    { char: "", color: "" },
    { char: "", color: "" },]
  
  return (
    <div className="Board-container">
      {[0, 1, 2, 3, 4, 5].map((row) => {
        if (row === turn && typeof curGuess !== "undefine") {
            // console.log(curGuess)
          return (
            <CurRow
              id={`row_${row}`}
              key={`row_${row}`}
              curGuess={curGuess}
              rowIdx={row}
            ></CurRow>
          );
        } else if (typeof guesses[row] !== "undefined") {
            // console.log(typeof guesses[row] !== "undefined")
          return (
            <Row
              id={`row_${row}`}
              key={`row_${row}`}
              guess={guesses[row]}
              rowIdx={row}
            ></Row>
          );
        } else {
          return (
            <Row
              id={`row_${row}`}
              key={`row_${row}`}
              guess={notGuess}
              rowIdx={row}
            ></Row>
          );
        }
        // row === turn ?  (
        //   <CurRow id={`row_${row}`} key={`row_${row}`}></CurRow>
        // ) : (
        //   <Row id={`row_${row}`} key={`row_${row}`}></Row>
        // );
      })}
      {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
    </div>
  );
};
export default Board;

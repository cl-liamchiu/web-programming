/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Board.css";
import Cell from "./Cell";
import Modal from "./Modal";
import Dashboard from "./Dashboard";
import { revealed } from "../util/reveal";
import createBoard from "../util/createBoard";
import React, { useEffect, useState } from "react";

const Board = ({ boardSize, mineNum, backToHome }) => {
  const [board, setBoard] = useState([]); // An 2-dimentional array. It is used to store the board.
  const [nonMineCount, setNonMineCount] = useState(0); // An integer variable to store the number of cells whose value are not '💣'.
  const [mineLocations, setMineLocations] = useState([]); // An array to store all the coordinate of '💣'.
  const [gameOver, setGameOver] = useState(false); // A boolean variable. If true, means you lose the game (Game over).
  const [remainFlagNum, setRemainFlagNum] = useState(mineNum); // An integer variable to store the number of remain flags.
  const [win, setWin] = useState(false); // A boolean variable. If true, means that you win the game.

  useEffect(() => {
    // Calling the function
    freshBoard();
  }, []);

  //   useEffect(() => {
  //     // Calling the function
  //     console.log(board.map((row)=>console.log(`row${row[0].x}`)))
  //   }, [board]);

  // Creating a board
  const freshBoard = () => {
    const newBoard = createBoard(boardSize, mineNum);
    const newMineNum = newBoard.mineLocations.length
    setBoard(newBoard.board);
    setRemainFlagNum(newMineNum);
    setMineLocations(newBoard.mineLocations);
    setNonMineCount(newBoard.board.length ** 2 - newMineNum);
    // Basic TODO: Use `newBoard` created above to set the `Board`.
    // Hint: Read the definition of those Hook useState functions and make good use of them.
  };

  const restartGame = () => {
    // console.log('r')
    freshBoard();
    setGameOver(false);
    setWin(false);
  };

  // On Right Click / Flag Cell
  const updateFlag = (e, x, y) => {
    // To not have a dropdown on right click
    e.preventDefault();
    // console.log(e);
    // Deep copy of a state
    let newBoard = JSON.parse(JSON.stringify(board));
    let newFlagNum = remainFlagNum;

    if (gameOver === true) return
    if (newBoard[x][y].revealed === true) return
    if (newFlagNum !== 0 && board[x][y].flagged === false) {
      newBoard[x][y].flagged = true;
      newFlagNum --;
      // console.log('--')
    }else if (board[x][y].flagged === true) {
      newBoard[x][y].flagged = false;
      newFlagNum ++;
      // console.log("++")
    }
    // console.log("oringinalFlagNum")
    // console.log(remainFlagNum)
    
    // console.log("newFlagNum")
    // console.log(newFlagNum)
    setRemainFlagNum(newFlagNum);
    setBoard(newBoard);
    // Basic TODO: Right Click to add a flag on board[x][y]
    // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
    // Update board and remainFlagNum in the end
  };

  const revealCell = (x, y) => {
    if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
    let newBoard = JSON.parse(JSON.stringify(board));
    let newNonMinesCount = nonMineCount
    let newRemainFlagNum = remainFlagNum
    let revealedBoard = revealed(newBoard, x, y, newNonMinesCount, newRemainFlagNum)
    setBoard(revealedBoard.board)
    setNonMineCount(revealedBoard.newNonMinesCount)
    setRemainFlagNum(revealedBoard.newRemainFlagNum)
    // console.log(revealedBoard.newRemainFlagNum)
    // console.log(revealedBoard.newNonMinesCount)
    // newBoard[x][y].revealed = true;
    // setBoard(newBoard);

    if (newBoard[x][y].value === "💣") {
      setGameOver(true);
      mineLocations.map(
        (location) => (newBoard[location[0]][location[1]].revealed = true)
      );
      setBoard(newBoard);
    } else {
      // setNonMineCount(nonMineCount - 1);
      // if (nonMineCount - 1 === 0) {
      //   setWin(true);
      // }
      // console.log(revealedBoard.newNonMinesCount)
      if (revealedBoard.newNonMinesCount === 0) {setWin(true); setGameOver(true);}
    }
    // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
    // Hint: If `Hit the mine`, check ...?
    //       Else if `Reveal the number cell`, check ...?
    // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
  };

  return (
    <div className="boardPage">
      {gameOver || win ? (
        <Modal
          restartGame={restartGame}
          backToHome={backToHome}
          win={win}
        ></Modal>
      ) : (
        ""
      )}
      <div className="boardWrapper">
        {/* <h1>This is the board Page!</h1>{" "} */}
        {/* This line of code is just for testing. Please delete it if you finish this function. */}
        <div className="boardContainer">
          <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}></Dashboard>
          {board.map((row) => {
            return (
              <div
                key={row[0].x}
                id={`row${row[0].x}`}
                style={{ display: "flex" }}
              >
                {row.map((cell) => {
                  return (
                    <Cell
                      key={cell.x * boardSize + cell.y}
                      rowIdx={cell.x}
                      colIdx={cell.y}
                      detail={cell}
                      updateFlag={updateFlag}
                      revealCell={revealCell}
                    ></Cell>
                  );
                })}
              </div>
            );
          })}
        </div>
        {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
        {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
      </div>
    </div>
  );
};

export default Board;

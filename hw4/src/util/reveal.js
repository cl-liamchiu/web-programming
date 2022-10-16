/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, newRemainFlagNum) => {
  board[x][y].revealed = true;
  newNonMinesCount--;
  if(board[x][y].flagged){
    newRemainFlagNum++;
    // console.log('h')
  }
  // console.log(newNonMinesCount);
  if (board[x][y].value === 0) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (
          x + i > -1 &&
          x + i < board.length &&
          y + j > -1 &&
          y + j < board.length &&
          board[x + i][y + j].revealed === false
        ) {
          if (board[x + i][y + j].flagged && board[x + i][y + j].value !== 0) continue
          const revealedBoard=revealed(board, x + i, y + j, newNonMinesCount, newRemainFlagNum);
          newNonMinesCount=revealedBoard.newNonMinesCount;
          newRemainFlagNum=revealedBoard.newRemainFlagNum;
        }
      }
    }
  }
  // Advanced TODO: reveal cells in a more intellectual way.
  // Useful Hint: If the cell is already revealed, do nothing.
  //              If the value of the cell is not 0, only show the cell value.
  //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
  //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
  // console.log("-------------")
  // console.log(newNonMinesCount)
  return { board, newNonMinesCount, newRemainFlagNum};
};

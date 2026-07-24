import { useEffect, useState } from "react";
import "./styles/SudokuNineStyle.css";

export const SudokuNine = () => {
  const [boardElement, setBoardElement] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0)),
  );
  const [displayBoard, setDisplayBoard] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0)),
  );
  const [displayResult, setDisplayResult] = useState("");

  const [ansValidate, setAnsValidate] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0)),
  );

  const shuffle = (arr) => {
    let i = arr.length - 1;
    while (i > 0) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;

      i--;
    }
    return arr;
  };

  const isValid = (board, row, col, num) => {
    for (let testCol = 0; testCol < 9; testCol++) {
      if (board[row][testCol] === num) {
        return false;
      }
    }

    for (let testRow = 0; testRow < 9; testRow++) {
      if (board[testRow][col] === num) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let boxRow = startRow; boxRow < startRow + 3; boxRow++) {
      for (let boxCol = startCol; boxCol < startCol + 3; boxCol++) {
        if (board[boxRow][boxCol] === num) {
          return false;
        }
      }
    }
    return true;
  };

  const fillBoard = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const randomArray = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

          for (const num of randomArray) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;

              if (fillBoard(board)) {
                return true;
              }
            }

            board[row][col] = 0;
          }
          return false;
        }
      }
    }
    return true;
  };

  const countSolutions = (boardCopy) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (boardCopy[row][col] === 0) {
          let solution = 0;

          for (let num = 1; num < 10; num++) {
            if (isValid(boardCopy, row, col, num)) {
              boardCopy[row][col] = num;

              solution += countSolutions(boardCopy);

              boardCopy[row][col] = 0;
            }
          }
          return solution;
        }
      }
    }
    return 1;
  };

  const createPuzzle = (board, gaps) => {
    let gapsCreated = 0;

    const index = [];

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        index.push([row, col]);
      }
    }

    const randomIndex = shuffle(index);

    for (
      let index = 0;
      index < randomIndex.length && gapsCreated < gaps;
      index++
    ) {
      const [row, col] = randomIndex[index];
      const restoreVal = board[row][col];
      board[row][col] = 0;
      const copyBoard = board.map((row) => [...row]);

      const solCount = countSolutions(copyBoard);
      if (solCount === 1) {
        gapsCreated += 1;
      } else if (solCount > 1) {
        board[row][col] = restoreVal;
      }
    }
  };

  const newGameHandler = () => {
    const elementCopy = boardElement.map((row) => [...row]);
    fillBoard(elementCopy);
    setAnsValidate(() => elementCopy.map((row) => [...row]));
    createPuzzle(elementCopy, 10);
    setBoardElement(elementCopy);
    setDisplayBoard(elementCopy);
    setDisplayResult("");
  };

  const puzzleInputHandle = (e, row, col) => {
    if (boardElement[row][col] > 0) {
      return;
    }
    const userInput = e.target.value;
    const validateInput = /^[1-9]?$/;
    if (validateInput.test(userInput)) {
      setDisplayBoard((prev) => {
        const copy = prev.map((row) => [...row]);
        copy[row][col] = parseInt(userInput);
        return copy;
      });
    }
    return;
  };

  const submitHandler = () => {
    console.log(ansValidate); // testing purpose
    if (displayResult === "WRONG ANSWER :(") {
      setDisplayResult("");
    } else if (JSON.stringify(displayBoard) === JSON.stringify(ansValidate)) {
      setDisplayResult("SOLVED: Congratulations!!");
    } else {
      setDisplayResult("WRONG ANSWER :(");
    }
  };

  const boardBoxes = displayBoard.map((row, rIndex) =>
    row.map((num, cIndex) => {
      return (
        <input
          key={`${rIndex}${cIndex}`}
          className="box"
          value={`${num > 0 ? num : ""}`}
          onChange={(e) => puzzleInputHandle(e, rIndex, cIndex)}
        />
      );
    }),
  );

  return (
    <>
      <h1>Sudoku 9x9</h1>
      <div className="playBoard">{boardBoxes}</div>
      <>
        <button onClick={newGameHandler}>New Game</button>
        <button onClick={() => setDisplayBoard(boardElement)}>
          Clear board
        </button>
        <button onClick={submitHandler}>
          {displayResult === "WRONG ANSWER :(" ? "clear" : "submit"}
        </button>
      </>
      <h2>{displayResult}</h2>
    </>
  );
};

import "./styles/SudokuNineStyle.css";

export const SudokuNine = () => {
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

  const boardElement = [];
  for (let i = 1; i < 10; i++) {
    const row = [];
    for (let j = 1; j < 10; j++) {
      row.push(0);
    }
    boardElement.push(row);
  }

  fillBoard(boardElement);

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

  createPuzzle(boardElement, 40);

  const boardBoxes = boardElement.map((row, rIndex) =>
    row.map((num, cIndex) => {
      return (
        <input
          key={`${rIndex}${cIndex}`}
          className="box"
          value={`${num > 0 ? num : " "}`}
        />
      );
    }),
  );

  return (
    <>
      <h1>Sudoku 9x9</h1>
      <div className="playBoard">{boardBoxes}</div>
    </>
  );
};

import { useEffect, useState } from "react";

const isValidBoard = (board: number[][]) => {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const num = board[row][col];

      if (num == 0)
        continue;

      if (rows[row].has(num)) {
        return false;
      }

      rows[row].add(num)


      if (cols[col].has(num)) {
        return false;
      }

      cols[col].add(board[row][col])
      const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);

      if (boxes[boxIndex].has(num)) {
        return false;
      }

      boxes[boxIndex].add(num);
    }
  }

  return true;
}


const useSudokuValidation = (board: Number[][]) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(isValidBoard(board));
  }, [board, setIsValid])

  return { isValid };
}

export default useSudokuValidation;
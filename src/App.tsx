import React, { useEffect, useState } from 'react'
import './App.css'

const initialBoard: number[][] = Array.from({ length: 9 }, () => new Array(9).fill(0));

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

function App() {
  const [board, setBoard] = useState(initialBoard)
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(isValidBoard(board));
  }, [board, setIsValid])

  const onCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.dataset.cell) { //event fired for unsupported element
      return;
    }

    if (!e.target.validity.valid && e.target.value !== "") { //value is not number, not empty or not in range
      return;
    }

    const [i, j] = e.target.dataset.cell.split('-').map(e => Number(e));

    setBoard(prevBoard =>
      prevBoard.map((rows, r) =>
        rows.map((cell, c) =>
          r == i && c == j ? e.target.value ? Number(e.target.value) : 0 : cell)
      )
    )
  }


  return (
    <>
      <table>
        <tbody>
          {board.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((cell, j) => (
                <td key={`row-${i}-col-${j}`}>
                  <input data-cell={`${i}-${j}`} type="number" min="1" max="9" value={board[i][j] === 0 ? "" : board[i][j]} onChange={onCellChange} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        {isValid ? "board is valid" : "board is invalid"}
      </p>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

    </>
  )
}

export default App

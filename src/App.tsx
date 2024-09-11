import React, { useState } from 'react'
import './App.css'
import useSudokuValidation from './hooks/useSudokuValidation';
import Row from './components/row';

const initialBoard: number[][] = Array.from({ length: 9 }, () => new Array(9).fill(0));

function App() {
  const [board, setBoard] = useState(initialBoard)
  const { isValid } = useSudokuValidation(board);

  const onCellChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { dataset, validity, value } = e.target;

    if (!dataset.cell) { //event fired for unsupported element
      return;
    }

    if (!validity.valid && value !== "") { //value is not number, not empty or not in range
      return;
    }

    const [i, j] = dataset.cell.split('-').map(e => Number(e));

    setBoard(prevBoard =>
      prevBoard.map((rows, r) =>
        rows.map((cell, c) =>
          r === i && c === j ? value ? Number(value) : 0 : cell)
      )
    )
  }, [setBoard])


  return (
    <>
      <table>
        <tbody>
          {board.map((row, i) => (
            <Row key={`row-${i}`} cells={row} i={i} onCellChange={onCellChange} />
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

import React from "react";

interface CellProps {
  i: Number;
  j: Number;
  value: number
  onCellChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Cell = React.memo(({ value, i, j, onCellChange }: CellProps) => ( //Memo to prevent re-render when other cell value changes
  <td>
    <input data-cell={`${i}-${j}`} type="number" min="1" max="9" value={value === 0 ? "" : value} onChange={onCellChange} />
  </td>
))

export default Cell;
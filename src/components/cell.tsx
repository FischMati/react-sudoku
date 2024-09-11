import React from "react";

interface CellProps {
  i: number;
  j: number;
  value: number;
  onCellChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Cell = React.memo(({ value, i, j, onCellChange }: CellProps) => ( //Memo to prevent re-render when other cell value changes
  <td>
    <input data-cell={`${i}-${j}`} type="number" inputMode="numeric" min="1" max="9" value={value === 0 ? "" : value} onChange={onCellChange} />
  </td>
))

export default Cell;
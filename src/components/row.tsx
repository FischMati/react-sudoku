import Cell from "./cell";

interface RowProps {
  i: number;
  cells: number[];
  onCellChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Row = ({ cells, i, onCellChange }: RowProps) => (
  <tr>
    {cells.map((cell, j) => (
      <Cell key={`row-${i}-col-${j}`} i={i} j={j} onCellChange={onCellChange} value={cell} />
    ))}
  </tr>
)

export default Row;
import React, { useMemo, useState } from 'react'
import { Colors } from '../components/colors';

type UseColumnsProps = number[];

export type ColumnData = {
  columnHeight: number;
  columnWidth: number;
  x: number;
  y: number;
  color: Colors;
  value: number;
  animation?: {
    position: number;
  };
};

type UseColumnsOutput = {
  columnData: ColumnData[];
	setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
}

export const useColumns = (initState: UseColumnsProps): UseColumnsOutput => {

	const [numbers, setNumbers] = useState(initState);

  const blockHeight = useMemo(()=> Math.floor((250 - 20)/100), [])
  const columnWidth = useMemo(() => 800/(numbers.length + ((numbers.length + 1) / 4)), [numbers])
  const spaceWidth = useMemo(() => (800 - (numbers.length * columnWidth)) / (numbers.length + 1), [numbers, columnWidth])

  const columnData = useMemo(() => numbers.map((value, index) => {
    const columnHeight = value * blockHeight;
    const y = 240 - columnHeight;
		const x = (spaceWidth + (columnWidth + spaceWidth) * index)
    return {
      columnHeight,
      columnWidth,
			x,
      y,
      value,
      color: Colors.blue
    }
  }), [columnWidth, blockHeight, spaceWidth, numbers])

  return { columnData, setNumbers }
}

export default useColumns
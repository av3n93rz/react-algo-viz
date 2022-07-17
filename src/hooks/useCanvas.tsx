import type { Dispatch, SetStateAction } from 'react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { StepState } from '../types';
import { Canvas } from '../components/canvas/canvas';
import { Column } from '../components/column/column';
import Colors from '../components/colors';
import { numberArrayGeneratoor } from '../utils/numberArrayGenerator';

export type ColumnData = {
  columnHeight: number;
  columnWidth: number;
  x: number;
  y: number;
  color: Colors;
  value: number;
  key: string;
  animation?: {
    position: number;
  };
};

type UseCanvasProps = {
  animationDuration: number;
};

type UseCanvasOutput = {
  canvas: JSX.Element;
  setSortingState: Dispatch<SetStateAction<StepState>>;
  columnData: ColumnData[];
  resetCanvas: () => void;
};

export const useCanvas = ({ animationDuration }: UseCanvasProps): UseCanvasOutput => {
  const [numbers, setNumbers] = useState(numberArrayGeneratoor(15));
  const blockHeight = useMemo(() => Math.floor((250 - 20) / 100), []);
  const columnWidth = useMemo(() => 800 / (numbers.length + (numbers.length + 1) / 4), [numbers]);
  const spaceWidth = useMemo(() => (800 - numbers.length * columnWidth) / (numbers.length + 1), [numbers, columnWidth]);
  const columnData = useMemo(
    () =>
      numbers.map((value, index) => {
        const columnHeight = value * blockHeight;
        const y = 240 - columnHeight;
        const x = spaceWidth + (columnWidth + spaceWidth) * index;
        return {
          columnHeight,
          columnWidth,
          x,
          y,
          value,
          color: Colors.BLUE,
          key: `${value}_${index}`,
        };
      }),
    [columnWidth, blockHeight, spaceWidth, numbers],
  );
  const [sortingState, setSortingState] = useState<StepState>(columnData);

  const resetCanvas = useCallback(() => {
    const newNumbers = numberArrayGeneratoor(15);
    setNumbers(newNumbers);
  }, []);

  useEffect(() => {
    setSortingState(columnData);
  }, [columnData]);

  const columns = useMemo(
    () => sortingState.map((col) => <Column animationDuration={animationDuration} columnData={col} key={col.key} />),
    [sortingState, animationDuration],
  );

  const canvas = useMemo(() => <Canvas columns={columns} />, [columns]);

  return { canvas, setSortingState, columnData, resetCanvas };
};

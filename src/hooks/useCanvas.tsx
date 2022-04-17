import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import type { StepState } from '../algorithms/types';
import { Canvas } from '../components/canvas/canvas';
import { Column } from '../components/column/column';
import type { ColumnData } from './useColumns';

type UseCanvasProps = {
  columnData: ColumnData[];
  animationDuration: number;
};

type UseCanvasOutput = {
  canvas: JSX.Element;
  setSortingState: Dispatch<SetStateAction<StepState>>;
};

export const useCanvas = ({ columnData, animationDuration }: UseCanvasProps): UseCanvasOutput => {
  const [sortingState, setSortingState] = useState<StepState>(columnData);

  useEffect(() => {
    setSortingState(columnData);
  }, [columnData]);

  const columns = useMemo(
    () => sortingState.map((col) => <Column animationDuration={animationDuration} columnData={col} key={col.value} />),
    [sortingState, animationDuration],
  );

  const canvas = useMemo(() => <Canvas columns={columns} />, [columns]);

  return { canvas, setSortingState };
};

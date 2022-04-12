import React, { useMemo, useState } from 'react'
import Canvas from '../components/canvas/canvas';
import Column from '../components/column/column';
import { StepState } from '../components/generator/generator';
import { ColumnData } from './useColumns';

type UseCanvasInput = ColumnData[];

type UseCanvasOutput = {
    canvas: JSX.Element;
	setSortingState: React.Dispatch<React.SetStateAction<StepState>>;
}

export const useColumns = (initState: UseCanvasInput): UseCanvasOutput => {
	const [sortingState, setSortingState] = useState<StepState>({
		result: initState,
	});

	const columns = useMemo(() => sortingState.result.map(col =>(<Column columnData={col} key={col.value}/>)), [sortingState]);
    const canvas = useMemo(() =>(<Canvas columns={columns}/>), [columns]);

  return { canvas, setSortingState };
};

export default useColumns;
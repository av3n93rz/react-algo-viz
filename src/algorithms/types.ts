import type { Dispatch } from 'react';
import type { Count } from '../App';
import type { ColumnData } from '../hooks/useColumns';

export type StepState = ColumnData[];

export type SortingGenerator = Generator<StepState, StepState>;

export type SortParams = {
  columnData: ColumnData[];
  setCount: Dispatch<keyof Count | 'reset'>;
};

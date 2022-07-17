import type { Dispatch } from 'react';
import type { ColumnData } from './hooks/useCanvas';

export type StepState = ColumnData[];

export type SortingGenerator = Generator<StepState, StepState>;

export type SortParams = {
  columnData: StepState;
  setCount: Dispatch<Counters | 'reset'>;
};

export enum Algorithms {
  BUBBLE = 'bubbleSort',
  PATIENCE = 'patienceSort',
}

export enum Counters {
  COMPARISON = 'comparison',
  SWAP = 'swap',
}

import type { Dispatch, SetStateAction } from 'react';
import type { ColumnData } from '../../hooks/useColumns';
import Colors from '../colors';

export type StepState = ColumnData[];

export type SortingGenerator = Generator<StepState, StepState>;

type BubbleSortInput = {
  columnData: ColumnData[];
  setComparisonCount: Dispatch<SetStateAction<number>>;
  setSwapCount: Dispatch<SetStateAction<number>>;
};

export function* bubbleSort({ columnData, setComparisonCount, setSwapCount }: BubbleSortInput): SortingGenerator {
  let noswaps = false;
  for (let i = 0; i < columnData.length; i++) {
    noswaps = true;
    let col1;
    let col2;
    for (let j = 0; j < columnData.length - i - 1; j++) {
      col1 = columnData[j];
      col2 = columnData[j + 1];
      col1.color = Colors.TEAL;
      col2.color = Colors.TEAL;
      yield columnData;
      setComparisonCount((prevCount) => prevCount + 1);
      if (col1.value > col2.value) {
        setSwapCount((prevCount) => prevCount + 1);
        noswaps = false;
        col1.color = Colors.ORANGE;
        yield columnData;

        columnData[j + 1].animation = { position: columnData[j + 1].x - columnData[j].x };
        columnData[j].animation = { position: columnData[j].x - columnData[j + 1].x };
        yield columnData;

        columnData[j + 1].animation = undefined;
        columnData[j].animation = undefined;
        const A_X = columnData[j].x;
        columnData[j].x = columnData[j + 1].x;
        columnData[j + 1].x = A_X;
        [columnData[j], columnData[j + 1]] = [columnData[j + 1], columnData[j]];
        yield columnData;

        col2.color = Colors.PEACH;
      } else {
        col2.color = Colors.ORANGE;
        col1.color = Colors.PEACH;
        yield columnData;
      }
      yield columnData;
    }
    let lastIdx = columnData.length - 1 - i;
    columnData[lastIdx].color = Colors.RED;
    columnData.forEach((col) => {
      if (col.color === Colors.ORANGE || col.color === Colors.PEACH) {
        col.color = Colors.BLUE;
      }
    });
    if (noswaps) {
      while (lastIdx-- > 0) {
        columnData[lastIdx].color = Colors.RED;
        yield columnData;
      }
      break;
    }
  }
  return columnData;
}

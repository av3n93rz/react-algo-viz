import Colors from '../components/colors';
import { Counters } from '../types';
import type { SortingGenerator, SortParams } from '../types';

export function* bubbleSort({ columnData, setCount }: SortParams): SortingGenerator {
  let noswaps = false;
  for (let i = 0; i < columnData.length; i++) {
    noswaps = true;
    for (let j = 0; j < columnData.length - i - 1; j++) {
      const col1 = columnData[j];
      const col2 = columnData[j + 1];
      col1.color = Colors.TEAL;
      col2.color = Colors.TEAL;
      yield columnData;
      setCount(Counters.COMPARISON);
      if (col1.value > col2.value) {
        noswaps = false;
        col1.color = Colors.ORANGE;
        yield columnData;

        setCount(Counters.SWAP);
        col2.animation = { position: col2.x - col1.x };
        col1.animation = { position: col1.x - col2.x };
        yield columnData;

        col2.animation = undefined;
        col1.animation = undefined;
        col2.color = Colors.PEACH;
        [col1.x, col2.x] = [col2.x, col1.x];
        [columnData[j], columnData[j + 1]] = [columnData[j + 1], columnData[j]];
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

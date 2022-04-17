import type { ColumnData } from '../hooks/useColumns';
import Colors from '../components/colors';
import type { SortingGenerator, SortParams } from './types';

export function* patienceSort({ columnData, setCount }: SortParams): SortingGenerator {
  const piles: ColumnData[][] = [];

  for (const col of columnData) {
    col.color = Colors.TEAL;
    yield columnData;
    col.color = Colors.PEACH;
    setCount('comparisons');
    const destinationPile = piles.find((pile) => pile[pile.length - 1].value <= col.value);
    if (destinationPile) {
      destinationPile.push(col);
    } else {
      piles.push([col]);
    }
    yield columnData;
  }

  const tmp: ColumnData[] = [];

  for (let i = 0; i < columnData.length; i++) {
    let sourcePileIndex = 0;
    for (let p = 1; p < piles.length; p++) {
      setCount('comparisons');
      if (piles[p][0].value < piles[sourcePileIndex][0].value) {
        sourcePileIndex = p;
      }
    }

    const pile = piles[sourcePileIndex];
    const cd = pile.shift() as ColumnData;
    cd.color = Colors.ORANGE;
    tmp[i] = cd;
    if (pile.length === 0) {
      piles.splice(sourcePileIndex, 1);
    }
    yield columnData;
  }

  for (const [Idx, tmpCol] of tmp.entries()) {
    if (columnData[Idx].value !== tmpCol.value) {
      const originalIndex = columnData.findIndex((col, index) => index > Idx && col.value === tmpCol.value);
      if (originalIndex >= 0) {
        setCount('swaps');
        const col1 = columnData[originalIndex];
        const col2 = columnData[Idx];
        col1.animation = { position: col1.x - col2.x };
        col2.animation = { position: col2.x - col1.x };
        yield columnData;

        col1.animation = undefined;
        col2.animation = undefined;
        const A_X = col2.x;
        col2.x = col1.x;
        col1.x = A_X;
        [columnData[Idx], columnData[originalIndex]] = [columnData[originalIndex], columnData[Idx]];
        yield columnData;
      }
    }
    columnData[Idx].color = Colors.RED;
    yield columnData;
  }

  return columnData;
}

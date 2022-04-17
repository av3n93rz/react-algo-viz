import { Grid } from '@mui/material';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import type { FC } from 'react';
import Chart from './components/chart/chart';
import { bubbleSort } from './algorithms/bubbleSort';
import { patienceSort } from './algorithms/patienceSort';
import Settings from './components/settings/settings';
import { useCanvas } from './hooks/useCanvas';
import { useColumns } from './hooks/useColumns';

export type Count = {
  comparisons: number;
  swaps: number;
};

type Reducer = (state: Count, action: keyof Count | 'reset') => Count;

export type Algorithms = 'bubbleSort' | 'patienceSort';

export const App: FC = () => {
  const [sorting, setSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>('patienceSort');
  const [sortThrottling, setSortThrottling] = useState(100);
  const { columnData, setNumbers } = useColumns([3, 6, 13, 5, 1, 2, 14, 15, 12, 8, 9, 4, 7, 10, 11]);
  const { canvas, setSortingState } = useCanvas({ columnData, animationDuration: sortThrottling / 2 });
  const [count, setCount] = useReducer<Reducer>(
    (state, action) => {
      if (action === 'reset') {
        return {
          comparisons: 0,
          swaps: 0,
        };
      }
      return { ...state, [`${action}`]: state[`${action}`] + 1 };
    },
    {
      comparisons: 0,
      swaps: 0,
    },
  );

  const generator = useMemo(() => {
    switch (selectedAlgorithm) {
      case 'patienceSort':
        return patienceSort({ columnData, setCount });
      default:
        return bubbleSort({ columnData, setCount });
    }
  }, [columnData, selectedAlgorithm]);

  const sort = useCallback(() => {
    const { done, value } = generator.next();
    if (done) {
      setSorting(false);
      setIsSorted(true);
    }
    setSortingState([...value]);
  }, [generator, setSortingState, setSorting]);

  const handleSetSorting = useCallback(() => {
    if (!isSorted) {
      setSorting((prevState) => !prevState);
    }
  }, [isSorted]);

  const resetApp = useCallback(() => {
    setSorting(false);
    setIsSorted(false);
    setCount('reset');
    setNumbers([3, 6, 13, 5, 1, 2, 14, 15, 12, 8, 9, 4, 7, 10, 11]);
  }, [setNumbers]);

  useEffect(() => {
    resetApp();
  }, [selectedAlgorithm]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sorting) {
        sort();
      } else {
        clearInterval(intervalId);
      }
    }, sortThrottling);
    return () => clearInterval(intervalId);
  }, [sort, sorting, sortThrottling]);

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" height={'100vh'}>
      <Chart count={count} canvas={canvas} />
      <Settings
        sorting={sorting}
        isSorted={isSorted}
        resetApp={resetApp}
        setSortThrottling={setSortThrottling}
        handleSetSorting={handleSetSorting}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />
    </Grid>
  );
};

import { Box, Grid } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
import { bubbleSort } from './algorithms/bubbleSort';
import { patienceSort } from './algorithms/patienceSort';
import Settings from './components/settings/settings';
import { useCanvas } from './hooks/useCanvas';
import { Algorithms } from './types';
import { useCounters } from './hooks/useCounters';
import { useSorting } from './hooks/useSorting';

export const App: FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>(Algorithms.PATIENCE);
  const [sortThrottling, setSortThrottling] = useState(100);
  const { Counters, setCount } = useCounters();

  const { canvas, setSortingState, columnData, resetCanvas } = useCanvas({
    animationDuration: sortThrottling / 2,
  });

  const generator = useMemo(() => {
    switch (selectedAlgorithm) {
      case Algorithms.PATIENCE:
        return patienceSort({ columnData, setCount });
      case Algorithms.BUBBLE:
        return bubbleSort({ columnData, setCount });
    }
  }, [columnData, selectedAlgorithm]);

  const { handleSetSorting, resetSorting, sorting, isSorted } = useSorting({
    generator,
    setSortingState,
    sortThrottling,
  });

  const resetApp = useCallback(() => {
    resetSorting();
    setCount('reset');
    resetCanvas();
  }, []);

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" height={'100vh'}>
      <Box>
        {Counters}
        {canvas}
      </Box>
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

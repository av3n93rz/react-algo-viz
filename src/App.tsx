import { Grid } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Chart from './components/chart/chart';
import { bubbleSort } from './components/generator/generator';
import Settings from './components/settings/settings';
import useCanvas from './hooks/useCanvas';
import useColumns from './hooks/useColumns';

export const App = () => {

  const [sorting, setSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [comparisonCount, setComparisonCount] = useState(0)
  const [swapCount, setSwapCount] = useState(0)

  const [sortThrottling, setSortThrottling] = useState(100)
  const { columnData, setNumbers } = useColumns([3,6,13,5,1,2,14,15,12,8,9,4,7,10,11])

  const { canvas, setSortingState } = useCanvas({ columnData, animationDuration: sortThrottling/2 })
  const generator = useMemo(() => bubbleSort({columnData, setComparisonCount, setSwapCount}), [columnData])

  const sort = useCallback(() => {
      const {done, value} = generator.next();
      if(done) {
        setSorting(false)
        setIsSorted(true)
      }
      setSortingState([...value])
  }, [generator, setSortingState, setSorting])

  const handleSetSorting = useCallback(() => {
    if(!isSorted) {
      setSorting((prevState) => !prevState)
    }
  },[isSorted])

  const resetApp = useCallback(() => {
    setSorting(false)
    setIsSorted(false)
    setComparisonCount(0)
    setSwapCount(0)
    setNumbers([3,6,13,5,1,2,14,15,12,8,9,4,7,10,11])
  }, [setNumbers])
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if(sorting) {
          sort()
      } else {
          clearInterval(intervalId);
      };
    }, sortThrottling);
    return () => clearInterval(intervalId);
  }, [sort, sorting, sortThrottling])

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height={'100vh'}
    >
      <Chart
        comparisonCount={comparisonCount}
        swapCount={swapCount}
        canvas={canvas}
      />
      <Settings
        sorting={sorting}
        isSorted={isSorted}
        resetApp={resetApp}
        setSortThrottling={setSortThrottling}
        handleSetSorting={handleSetSorting}
      />
    </Grid>
  );
}

export default App;

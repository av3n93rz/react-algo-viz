import Button from '@mui/material/Button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import { bubbleSort } from './components/generator/generator';
import Range from './components/range/range';
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
    <div className='container'>
      <div className='chart'>
        <div>
        <div className="counter_container">
          <p>Comparisons: {comparisonCount}</p>
          <p>Swaps: {swapCount}</p>
        </div>
        {canvas}
        </div>
      </div> 
      <div className='settings'>
        <div>
          <div className="btn_container">
            <Button
              variant="contained"
              color={ sorting ? "error": "success"}
              onClick={handleSetSorting}
              disabled={isSorted}
            >
              {sorting ? "Pause": "Start"}
            </Button>
            <Button variant="contained" color="warning" onClick={resetApp}>Reset</Button>
          </div>
          <div className='rangeContainer'>
            <Range setSortThrottling={setSortThrottling}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

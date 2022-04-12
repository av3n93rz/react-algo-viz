import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import { bubbleSort } from './components/generator/generator';
import useCanvas from './hooks/useCanvas';
import useColumns from './hooks/useColumns';

export const App = () => {

  const [sorting, setSorting] = useState(false);
  const handleClick = useCallback(() => setSorting(!sorting), [setSorting, sorting])

  const { columnData } = useColumns([3,6,13,5,1,2,14,15,12,8,9,4,7,10,11])
  const { canvas, setSortingState } = useCanvas(columnData)
  const generator = useMemo(() => bubbleSort(columnData), [columnData])

  const sort = useCallback(() => {
      const {done, value} = generator.next();
      if(done) {
        setSorting(false)
      }
      setSortingState(value)
  }, [generator, setSortingState, setSorting])
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if(sorting) {
          sort()
      } else {
          clearInterval(intervalId);
      };
    }, 0);
    return () => clearInterval(intervalId);
  }, [sort, sorting])

  return (
    <div className={"container"}>
      <button onClick={handleClick}>Start/Pause</button>
      <div className={"chart"}>
        {canvas}
      </div>
    </div>
  );
}

export default App;

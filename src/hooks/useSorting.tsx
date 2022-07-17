import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useCallback, useState } from 'react';
import type { SortingGenerator, StepState } from '../types';

type UseSortingProps = {
  generator: SortingGenerator;
  setSortingState: Dispatch<SetStateAction<StepState>>;
  sortThrottling: number;
};

type UseSortingOutput = {
  handleSetSorting: () => void;
  resetSorting: () => void;
  sorting: boolean;
  isSorted: boolean;
};

export const useSorting = ({ generator, setSortingState, sortThrottling }: UseSortingProps): UseSortingOutput => {
  const [sorting, setSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

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

  const resetSorting = useCallback(() => {
    setSorting(false);
    setIsSorted(false);
  }, []);

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

  return { handleSetSorting, resetSorting, sorting, isSorted };
};

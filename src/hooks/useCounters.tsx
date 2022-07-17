import Typography from '@mui/material/Typography';
import { useMemo, useReducer } from 'react';
import type { Dispatch } from 'react';
import type { Counters } from '../types';

export type Count = Record<Counters, number>;
type Reducer = (state: Count, action: Counters | 'reset') => Count;

type UseCountersOutput = {
  setCount: Dispatch<Counters | 'reset'>;
  Counters: JSX.Element;
};

export const useCounters = (): UseCountersOutput => {
  const [count, setCount] = useReducer<Reducer>(
    (state, action) => {
      if (action === 'reset') {
        return {
          comparison: 0,
          swap: 0,
        };
      }
      return { ...state, [action]: state[action] + 1 };
    },
    {
      comparison: 0,
      swap: 0,
    },
  );

  const Counters = useMemo(
    () => (
      <>
        <Typography fontWeight={700}>Comparisons: {count.comparison}</Typography>
        <Typography fontWeight={700}>Swaps: {count.swap}</Typography>
      </>
    ),
    [count],
  );

  return { Counters, setCount };
};

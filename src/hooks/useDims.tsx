import type { MutableRefObject } from 'react';
import { useState, useLayoutEffect } from 'react';

export const useDims = (ref: MutableRefObject<SVGTextElement | null>): number => {
  const [dim, setDim] = useState(0);

  useLayoutEffect(() => {
    if (ref?.current) {
      const { width } = ref.current.getBBox();
      setDim(width);
    }
  }, [ref]);

  return dim;
};

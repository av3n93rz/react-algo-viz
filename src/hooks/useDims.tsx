import { useState, useLayoutEffect, MutableRefObject } from "react";

const useDims = (ref: MutableRefObject<SVGTextElement | null>) => {
  const [dim, setDim] = useState(0);

  useLayoutEffect(() => {
    if (ref && ref.current) {
			const { width } = ref.current.getBBox();
			setDim(width);
    };
  }, [ref]);

  return dim;
};

export default useDims;
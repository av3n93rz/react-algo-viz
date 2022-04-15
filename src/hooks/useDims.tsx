import { useState, useLayoutEffect } from "react";

function useDims(ref: React.MutableRefObject<SVGTextElement | null>) {
  const [dim, setDim] = useState(0);

  useLayoutEffect(() => {
    if (ref && ref.current) {
			const { width } = ref.current.getBBox();
			setDim(width);
    }
  }, [ref]);

  return dim;
}

export default useDims;
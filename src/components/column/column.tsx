import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { FC } from 'react';
import type { ColumnData } from '../../hooks/useCanvas';
import { useDims } from '../../hooks/useDims';
import animate from './animate';

export type ColumnProps = {
  columnData: ColumnData;
  animationDuration: number;
};

export const Column: FC<ColumnProps> = ({
  columnData: { columnHeight, columnWidth, y, x, color, animation, value },
  animationDuration,
}) => {
  const chartRef = useRef<SVGTextElement>(null);
  const textElementwidth = useDims(chartRef);
  const [pos, setPos] = useState(0);
  const position = useMemo(() => `${animation?.position ? x + pos * -1 : x}px, ${y}px`, [y, x, pos, animation]);

  useEffect(() => {
    if (animation) {
      animate({
        timing: (fraction) => animation.position * fraction,
        draw: (progress) => setPos(progress),
        duration: animationDuration,
      });
    }
    return () => {
      setPos(0);
    };
  }, [animation, animationDuration]);

  return (
    <g fill={color} style={{ transform: `translate(${position})` }}>
      <rect width={columnWidth} height={columnHeight} />
      <text fill="black" y={columnHeight - 5} x={columnWidth / 2 - Math.round(textElementwidth / 2)} ref={chartRef}>
        {value}
      </text>
    </g>
  );
};

export default Column;

import React, { useMemo } from 'react'
import type { FC } from 'react';
import { ColumnData } from '../../hooks/useColumns';

export type ColumnProps = {
  columnData: ColumnData
};

export const Column: FC<ColumnProps> = ({columnData:{ columnHeight, columnWidth, y, x, color}}) => {
	const position = useMemo(() => `${x}px, ${y}px`, [y, x]);

  const gStyle = useMemo(() => (
    {
      transform: `translate(${position})`,
      fill: color
    }
  ), [color, position]);

  return (
    <g style={gStyle}>
        <rect width={columnWidth} height={columnHeight}/>
    </g>
  )
};

export default Column;
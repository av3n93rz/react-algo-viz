import React, { FC } from 'react'
import { Typography } from '@mui/material'

type ChartProps = {
    comparisonCount: number;
    swapCount: number;
    canvas: JSX.Element;
}

const Chart: FC<ChartProps> = ({ comparisonCount, swapCount, canvas }) => {
  return (
    <div>
      <div className="counter_container">
        <Typography fontWeight={700}>Comparisons: {comparisonCount}</Typography>
        <Typography fontWeight={700}>Swaps: {swapCount}</Typography>
      </div>
      {canvas}
    </div>
  )
}

export default Chart
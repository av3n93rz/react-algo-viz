import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

type ChartProps = {
    comparisonCount: number;
    swapCount: number;
    canvas: JSX.Element;
};

const Chart: FC<ChartProps> = ({ comparisonCount, swapCount, canvas }) => {
  return (
    <Box>
      <Typography fontWeight={700}>Comparisons: {comparisonCount}</Typography>
      <Typography fontWeight={700}>Swaps: {swapCount}</Typography>
      {canvas}
    </Box>
  );
};

export default Chart;
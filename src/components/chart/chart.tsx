import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import React from 'react';

type ChartProps = {
  count: {
    comparisons: number;
    swaps: number;
  };
  canvas: JSX.Element;
};

const Chart: FC<ChartProps> = ({ count, canvas }) => {
  return (
    <Box>
      <Typography fontWeight={700}>Comparisons: {count.comparisons}</Typography>
      <Typography fontWeight={700}>Swaps: {count.swaps}</Typography>
      {canvas}
    </Box>
  );
};

export default Chart;

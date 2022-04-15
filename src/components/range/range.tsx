import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import React, { FC, useCallback, useEffect, useState } from 'react'

type RangeInput = {
  setSortThrottling: React.Dispatch<React.SetStateAction<number>>
}

const Range: FC<RangeInput> = ({ setSortThrottling }) => {

    const [speed, setSpeed] = useState<number>(200);

    const handleSpeedChange = useCallback((_event: Event, speed: number | number[]) => {
        setSpeed(speed as number)
    }, [])

    useEffect(() => {
      setSortThrottling(speed)
    }, [setSortThrottling, speed])


  return (
    <Box mt={3} width={250}>
      <Typography id="input-slider" gutterBottom>
        Sorting speed throttle: {speed}ms
      </Typography>
      <Slider
        aria-label="ms"
        value={speed}
        onChange={handleSpeedChange}
        getAriaValueText={(val) => `${val}`}
        valueLabelDisplay="auto"
        step={10}
        min={0}
        max={500}
      />
    </Box>
  )
}

export default Range
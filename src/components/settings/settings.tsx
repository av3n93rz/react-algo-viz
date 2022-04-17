import Button from '@mui/material/Button';
import type { FC, Dispatch, SetStateAction } from 'react';
import React, { useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Range from '../range/range';
import type { Algorithms } from '../../App';

type SettingsProps = {
  sorting: boolean;
  isSorted: boolean;
  resetApp: () => void;
  setSortThrottling: Dispatch<SetStateAction<number>>;
  handleSetSorting: () => void;
  selectedAlgorithm: Algorithms;
  setSelectedAlgorithm: Dispatch<SetStateAction<Algorithms>>;
};

const Settings: FC<SettingsProps> = ({
  sorting,
  isSorted,
  resetApp,
  setSortThrottling,
  handleSetSorting,
  selectedAlgorithm,
  setSelectedAlgorithm,
}) => {
  const handleSelect = useCallback((e: SelectChangeEvent<Algorithms>) => {
    setSelectedAlgorithm(e.target.value as Algorithms);
  }, []);

  return (
    <Box mt={5}>
      <Grid container justifyContent="center">
        <Box>
          <Grid container direction="column" justifyContent="center">
            <Grid container direction="row" justifyContent="center">
              <Box mr={2}>
                <Button
                  variant="contained"
                  color={sorting ? 'error' : 'success'}
                  onClick={handleSetSorting}
                  disabled={isSorted}
                >
                  {sorting ? 'Pause' : 'Start'}
                </Button>
              </Box>
              <Box>
                <Button variant="contained" color="warning" onClick={resetApp}>
                  Reset
                </Button>
              </Box>
            </Grid>
            <Range setSortThrottling={setSortThrottling} />
          </Grid>
        </Box>
        <Box ml={5} sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Algorithm</InputLabel>
            <Select labelId="select-label" value={selectedAlgorithm} label="Algorithm" onChange={handleSelect}>
              <MenuItem value={'bubbleSort'}>Bubble Sort</MenuItem>
              <MenuItem value={'patienceSort'}>Patience Sort</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Box>
  );
};

export default Settings;

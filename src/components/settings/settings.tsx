
import Button from '@mui/material/Button';
import Range from '../range/range';
import React, { FC } from 'react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

type SettingsProps = {
  sorting: boolean;
  isSorted: boolean;
  resetApp: () => void;
  setSortThrottling: Dispatch<SetStateAction<number>>;
  handleSetSorting: () => void;
};

const Settings: FC<SettingsProps> = ({ sorting, isSorted, resetApp, setSortThrottling, handleSetSorting }) => {
  return (
    <Box mt={5}>
      <Grid
        container
        direction="column"
        justifyContent="center"
      >
        <Grid container direction="row" justifyContent="center">
          <Box mr={2}>
            <Button
              variant="contained"
              color={ sorting ? "error": "success"}
              onClick={handleSetSorting}
              disabled={isSorted}
            >
              {sorting ? "Pause": "Start"}
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="warning"
              onClick={resetApp}
            >
              Reset
            </Button>
          </Box>
        </Grid>
        <Range setSortThrottling={setSortThrottling}/>
      </Grid>
    </Box>
  );
};

export default Settings;
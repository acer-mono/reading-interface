import React from 'react';
import Chart from '../../Chart/Chart';
import CurrentReading from '../../CurrentReading/CurrentReading';
import { Grid } from '@material-ui/core';

function CurrentReadingView() {
  return (
    <>
      <Grid container direction="column" justify="space-between">
        <Grid item>
          <Chart />
          <Chart />
        </Grid>
        <Grid item>
          <CurrentReading />
        </Grid>
      </Grid>
    </>
  );
}

export default CurrentReadingView;

import React from 'react';
import Chart from '../../Chart/Chart';
import CurrentReading from '../../CurrentReading/CurrentReading';
import { Grid } from '@material-ui/core';

function CurrentReadingView({
  reading,
  room,
  updateReading,
  temperature,
  humidity,
  updateReadingList
}) {
  return (
    <>
      <Grid container direction="column" justify="space-between">
        <Grid item>
          <Chart
            title="Температура"
            axisName="Температура(℃)"
            data={temperature}
            yAxis="temperature"
          />
          <Chart title="Влажность" axisName="Влажность(%)" data={humidity} yAxis="humidity" />
        </Grid>
        <Grid item>
          <CurrentReading
            reading={reading}
            room={room}
            updateReadingList={updateReadingList}
            updateReading={updateReading}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default CurrentReadingView;

import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  custom: {
    border: 'none',
    boxShadow: 'none'
  }
});

function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('01.05', 0),
  createData('02.05', 23),
  createData('03.05', 10),
  createData('04.05', 33),
  createData('05.05', 10),
  createData('06.05', 23),
  createData('07.05', 11),
  createData('08.05', 5),
  createData('09.05', undefined)
];

export default function Chart() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Card className={classes.custom}>
      <CardHeader titleTypographyProps={{ color: 'primary' }} title="Температура" />
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24
            }}
          >
            <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
              >
                Температура (℃)
              </Label>
            </YAxis>
            <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

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

export default function Chart({ data, title, axisName, yAxis }) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Card className={classes.custom}>
      <CardHeader titleTypographyProps={{ color: 'primary' }} title={title} />
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
            <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
              >
                {axisName}
              </Label>
            </YAxis>
            <Line type="monotone" dataKey={yAxis} stroke={theme.palette.primary.main} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

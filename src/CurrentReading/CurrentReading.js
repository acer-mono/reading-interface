import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import ReadingForm from '../ReadingForm/ReadingForm';

export default function CurrentReading({ reading, room, updateReading, updateReadingList }) {
  const [open, setOpen] = useState(false);

  return (
    <Card variant="outlined">
      <CardHeader titleTypographyProps={{ color: 'primary' }} title="Текущие показания:" />
      <CardContent>
        <Typography variant="h6" component="h3" color="textSecondary">
          Температура:
        </Typography>
        <Typography variant="h6" component="h3" color="textSecondary">
          {reading && `${reading.temperature}℃`}
          {!reading && '-'}
        </Typography>
        <Typography variant="h6" component="h3" color="textSecondary">
          Влажность:
        </Typography>
        <Typography variant="h6" component="h3" color="textSecondary">
          {reading && `${reading.humidity}%`}
          {!reading && '-'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" href="#" onClick={() => setOpen(true)}>
          {reading && 'Изменить'}
          {!reading && 'Добавить'}
        </Button>
        <ReadingForm
          room={room}
          open={open}
          changeHandler={value => setOpen(value)}
          reading={reading}
          updateReading={updateReading}
          updateReadingList={updateReadingList}
        />
      </CardActions>
    </Card>
  );
}

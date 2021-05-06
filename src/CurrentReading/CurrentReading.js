import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
function preventDefault(event) {
  event.preventDefault();
}

export default function CurrentReading() {
  return (
    <Card variant="outlined">
      <CardHeader titleTypographyProps={{ color: 'primary' }} title="Текущие показания:" />
      <CardContent>
        <Typography variant="h6" component="h3" color="textSecondary">
          Температура:
        </Typography>
        <Typography variant="h6" component="h3" color="textSecondary">
          100℃
        </Typography>
        <Typography variant="h6" component="h3" color="textSecondary">
          Влажность:
        </Typography>
        <Typography variant="h6" component="h3" color="textSecondary">
          99%
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" href="#" onClick={preventDefault}>
          Изменить/Добавить
        </Button>
      </CardActions>
    </Card>
  );
}

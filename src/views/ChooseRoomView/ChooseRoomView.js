import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

function ChooseRoomView() {
  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="room-label">Помещение</InputLabel>
        <Select labelId="room-label" id="Room" label="Помещение">
          <MenuItem value={1}>Хранилище №1</MenuItem>
          <MenuItem value={2}>Хранилище №2</MenuItem>
          <MenuItem value={3}>Хранилище №3</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default ChooseRoomView;

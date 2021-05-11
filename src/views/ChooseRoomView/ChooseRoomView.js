import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

function ChooseRoomView({ rooms, setRoomHandler }) {
  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="room-label">Помещение</InputLabel>
        <Select labelId="room-label" id="Room" label="Помещение" onChange={setRoomHandler}>
          {rooms.map(room => (
            <MenuItem key={room.id} value={room.id}>
              {room.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default ChooseRoomView;

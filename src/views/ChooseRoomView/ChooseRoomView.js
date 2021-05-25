import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loadAsync } from '../../redux/actions/rooms';

function ChooseRoomView({ setRoomHandler }) {
  const rooms = useSelector(store => store.rooms.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAsync());
  }, []);
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

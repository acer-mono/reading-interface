import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import UserForm from '../UserForm/UserForm';
import RoomForm from '../RoomForm/RoomForm';
import { useDispatch, useSelector } from 'react-redux';
import { openRoom, openUser } from '../redux/actions/editForms';

function Entity({ item, fieldForRendering, deleteHandler, updateHandler }) {
  const dispatch = useDispatch();
  const isEditUserOpen = useSelector(store => store.editForms.user);
  const isEditRoomOpen = useSelector(store => store.editForms.room);
  return (
    <ListItem>
      {fieldForRendering === 'login' && (
        <UserForm
          isCreation={false}
          user={item}
          open={isEditUserOpen === item.id}
          updateHandler={updateHandler}
        />
      )}
      {fieldForRendering === 'name' && (
        <RoomForm isCreation={false} room={item} open={isEditRoomOpen === item.id} />
      )}
      <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={item[fieldForRendering]} />
      <ListItemSecondaryAction>
        {fieldForRendering === 'login' && (
          <IconButton edge="end" aria-label="delete" onClick={() => dispatch(openUser(item.id))}>
            <EditIcon />
          </IconButton>
        )}
        {fieldForRendering === 'name' && (
          <IconButton edge="end" aria-label="delete" onClick={() => dispatch(openRoom(item.id))}>
            <EditIcon />
          </IconButton>
        )}
        {item.readings.length === 0 && (
          <IconButton edge="end" aria-label="delete" onClick={() => deleteHandler(item.id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Entity;

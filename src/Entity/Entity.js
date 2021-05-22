import React, { useState } from 'react';
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

function Entity({ item, fieldForRendering, deleteHandler, updateHandler }) {
  const [open, setOpen] = useState();
  return (
    <ListItem>
      {fieldForRendering === 'login' && (
        <UserForm isCreation={false} user={item} open={open} updateHandler={updateHandler} />
      )}
      {fieldForRendering === 'name' && <RoomForm isCreation={false} room={item} open={open} />}
      <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={item[fieldForRendering]} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={() => deleteHandler(item.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Entity;

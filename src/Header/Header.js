import React, { useCallback } from 'react';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PrintPlot from '../PrintPlot/PrintPlot';
import PrintTable from '../PrintTable/PrintTable';
import UserForm from '../UserForm/UserForm';
import RoomForm from '../RoomForm/RoomForm';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCreate,
  setEdit,
  setPlotStatus,
  setPrint,
  setRoomStatus,
  setTableStatus,
  setUserStatus
} from '../redux/reducers/status';
import { logout } from '../auth';

const useStyles = makeStyles(() => ({
  appBar: {
    position: 'relative'
  },
  menuButton: {
    background: 'none',
    border: 'none',
    outline: 'none',
    color: 'white',
    textTransform: 'uppercase'
  }
}));

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { room, user, table, plot, create, print, edit } = useSelector(store => store.status);
  const currentUser = useSelector(store => store.currentUser.user);

  const handleClickOpenPrintPlot = () => {
    dispatch(setPrint(null));
    dispatch(setPlotStatus(true));
  };

  const handleClickOpenPrintTable = () => {
    dispatch(setPrint(null));
    dispatch(setTableStatus(true));
  };

  const handleClickUserCreation = () => {
    dispatch(setCreate(null));
    dispatch(setUserStatus(true));
  };

  const handleClickRoomCreation = () => {
    dispatch(setCreate(null));
    dispatch(setRoomStatus(true));
  };

  return (
    <AppBar position="absolute" color="primary" className={classes.appBar}>
      <Toolbar>
        <IconButton onClick={useCallback(() => history.push('/reading-interface'), [history])}>
          <HomeIcon style={{ color: 'white' }} fontSize="large" />
        </IconButton>
        <Button
          classes={{
            root: classes.menuButton
          }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={event => dispatch(setPrint(event.currentTarget))}
        >
          Печать
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={print}
          keepMounted
          open={Boolean(print)}
          onClose={() => dispatch(setPrint(null))}
        >
          <MenuItem onClick={handleClickOpenPrintTable}>Таблица</MenuItem>
          <PrintTable open={table} changeState={value => dispatch(setTableStatus(value))} />
          <MenuItem onClick={handleClickOpenPrintPlot}>График</MenuItem>
          <PrintPlot open={plot} changeState={value => dispatch(setPlotStatus(value))} />
        </Menu>
        {currentUser.isAdmin && (
          <>
            <Button
              classes={{
                root: classes.menuButton
              }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={event => dispatch(setCreate(event.currentTarget))}
            >
              Создание
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={create}
              keepMounted
              open={Boolean(create)}
              onClose={() => dispatch(setCreate(null))}
            >
              <MenuItem onClick={handleClickUserCreation}>Пользователь</MenuItem>
              <UserForm isCreation={true} open={Boolean(user)} />
              <MenuItem onClick={handleClickRoomCreation}>Помещение</MenuItem>
              <RoomForm isCreation={true} open={Boolean(room)} />
            </Menu>
            <Button
              classes={{
                root: classes.menuButton
              }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={event => dispatch(setEdit(event.currentTarget))}
            >
              Редактирование
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={edit}
              keepMounted
              open={Boolean(edit)}
              onClose={() => dispatch(setEdit(null))}
            >
              <MenuItem
                onClick={() => {
                  dispatch(setEdit(null));
                  history.push('/reading-interface/users');
                }}
              >
                Пользователь
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setEdit(null));
                  history.push('/reading-interface/rooms');
                }}
              >
                Помещение
              </MenuItem>
            </Menu>
          </>
        )}
        <IconButton onClick={() => logout()}>
          <ExitToAppIcon style={{ color: 'white' }} fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

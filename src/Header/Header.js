import React, { useCallback } from 'react';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PrintPlot from '../PrintPlot/PrintPlot';
import PrintTable from '../PrintTable/PrintTable';
import UserForm from '../UserForm/UserForm';
import RoomForm from '../RoomForm/RoomForm';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCreate,
  setEdit,
  setPlotStatus,
  setPrint,
  setRoomStatus,
  setTableStatus,
  setUserStatus
} from '../redux/actions/status';

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
  const status = useSelector(store => store.status);

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
        <IconButton onClick={useCallback(() => history.push('/'), [history])}>
          <HomeIcon style={{ color: 'white' }} fontSize="large" />
        </IconButton>
        <Button
          classes={{
            root: classes.menuButton
          }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={event => setPrint(event.currentTarget)}
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
          <PrintTable open={status.table} changeState={value => dispatch(setTableStatus(value))} />
          <MenuItem onClick={handleClickOpenPrintPlot}>График</MenuItem>
          <PrintPlot open={status.plot} changeState={value => dispatch(setPlotStatus(value))} />
        </Menu>
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
          anchorEl={status.create}
          keepMounted
          open={Boolean(status.create)}
          onClose={() => setCreate(null)}
        >
          <MenuItem onClick={handleClickUserCreation}>Пользователь</MenuItem>
          <UserForm
            isCreation={true}
            open={status.user}
            changeHandler={value => dispatch(setUserStatus(value))}
          />
          <MenuItem onClick={handleClickRoomCreation}>Помещение</MenuItem>
          <RoomForm
            isCreation={true}
            open={status.room}
            changeHandler={value => dispatch(setRoomStatus(value))}
          />
        </Menu>
        <Button
          classes={{
            root: classes.menuButton
          }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={event => setEdit(event.currentTarget)}
        >
          Редактирование
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={status.edit}
          keepMounted
          open={Boolean(status.edit)}
          onClose={() => dispatch(setEdit(null))}
        >
          <MenuItem
            onClick={useCallback(() => {
              setEdit(null);
              history.push('/users');
            }, [history])}
          >
            Пользователь
          </MenuItem>
          <MenuItem
            onClick={useCallback(() => {
              setEdit(null);
              history.push('/rooms');
            }, [history])}
          >
            Помещение
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

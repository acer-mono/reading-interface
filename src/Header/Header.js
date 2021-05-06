import React, { useCallback } from 'react';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PrintPlot from '../PrintPlot/PrintPlot';
import PrintTable from '../PrintTable/PrintTable';
import UserForm from '../UserForm/UserForm';
import RoomForm from '../RoomForm/RoomForm';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

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
  const [print, setPrint] = React.useState(null);
  const [create, setCreate] = React.useState(null);
  const [edit, setEdit] = React.useState(null);
  const [openPrintPlot, setOpenPrintPlot] = React.useState(false);
  const [openPrintTable, setOpenPrintTable] = React.useState(false);
  const [userCreation, setUserCreation] = React.useState(false);
  const [roomCreation, setRoomCreation] = React.useState(false);

  const handleClickOpenPrintPlot = () => {
    setPrint(null);
    setOpenPrintPlot(true);
  };

  const handleClickOpenPrintTable = () => {
    setPrint(null);
    setOpenPrintTable(true);
  };

  const handleClickUserCreation = () => {
    setCreate(null);
    setUserCreation(true);
  };

  const handleClickRoomCreation = () => {
    setCreate(null);
    setRoomCreation(true);
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
          onClose={() => setPrint(null)}
        >
          <MenuItem onClick={handleClickOpenPrintTable}>Таблица</MenuItem>
          <PrintTable open={openPrintTable} changeState={value => setOpenPrintTable(value)} />
          <MenuItem onClick={handleClickOpenPrintPlot}>График</MenuItem>
          <PrintPlot open={openPrintPlot} changeState={value => setOpenPrintPlot(value)} />
        </Menu>
        <Button
          classes={{
            root: classes.menuButton
          }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={event => setCreate(event.currentTarget)}
        >
          Создание
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={create}
          keepMounted
          open={Boolean(create)}
          onClose={() => setCreate(null)}
        >
          <MenuItem onClick={handleClickUserCreation}>Пользователь</MenuItem>
          <UserForm
            isCreation={true}
            open={userCreation}
            changeHandler={value => setUserCreation(value)}
          />
          <MenuItem onClick={handleClickRoomCreation}>Помещение</MenuItem>
          <RoomForm
            isCreation={true}
            open={roomCreation}
            changeHandler={value => setRoomCreation(value)}
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
          anchorEl={edit}
          keepMounted
          open={Boolean(edit)}
          onClose={() => setEdit(null)}
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

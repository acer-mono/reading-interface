import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

function SearchString({ filterItems }) {
  const classes = useStyles();
  const [value, changeValue] = useState();

  function changeHandler(event) {
    filterItems(event.target.value);
    changeValue(event.target.value);
  }

  return (
    <Paper variant="outlined" component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Введите данные для поиска"
        inputProps={{ 'aria-label': 'Введите данные для поиска' }}
        defaultValue={value}
        onChange={changeHandler}
      />
      <SearchIcon color="disabled" className={classes.iconButton} />
    </Paper>
  );
}

export default SearchString;

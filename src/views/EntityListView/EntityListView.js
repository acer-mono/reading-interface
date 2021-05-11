import React, { useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EntityList from '../../EntityList/EntityList';
import SearchString from '../../SearchString/SearchString';

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    border: 'none',
    boxShadow: 'none'
  }
}));

function EntityListView({ items, fieldForSearching, title, deleteHandler, updateHandler }) {
  const classes = useStyles();
  const [filter, changeFilter] = useState('');

  function changeFilterHandler(value) {
    changeFilter(value);
  }

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            {title}
          </Typography>
          <SearchString filterItems={changeFilterHandler} />
          <EntityList
            items={items.filter(el => el[fieldForSearching].includes(filter))}
            fieldForRendering={fieldForSearching}
            deleteHandler={deleteHandler}
            updateHandler={updateHandler}
          />
        </Paper>
      </main>
    </>
  );
}

export default EntityListView;

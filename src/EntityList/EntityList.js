import React from 'react';
import Entity from '../Entity/Entity';
import { List, Typography } from '@material-ui/core';

function EntityList({ items, fieldForRendering, deleteHandler, updateHandler }) {
  if (items.length === 0) {
    return (
      <Typography variant="body1" align="center">
        Ничего не найдено
      </Typography>
    );
  } else {
    return (
      <List style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
        {items.map(item => (
          <Entity
            item={item}
            key={item.id}
            fieldForRendering={fieldForRendering}
            deleteHandler={deleteHandler}
            updateHandler={updateHandler}
          />
        ))}
      </List>
    );
  }
}

export default EntityList;

import React from 'react';
import EntityListView from '../EntityListView/EntityListView';
import { edit as roomEdit } from '../../redux/reducers/users';
import {
  loadAsync as roomLoadAsync,
  removeAsync as roomRemoveAsync
} from '../../redux/actions/rooms';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export const RoomsView = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(store => store.rooms.list);

  useEffect(async () => {
    dispatch(roomLoadAsync());
  }, []);

  return (
    <EntityListView
      items={rooms}
      fieldForSearching="name"
      title="Помещения"
      deleteHandler={id => dispatch(roomRemoveAsync(id))}
      updateHandler={room => roomEdit(room)}
    />
  );
};

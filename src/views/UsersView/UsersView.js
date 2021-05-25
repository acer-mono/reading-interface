import React from 'react';
import EntityListView from '../EntityListView/EntityListView';
import {
  loadAsync as usersLoadAsync,
  removeAsync as usersRemoveAsync
} from '../../redux/actions/users';
import { edit as userEdit } from '../../redux/actions/rooms';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export const UsersView = () => {
  const dispatch = useDispatch();
  const users = useSelector(store => store.users.list);

  useEffect(async () => {
    dispatch(usersLoadAsync());
  }, []);

  return (
    <EntityListView
      items={users}
      fieldForSearching="login"
      title="Пользователи"
      deleteHandler={id => dispatch(usersRemoveAsync(id))}
      updateHandler={user => userEdit(user)}
    />
  );
};

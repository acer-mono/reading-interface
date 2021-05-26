export const editFormsActionTypes = {
  openUser: 'editForms/openUser',
  openRoom: 'editForms/openRoom',
  closeUser: 'editForms/closeUser',
  closeRoom: 'editForms/closeRoom'
};

export const openUser = id => ({
  type: editFormsActionTypes.openUser,
  payload: id
});

export const closeUser = () => ({
  type: editFormsActionTypes.closeUser
});

export const openRoom = id => ({
  type: editFormsActionTypes.openRoom,
  payload: id
});

export const closeRoom = () => ({
  type: editFormsActionTypes.closeRoom
});

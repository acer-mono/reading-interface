export const statusActionTypes = {
  setUserStatus: 'status/user',
  setRoomStatus: 'status/room',
  setTableStatus: 'status/table',
  setPlotStatus: 'status/plot',
  setCreate: 'status/create',
  setPrint: 'status/print',
  setEdit: 'status/edit'
};

export const setUserStatus = status => ({
  type: statusActionTypes.setUserStatus,
  payload: status
});

export const setRoomStatus = status => ({
  type: statusActionTypes.setRoomStatus,
  payload: status
});

export const setPlotStatus = status => ({
  type: statusActionTypes.setPlotStatus,
  payload: status
});

export const setTableStatus = status => ({
  type: statusActionTypes.setTableStatus,
  payload: status
});

export const setCreate = status => ({
  type: statusActionTypes.setCreate,
  payload: status
});

export const setPrint = status => ({
  type: statusActionTypes.setPrint,
  payload: status
});

export const setEdit = status => ({
  type: statusActionTypes.setEdit,
  payload: status
});

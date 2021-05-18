import { statusActionTypes } from '../actions/status';

export const statusInitialStore = {
  user: false,
  room: false,
  plot: false,
  table: false,
  create: false,
  print: false,
  edit: false
};

export function statusReducer(state = statusInitialStore, action) {
  switch (action.type) {
    case statusActionTypes.setPlotStatus: {
      return { ...state, plot: action.payload };
    }
    case statusActionTypes.setTableStatus: {
      return { ...state, table: action.payload };
    }
    case statusActionTypes.setRoomStatus: {
      return { ...state, room: action.payload };
    }
    case statusActionTypes.setUserStatus: {
      return { ...state, user: action.payload };
    }
    case statusActionTypes.setCreate: {
      return { ...state, create: action.payload };
    }
    case statusActionTypes.setPrint: {
      return { ...state, print: action.payload };
    }
    case statusActionTypes.setEdit: {
      return { ...state, edit: action.payload };
    }
    default:
      return state;
  }
}

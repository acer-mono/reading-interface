import { editFormsActionTypes } from '../actions/editForms';

export const editFormsInitialStore = {
  user: '',
  room: ''
};

export function editFormsReducer(state = editFormsInitialStore, action) {
  switch (action.type) {
    case editFormsActionTypes.openUser: {
      return { ...state, user: action.payload };
    }
    case editFormsActionTypes.closeUser: {
      return { ...state, user: '' };
    }
    case editFormsActionTypes.openRoom: {
      return { ...state, room: action.payload };
    }
    case editFormsActionTypes.closeRoom: {
      return { ...state, room: '' };
    }
    default:
      return state;
  }
}

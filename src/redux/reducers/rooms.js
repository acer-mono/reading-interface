import { roomsActionTypes } from '../actions/rooms';

export const roomsInitialStore = {
  list: []
};

export function roomsReducer(state = roomsInitialStore, action) {
  switch (action.type) {
    case roomsActionTypes.loadList: {
      return { ...state, list: action.payload };
    }
    case roomsActionTypes.delete: {
      return {
        ...state,
        list: [...state.list.filter(el => el.id !== action.payload)]
      };
    }
    case roomsActionTypes.add: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }
    case roomsActionTypes.edit: {
      return {
        ...state,
        list: [
          ...state.list.map(item => {
            if (item.id === action.payload.id) {
              item.name = action.payload.name;
            }
            return item;
          })
        ]
      };
    }
    case roomsActionTypes.clearError: {
      return {
        ...state,
        error: ''
      };
    }
    case roomsActionTypes.setError: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
}

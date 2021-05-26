import { usersActionTypes } from '../actions/users';

export const usersInitialStore = {
  list: []
};

export function usersReducer(state = usersInitialStore, action) {
  switch (action.type) {
    case usersActionTypes.loadList: {
      return { ...state, list: action.payload };
    }
    case usersActionTypes.delete: {
      return {
        ...state,
        list: [...state.list.filter(el => el.id !== action.payload)]
      };
    }
    case usersActionTypes.add: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }
    case usersActionTypes.edit: {
      return {
        ...state,
        list: [
          ...state.list.map(item => {
            if (item.id === action.payload.id) {
              item.login = action.payload.login;
              item.isAdmin = action.payload.isAdmin;
            }
            return item;
          })
        ]
      };
    }
    case usersActionTypes.clearError: {
      return {
        ...state,
        error: ''
      };
    }
    case usersActionTypes.setError: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
}

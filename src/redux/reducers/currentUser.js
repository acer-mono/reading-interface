import { currentUserActionTypes } from '../actions/currentUser';

export const currentUserInitialStore = {
  user: {}
};

export function currentUserReducer(state = currentUserInitialStore, action) {
  switch (action.type) {
    case currentUserActionTypes.get: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
}

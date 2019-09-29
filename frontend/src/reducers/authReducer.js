import { AUTH_SET_CURRENT_USER } from "../constants/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case AUTH_SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: actions.isAuthenticated,
        user: actions.currentUser
      };
    }
    default:
      return state;
  }
}

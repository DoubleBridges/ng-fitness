import {AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return { ...state };

  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;

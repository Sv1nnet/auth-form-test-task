import { authTypes } from '../actions/types';
import cookie from 'js-cookie';

const refresh = cookie.get('refresh');
const initialState = {
  access: null,
  refresh: refresh || null,
};

const authReducer = (state = initialState, action) => {
  const { data, type } = action;
  switch (type) {
    case authTypes.SIGN_UP:
      return {
        state,
      };
    case authTypes.SIGN_IN:
      cookie.set('refresh', data.refresh);
      return {
        ...state,
        access: data.access,
        refresh: data.refresh,
      };
    case authTypes.JWT_REFRESH:
      cookie.set('refresh', data.refresh);
      return {
        ...state,
        access: data.access,
        refresh: data.refresh,
      };
    case authTypes.AUTH_ERROR:
    case authTypes.SIGN_OUT:
      cookie.remove('refresh');
      return {
        ...state,
        access: null,
        refresh: null,
      };
    default:
      return state;
  }

}

export default authReducer;

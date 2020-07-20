import { authTypes } from '../actions/types';
import cookie from 'js-cookie';

const refresh = cookie.get('refresh');
const access = cookie.get('access');

const initialState = {
  access: access || null,
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
      cookie.set('access', data.access);
      return {
        ...state,
        access: data.access,
        refresh: data.refresh,
      };
    case authTypes.JWT_REFRESH:
      cookie.set('refresh', data.refresh);
      cookie.set('access', data.access);
      return {
        ...state,
        access: data.access,
        refresh: data.refresh,
      };
    case authTypes.AUTH_ERROR:
    case authTypes.SIGN_OUT:
      cookie.remove('refresh');
      cookie.remove('access');
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

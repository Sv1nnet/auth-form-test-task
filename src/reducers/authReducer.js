import { authTypes } from '../actions/types';
import cookie from 'js-cookie';

const handleTokensInCookie = (type, data) => ({
  refresh: cookie[type]('refresh', data && data.refresh),
  access: cookie[type]('access', data && data.access),
})

const { refresh, access } = handleTokensInCookie('get');
const initialState = {
  access: (refresh && access) || null,
  refresh: refresh || null,
};

const authReducer = (state = initialState, action) => {
  const { data, type } = action;
  switch (type) {
    case authTypes.SIGN_IN:
    case authTypes.JWT_REFRESH:
      handleTokensInCookie('set', data)
      return {
        ...state,
        access: data.access,
        refresh: data.refresh,
      };
    case authTypes.AUTH_ERROR:
    case authTypes.SIGN_OUT:
      handleTokensInCookie('remove')
      return {
        ...state,
        access: null,
        refresh: null,
      };
    case authTypes.SIGN_UP:
    default:
      return state;
  }
}

export default authReducer;

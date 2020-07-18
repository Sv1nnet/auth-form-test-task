import auth from '../api';
import { authTypes } from './types';
import createErrorResponseObject from '../utils/createErrorResponseObject';

export const signup = (email, password) => (dispatch) => {
  return auth.signup({ email, password })
    .then((res) => {
      dispatch({ type: authTypes.SIGN_UP, data: res.data});
      return res;
    })
    .catch((err) => Promise.reject(
      dispatch({ type: authTypes.AUTH_ERROR, data: createErrorResponseObject(err) }).data,
    ));
}

export const signin = (email, password) => (dispatch) => {
  return auth.signin({ email, password })
    .then((res) => {
      dispatch({ type: authTypes.SIGN_IN, data: res.data});
      return res;
    })
    .catch((err) => Promise.reject(
      dispatch({ type: authTypes.AUTH_ERROR, data: createErrorResponseObject(err) }).data,
    ));
}

export const signout = () => (dispatch, getState) => {
  return auth.signout({ refresh: getState().auth.refresh })
    .then((res) => {
      dispatch({ type: authTypes.SIGN_OUT, data: res.data});
      return res;
    })
    .catch((err) => Promise.reject(
      dispatch({ type: authTypes.AUTH_ERROR, data: createErrorResponseObject(err) }).data,
    ));
}

export const refresh = () => (dispatch, getState) => {
  return auth.refresh({ value: getState().auth.refresh })
    .then((res) => {
      dispatch({ type: authTypes.JWT_REFRESH, data: res.data});
      return res;
    })
    .catch((err) => Promise.reject(
      dispatch({ type: authTypes.AUTH_ERROR, data: createErrorResponseObject(err) }).data,
    ));
}

export default {
  signup,
  signin,
  signout,
  refresh,
}

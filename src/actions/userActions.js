import api from '../api';
import { userTypes } from './types';
import createErrorResponseObject from '../utils/createErrorResponseObject';

export const getUserList = (token) => (dispatch, getState) => {
  return api.userList(getState().auth.refresh)
    .then((res) => {
      dispatch({ type: userTypes.GET_LIST, data: res.data});
      return res;
    })
    .catch((err) => Promise.reject(
      dispatch({ type: userTypes.ERROR, data: createErrorResponseObject(err) }).data,
    ));
}

export default {
  getUserList,
}

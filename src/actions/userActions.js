import api from '../api';
import { userTypes } from './types';
import createErrorResponseObject from '../utils/createErrorResponseObject';

export const getUserList = () => async (dispatch, getState) => {
  return api.userList(getState().auth.access)
    .then((res) => {
      dispatch({ type: userTypes.GET_LIST, data: res.data });
      return res;
    })
    .catch((err) => Promise.reject(
      dispatch({ type: userTypes.GET_CONTENT_ERROR, data: createErrorResponseObject(err) }).data,
    ));
}

export default {
  getUserList,
}

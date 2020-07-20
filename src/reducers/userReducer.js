import { userTypes } from '../actions/types';
const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  const { data, type } = action;
  switch (type) {
    case userTypes.GET_LIST:
      return {
        ...state,
        users: data,
      };
    case userTypes.GET_CONTENT_ERROR:
    default:
      return state;
  }

}

export default userReducer;

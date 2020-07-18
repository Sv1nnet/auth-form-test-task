import { userTypes } from '../actions/types';
const initialState = {
  users: [],
};

const authReducer = (state = initialState, action) => {
  const { data, type } = action;
  switch (type) {
    case userTypes.GET_LIST:
      return {
        ...state,
        users: data,
      };
    case userTypes.ERROR:
    default:
      return state;
  }

}

export default authReducer;

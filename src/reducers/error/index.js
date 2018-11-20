import { GET_DATA_FAILURE } from '../../actionTypes';

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DATA_FAILURE:
      return [...state, action.error];
    default:
      return state;
  }
};

export default errorReducer;

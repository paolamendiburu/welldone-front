import { GET_DATA_REQUEST } from '../../actionTypes';

const loadingReducer = (state = {}, action) => {
  const { field, value } = action;
  switch (action.type) {
    case GET_DATA_REQUEST:
      return { ...state, [field]: value };
    default:
      return state;
  }
};

export default loadingReducer;

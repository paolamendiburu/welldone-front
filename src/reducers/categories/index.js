import { GET_CATEGORIES_SUCCESS } from '../../actionTypes';

const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default categoriesReducer;

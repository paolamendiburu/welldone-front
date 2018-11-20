import { SET_PAGINATION } from '../../actionTypes';

const paginationReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PAGINATION:
      return action.pageData;
    default:
      return state;
  }
};

export default paginationReducer;

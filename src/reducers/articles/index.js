import { GET_ARTICLES_SUCCESS } from '../../actionTypes';

const articlesListReducer = (state = [], action) => {
  const newArt = action.payload;
  switch (action.type) {
    case GET_ARTICLES_SUCCESS:
      return action.method === 'All'
        ? action.payload
        : action.method === 'page'
          ? [...state, ...newArt]
          : [...state, { ...newArt }];
    default:
      return state;
  }
};

export default articlesListReducer;

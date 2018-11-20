import {
  GET_FAVORITES_SUCCESS,
  MARK_AS_FAVORITE_ARTICLE,
  REMOVE_FAVORITE
} from '../../actionTypes';

const favoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FAVORITES_SUCCESS:
      return action.payload;
    case MARK_AS_FAVORITE_ARTICLE:
      return action.newFavorite;
    case REMOVE_FAVORITE:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }
};

export default favoritesReducer;

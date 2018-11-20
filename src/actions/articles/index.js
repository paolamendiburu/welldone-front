import * as types from '../../actionTypes';

export const getDataRequest = (value, field) => ({
  type: types.GET_DATA_REQUEST,
  value,
  field
});

export const getArticlesSuccess = (payload, method) => ({
  type: types.GET_ARTICLES_SUCCESS,
  payload,
  method
});

export const getCategoriesSuccess = (payload, method) => ({
  type: types.GET_CATEGORIES_SUCCESS,
  payload,
  method
});

export const getCommentsSuccess = (payload, method) => ({
  type: types.GET_COMMENTS_SUCCESS,
  payload,
  method
});

export const getDataFailure = error => ({
  type: types.GET_DATA_FAILURE,
  error
});

export const getUsersSuccess = (payload, method) => ({
  type: types.GET_USERS_SUCCESS,
  payload,
  method
});

export const getFavoritesSuccess = (payload, method) => ({
  type: types.GET_FAVORITES_SUCCESS,
  payload,
  method
});

export const postNewComment = newComment => ({
  type: types.POST_NEW_COMMENT,
  newComment
});

export const setPagination = pageData => ({
  type: types.SET_PAGINATION,
  pageData
});

export const addFavorite = newFavorite => ({
  type: types.MARK_AS_FAVORITE_ARTICLE,
  newFavorite
});

export const removeFavorite = payload => ({
  type: types.REMOVE_FAVORITE,
  payload
});

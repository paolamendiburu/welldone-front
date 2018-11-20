import * as actions from '../actions';
import axios from 'axios';
import { toast } from 'react-toastify';

// connection settings
const myApi = axios.create({
  baseURL: `${process.env.REACT_APP_REST_API_LOCATION}`,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});
// set token in header
const setToken = (state, dispatch) => {
  try {
    const token = state.user.data[0].token;
    if (typeof token === 'undefined' || token === null) {
      throw new SyntaxError('You must be logged in to do this');
    }
    myApi.defaults.headers.common['Authorization'] = `Token ${token}`;
    return true;
  } catch (err) {
    dispatch(actions.getDataFailure(err));
    return toast.error('You must be logged in to do this');
  }
};
export const deleteItem = (field, data, page, order, rerender) => {
  return (dispatch, getState) => {
    // check if we have a token and set it to headers
    if (!setToken(getState(), dispatch)) {
      toast.error('No token or invalid token');
      return;
    }
    // notify we are starting an action
    dispatch(actions.getDataRequest(true, field));
    // post the data and apply reducer
    myApi.delete(`${field}/${data}`).then(
      res => {
        if (res.status === 201) {
          toast.success(`Item ${res.data.id} deleted!!`);
        }
        if (field === 'favorites') {
          dispatch(actions.getDataRequest(false, field));
          dispatch(actions.getData('favorites', 'favorites', 'add'));
          if (rerender) {
            dispatch(
              actions.getMyArticles(
                `my-favorites/?page=${page}&ordering=${order}`,
                'page'
              )
            );
          }
        }
      },
      err => {
        toast.error(err.response.data.detail || err);
        dispatch(actions.getDataRequest(false, field));
        dispatch(actions.getDataFailure(err));
      }
    );
  };
};
// post an item to a specific field
export const postItem = (field, data) => {
  return (dispatch, getState) => {
    // check if we have a token and set it to headers
    if (!setToken(getState(), dispatch)) {
      toast.error('No token or invalid token');
      return;
    }
    // notify we are starting an action
    dispatch(actions.getDataRequest(true, field));
    // post the data and apply reducer
    myApi.post(`${field}/`, data).then(
      res => {
        if ((res.status === 201) & (field !== 'favorites')) {
          toast.success(`Item ${res.data.id} created!!`);
        }
        if (field === 'comments') {
          dispatch(actions.postNewComment(res.data));
          dispatch(actions.getDataRequest(false, field));
        }
        if (field === 'favorites') {
          const newData = {
            favorite_article: res.data.article,
            owner: res.data.owner,
            id: res.data.id
          };
          const favs = getState().favorites;
          if (favs[newData.favorite_article]) {
            favs[newData.favorite_article] = [
              ...favs[newData.favorite_article],
              newData
            ];
          } else {
            favs[newData.favorite_article] = [newData];
          }
          dispatch(actions.addFavorite(favs));
          dispatch(actions.getDataRequest(false, field));
        }
      },
      err => {
        toast.error(err.response.data.detail || err);
        dispatch(actions.getDataRequest(false, field));
        dispatch(actions.getDataFailure(err));
      }
    );
  };
};

export const getMyArticles = (query, method) => {
  const field = 'articles';
  return async (dispatch, getState) => {
    if (!setToken(getState(), dispatch)) {
      return;
    }
    dispatch(actions.getDataRequest(true, field));
    const { error, data } = await myApi.get(`${query}`);
    if (!error) {
      const { results, ...rest } = data;
      const selected = [];
      results.forEach(item => selected.push(item.slug));
      const restNew = { ...rest, selected };
      dispatch(actions.setPagination(restNew));
      if (method === 'page') {
        // const newItems = results.filter(
        //   result =>
        //     !getState().articles.find(
        //       article => article.articleid === result.articleid
        //     )
        // );
        // dispatch(actions.getArticlesSuccess(newItems, method));
        dispatch(actions.getArticlesSuccess(results, 'All'));
        dispatch(actions.getDataRequest(false, field));
      } else {
        dispatch(actions.getArticlesSuccess(data.results, method));
        dispatch(actions.getDataRequest(false, field));
        return data.results;
      }
    } else {
      toast.error(error);
      dispatch(actions.getDataFailure(error));
    }
  };
};

export const getData = (query, field, method) => {
  console.log('getting data: ' + field + ' ' + method);
  return (dispatch, getState) => {
    dispatch(actions.getDataRequest(true, field));
    myApi.get(`${query}`).then(
      res => {
        if (field === 'articles') {
          // set pagination data
          const { results, ...rest } = res.data;
          const selected = [];
          results.forEach(item => selected.push(item.slug));
          const restNew = { ...rest, selected };
          dispatch(actions.setPagination(restNew));
          if (method === 'page') {
            // add only new articles to article list
            // const newItems = results.filter(
            //   result =>
            //     !getState().articles.find(
            //       article => article.articleid === result.articleid
            //     )
            // );
            // dispatch(actions.getArticlesSuccess(newItems, method));
            dispatch(actions.getArticlesSuccess(results, 'All'));
            dispatch(actions.getDataRequest(false, field));
          } else {
            dispatch(actions.getArticlesSuccess(res.data.results, method));
            dispatch(actions.getDataRequest(false, field));
            return res.data.results;
          }
        } else if (field === 'categories') {
          dispatch(actions.getCategoriesSuccess(res.data, method));
          dispatch(actions.getDataRequest(false, field));
          return res.data;
        } else if (field === 'users') {
          dispatch(actions.getUsersSuccess(res.data, method));
          dispatch(actions.getDataRequest(false, field));
          return res.data;
        } else if (field === 'comments') {
          dispatch(actions.getCommentsSuccess(res.data, method));
          dispatch(actions.getDataRequest(false, field));
          return res.data;
        } else if (field === 'favorites') {
          const newData = res.data.reduce((acc, data) => {
            if (acc[data.favorite_article]) {
              acc[data.favorite_article] = [
                ...acc[data.favorite_article],
                data
              ];
            } else {
              acc[data.favorite_article] = [data];
            }
            return acc;
          }, {});
          dispatch(actions.getFavoritesSuccess(newData, method));
          dispatch(actions.getDataRequest(false, field));
          return res.data;
        }
      },
      err => {
        dispatch(actions.getDataFailure(err));
        dispatch(actions.getDataRequest(false, field));
      }
    );
  };
};

// ArticleDetails: fetchItem -> shouldFetchSingleItem -> getItem
// 1. we check if the item should be fetched
// 2. we fetch the item
export const fetchItem = (field, itemId) => {
  return (dispatch, getState) => {
    if (shouldFetchSingleItem(getState(), field, itemId)) {
      console.log('dispatching getItem');
      return dispatch(getItem(field, itemId));
    }
  };
};

// we check if the item should be fetched or if it is already in state
const shouldFetchSingleItem = (state, field, itemId) => {
  if (!state[field].length) return true;
  const items =
    field === 'articles'
      ? state.articles.find(article => article.slug === itemId)
      : field === 'comments'
        ? state.comments.find(comment => comment.id === itemId)
        : field === 'users'
          ? state.users.find(user => user.username === itemId)
          : field === 'categories'
            ? state.categories.find(category => category.name === itemId)
            : true;
  if (!items) {
    return true;
  } else {
    return false;
  }
};

// we fetch the item and save it in state
const getItem = (field, itemId) => {
  return dispatch => {
    dispatch(actions.getDataRequest(true, field));
    console.log('dispatching data request');
    return myApi.get(`${field}/${itemId}`).then(
      response => {
        if (field === 'articles') {
          dispatch(actions.getArticlesSuccess(response.data, 'add'));
          dispatch(actions.getDataRequest(false, field));
        } else if (field === 'categories') {
          dispatch(actions.getCategoriesSuccess(response.data, 'add'));
          dispatch(actions.getDataRequest(false, field));
        } else if (field === 'users') {
          dispatch(actions.getUsersSuccess(response.data, 'add'));
          dispatch(actions.getDataRequest(false, field));
        } else if (field === 'comments') {
          dispatch(actions.getCommentsSuccess(response.data, 'add'));
          dispatch(actions.getDataRequest(false, field));
        } else if (field === 'favorites') {
          dispatch(actions.getFavoritesSuccess(response.data, 'add'));
          dispatch(actions.getDataRequest(false, field));
        }
      },
      err => {
        dispatch(actions.getDataFailure(err));
      }
    );
  };
};

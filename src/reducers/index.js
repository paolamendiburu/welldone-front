import { combineReducers } from 'redux';

import user from './user';
import comments from './comments';
import categories from './categories';
import users from './users';
import articles from './articles';
import errors from './error';
import loading from './loading';
import pagination from './pagination';
import favorites from './favorites';

export default combineReducers({
  user,
  comments,
  articles,
  errors,
  categories,
  users,
  loading,
  pagination,
  favorites
});

export const getArticleFavorites = (store, props) => {
  return store.filter(item => item.favorite_article === props);
};

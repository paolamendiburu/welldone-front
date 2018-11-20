import React from 'react';
import { Route } from 'react-router-dom';
import {
  Account,
  NewArticle,
  MyArticles,
  Highlight,
  MyFavorites
} from '../../../scenes';

const ContentAdmin = () => (
  <div id="page-admin">
    <Route
      exact
      path="/admin/MyArticles"
      component={MyArticles}
      activeClassName="active"
    />
    <Route
      exact
      path="/admin/MyFavorites"
      component={MyFavorites}
      activeClassName="active"
    />
    <Route
      exact
      path="/admin/account"
      component={Account}
      activeClassName="active"
    />
    <Route
      exact
      path="/admin/new-article"
      component={NewArticle}
      activeClassName="active"
    />
    <Route
      exact
      path="/admin/highlights"
      component={Highlight}
      activeClassName="active"
    />
  </div>
);

export default ContentAdmin;

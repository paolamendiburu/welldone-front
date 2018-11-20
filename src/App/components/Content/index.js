import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Auth,
  Admin,
  Home,
  ArticleDetails,
  RecoverPassword,
  UpdatePassword,
  NotFound
} from '../../../scenes';

const Content = () => (
  <div className="main-page">
    <Switch>
      <Route exact path="/" render={props => <Home menu="all" {...props} />} />
      <Route
        exact
        path="/category"
        render={props => <Home menu="category" {...props} />}
      />
      <Route
        exact
        path="/my-articles"
        render={props => <Home menu="my-articles" {...props} />}
      />
      <Route
        exact
        path="/my-favorites"
        render={props => <Home menu="my-favorites" {...props} />}
      />
      <Route
        exact
        path="/user"
        render={props => <Home menu="user" {...props} />}
      />
      <Route exact path="/recover-password" component={RecoverPassword} />
      <Route
        exact
        path="/update-password/:token/:id"
        component={UpdatePassword}
      />
      <Route exact path="/register" component={Auth} />
      <Route exact path="/login" component={Auth} />
      <Route path="/admin" render={() => <Admin />} />
      <Route
        exact
        path="/category/:item"
        render={props => <Home menu="category" {...props} />}
      />
      <Route
        exact
        path="/user/:item"
        render={props => <Home menu="user" {...props} />}
      />
      <Route
        exact
        path="/:username/:slug"
        component={props => <ArticleDetails {...props} />}
      />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Content;

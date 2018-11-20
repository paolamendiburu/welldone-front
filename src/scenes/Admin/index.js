import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import { ContentAdmin } from './../../App/components';

import { userReset, userSaveData } from '../../actions';
import { translate } from 'react-i18next';

import './style.css';

class Admin extends Component {
  render() {
    if (this.props.data[0].isLogged === false) {
      return <Redirect to="/register" />;
    }

    return (
      <div className="admin-container">
        <div className="admin-nav">
          <NavLink to="/admin/new-article">
            {this.props.t('Admin menu.Write article')}
          </NavLink>
          <div>
            <NavLink to="/admin/MyArticles">
              {this.props.t('Admin menu.Articles')}
            </NavLink>
            <NavLink to="/admin/MyFavorites">
              {this.props.t('Admin menu.Favourites')}
            </NavLink>
            <NavLink to="/admin/highlights">
              {this.props.t('Admin menu.Underlines')}
            </NavLink>
            <NavLink to="/admin/notification">
              {this.props.t('Admin menu.Notifications')}
            </NavLink>
            <NavLink to="/admin/account">
              {this.props.t('Admin menu.Account')}
            </NavLink>
          </div>
        </div>
        <ContentAdmin />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.user.data
});

const mapDispatchToProps = {
  userReset,
  userSaveData
};

export default translate('translations')(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Admin)
);

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu, Button } from 'semantic-ui-react';
import SearchBar from '../../SearchBar';
import styled from 'styled-components';
import { translate } from 'react-i18next';

const MenuGroup = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 0px;
  grid-template-columns: auto;
  padding-top: 0px;
  background: black;
  justify-items: center;
  align-items: center;
  padding-bottom: 0px;
  padding-left: 0px;
  margin: 0px;
  grid-template-areas: 'Filter1' 'Filter2' 'Sort1' 'SearchB';

  @media (min-width: 676px) {
    grid-template-columns: auto-fill auto-fill;
    grid-template-areas: 'Filter1 Filter1' 'Filter2 Filter2' 'Sort1 SearchB';
  }

  @media (min-width: 950px) {
    grid-template-columns: 400px 1fr;
    grid-template-areas:
      'Filter1 Filter2'
      'Sort1 SearchB';
  }
  @media (min-width: 1400px) {
    grid-template-columns: 450px 375px 255px 1fr;
    grid-template-areas: 'Filter1 Filter2 Sort1 SearchB';
  }
`;

const Area1 = styled.span`
  grid-area: Filter1;
  padding-left: 5px;
  padding-right: 5px;
`;

const Area2 = styled.span`
  grid-area: Filter2;
  padding-left: 5px;
  padding-right: 5px;
`;
const Area3 = styled.span`
  grid-area: Sort1;
  padding-left: 5px;
  padding-right: 5px;
`;
const Area4 = styled.span`
  grid-area: SearchB;
  padding-left: 5px;
  padding-right: 5px;
  justify-self: right;
  @media (max-width: 676px) {
    justify-self: center;
  }
`;
class ArticleMenu extends React.Component {
  render(props) {
    const { menu, user, order, orderOld, orderNew, t } = this.props;
    return (
      <MenuGroup>
        <Area1>
          <Menu inverted size="large">
            <Menu.Item header color="blue" active={true}>
              {t('MenuBar.Filter Articles by')}
            </Menu.Item>
            <Menu.Item
              as={Link}
              name={t('MenuBar.All')}
              color="red"
              active={menu === 'all'}
              to="/"
            />
            <Menu.Item
              as={Link}
              name="User"
              color="green"
              active={menu === 'user'}
              to="/user"
            >
              <Icon name="user" />
              {t('MenuBar.User')}
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="Category"
              color="orange"
              active={menu === 'category'}
              to="/category"
            >
              <Icon name="tags" />
              {t('MenuBar.Category')}
            </Menu.Item>
          </Menu>
        </Area1>
        <Area2>
          <Menu inverted fluid size="large">
            {user &&
              user.data[0].token && (
                <Menu.Item
                  as={Link}
                  name="MyArticles"
                  color="teal"
                  active={menu === 'my-articles'}
                  to="/my-articles"
                >
                  <Icon name="write" />
                  {t('MenuBar.My Articles')}
                </Menu.Item>
              )}
            {user &&
              user.data[0].token && (
                <Menu.Item
                  as={Link}
                  name="MyFavorites"
                  color="yellow"
                  active={menu === 'my-favorites'}
                  to="/my-favorites"
                >
                  <Icon name="star" />
                  {t('MenuBar.My Favorites')}
                </Menu.Item>
              )}
          </Menu>
        </Area2>
        <Area3>
          <Menu inverted size="large">
            <Menu.Item header color="blue" active={true}>
              {t('MenuBar.Order by')}
            </Menu.Item>
            <Menu.Item
              as={Button}
              name="Asc"
              color="green"
              active={order === 'publish_date'}
              onClick={orderOld}
            >
              <Icon name="arrow up" />
              {t('MenuBar.Old')}
            </Menu.Item>
            <Menu.Item
              as={Button}
              name="Desc"
              color="red"
              active={order === '-publish_date'}
              onClick={orderNew}
            >
              <Icon name="arrow down" />
              {t('MenuBar.New')}
            </Menu.Item>
          </Menu>
        </Area3>
        <Area4>
          <Menu inverted size="large">
            <Menu.Item color="blue" active={true}>
              <SearchBar history={this.props.history} />
            </Menu.Item>
          </Menu>
        </Area4>
      </MenuGroup>
    );
  }
}

export default translate('translations')(ArticleMenu);

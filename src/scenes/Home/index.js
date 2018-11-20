import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LastArticles from '../../App/components/LastArticles';
import * as actionCreators from '../../actions';
import LoadingComponent from '../../App/components/LoadingComponent';
import ArticleMenu from '../../App/components/ArticleMenu';
import { translate } from 'react-i18next';
import {
  Container,
  Divider,
  Segment,
  Button,
  Pagination,
  Label,
  Icon,
  Header
} from 'semantic-ui-react';
import styled from 'styled-components';

const Block = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-auto-flow: row;
  grid-row-gap: 10px;
  justify-items: center;
  align-items: center;
`;

const PageBlock = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-flow: row;
  grid-row-gap: 10px;
  justify-items: center;
  align-items: center;
`;
class Home extends React.Component {
  state = {
    page: 1,
    initialLoading: true,
    unauthorized: false,
    order: '-publish_date'
  };

  async componentDidMount() {
    document.body.style.overflow = 'auto';
    await this.getArticles(this.state.page, 'All');
    this.props.pagination &&
      this.props.articles &&
      this.setState({ initialLoading: false });
  }

  componentWillUpdate(nextProps) {
    return this.props.favorites !== nextProps.favorites;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.url !== prevProps.match.url) {
      this.setState({ page: 1 });
      this.getArticles(this.state.page, 'page');
    } else if (
      this.state.page !== prevState.page ||
      this.state.order !== prevState.order
    ) {
      this.getArticles(this.state.page, 'page');
    }
  }

  getAll = (page, type, order) => {
    this.props.actions.getData(
      `articles/?page=${page}&ordering=${order}`,
      'articles',
      type,
      page
    );
  };

  getMine = (page, type, order) => {
    if (this.props.user.data[0].token) {
      this.props.actions.getMyArticles(
        `my-articles/?page=${page}&ordering=${order}`,
        type
      );
    } else this.setState({ unauthorized: true });
  };

  getMyFav = (page, type, order) => {
    if (this.props.user.data[0].token) {
      this.props.actions.getMyArticles(
        `my-favorites/?page=${page}&ordering=${order}`,
        type
      );
    } else this.setState({ unauthorized: true });
  };

  getByUser = (x, page, type, order) => {
    return this.props.actions.getData(
      `articles/?owner__username=${x}&page=${page}&ordering=${order}`,
      'articles',
      type,
      page
    );
  };
  getByCat = (y, page, type, order) => {
    this.props.actions.getData(
      `articles/?category__name=${y}&page=${page}&ordering=${order}`,
      'articles',
      type,
      page
    );
  };

  getArticles = (page, type) => {
    const menu = this.props.menu;
    const match = this.props.match;
    const order = this.state.order;
    if (menu === 'user' && match) {
      this.getByUser(match.params.item, page, type, order);
    } else if (menu === 'category' && match) {
      this.getByCat(match.params.item, page, type, order);
    } else if (menu === 'my-articles' && match) {
      this.getMine(page, type, order);
    } else if (menu === 'my-favorites' && match) {
      this.getMyFav(page, type, order);
    } else {
      this.getAll(page, type, order);
    }
  };

  handlePaginationChange = (e, { activePage }) => {
    e.preventDefault();
    this.setState({ page: activePage });
  };

  orderNew = () => {
    this.setState({ order: '-publish_date' });
  };

  orderOld = () => {
    this.setState({ order: 'publish_date' });
  };

  toggleFavorite = (e, { item, marked, idmarked }) => {
    e.preventDefault();
    if (!marked && this.props.user.data[0].token) {
      let data = { article: item };
      this.props.actions.postItem('favorites', JSON.stringify(data));
    }
    const myFavTab = this.props.location.pathname === '/my-favorites';
    if (marked && this.props.user.data[0].token) {
      let data = idmarked;
      this.props.actions.deleteItem(
        'favorites',
        JSON.stringify(data),
        this.state.page,
        this.state.order,
        myFavTab
      );
    }
  };

  render() {
    if (this.state.unauthorized)
      return (
        <Segment placeholder>
          <Header icon>
            <Icon name="bullhorn" />
            Please log in to do that !!
          </Header>
        </Segment>
      );
    if (this.state.initialLoading) return <LoadingComponent inverted={true} />;
    const {
      menu,
      match,
      pagination,
      articles,
      loading,
      favorites,
      user,
      t
    } = this.props;
    // build items for user and category submenus
    const fill =
      menu === 'user'
        ? this.props.users
        : menu === 'category'
          ? this.props.categories
          : '';

    const items = Object.values(fill).map(
      item =>
        menu === 'user' ? item.username : menu === 'category' ? item.name : null
    );

    const selectedArticles = [];
    pagination.selected &&
      loading['articles'] === false &&
      pagination.selected.forEach(item =>
        selectedArticles.push(articles.find(article => article.slug === item))
      );

    // identify list of articles to display
    // 1. Option 'all' -> all articles from source. Check list to display: current page? if article exists: ok. if not, fetch.
    // 2. Option 'user' -> filter according to user
    // 3. Option 'category' -> filter according to category

    return (
      <Container fluid>
        <Divider hidden />
        <ArticleMenu
          menu={menu}
          user={this.props.user}
          orderOld={this.orderOld}
          orderNew={this.orderNew}
          order={this.state.order}
          history={this.props.history}
        />
        <Divider hidden />
        <Block>
          {items.map(item => (
            <Button
              as={Link}
              to={`/${menu}/${item}`}
              color={match && item === match.params.item ? 'blue' : 'grey'}
              active={match && item === match.params.item}
              content={item}
              key={item}
            />
          ))}
        </Block>
        {items.length > 0 && <Divider hidden />}
        <Segment>
          <LastArticles
            comments={this.props.comments}
            articles={selectedArticles}
            loading={loading}
            favorites={favorites}
            user={user.data[0].username}
            toggleFavorite={this.toggleFavorite}
          />
        </Segment>
        {this.props.pagination.count > 0 &&
          !this.props.loading['articles'] &&
          !this.props.loading['favorites'] && (
            <PageBlock>
              <Pagination
                totalPages={this.props.pagination.total_pages}
                firstItem={t('MenuBar.First')}
                lastItem={t('MenuBar.Last')}
                boundaryRange={2}
                siblingRange={2}
                onPageChange={this.handlePaginationChange}
                activePage={this.state.page}
                color="blue"
                inverted
                size="large"
              />
              <Label color="blue" size="big">
                <Icon name="list" />
                {t('MenuBar.Articles')}:
                <Label.Detail color="red">
                  {this.props.pagination.count}
                </Label.Detail>
              </Label>
            </PageBlock>
          )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  categories: state.categories,
  users: state.users,
  comments: state.comments,
  loading: state.loading,
  error: state.errors,
  user: state.user,
  pagination: state.pagination,
  favorites: state.favorites
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default translate('translations')(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);

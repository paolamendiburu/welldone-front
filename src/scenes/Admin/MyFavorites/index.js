import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container,
  Divider,
  Segment,
  Pagination,
  Label,
  Icon,
  Header
} from 'semantic-ui-react';
import styled from 'styled-components';
import LastArticles from '../../../App/components/LastArticles';
import * as actionCreators from '../../../actions';
import LoadingComponent from '../../../App/components/LoadingComponent';

const PageBlock = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-flow: row;
  grid-row-gap: 10px;
  justify-items: center;
  align-items: center;
`;

class MyFavorites extends Component {
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

  getArticles = (page, type) => {
    const order = this.state.order;
    this.getMyFav(page, type, order);
  };

  getMyFav = (page, type, order) => {
    if (this.props.user.data[0].token) {
      this.props.actions.getMyArticles(
        `my-favorites/?page=${page}&ordering=${order}`,
        type
      );
    } else this.setState({ unauthorized: true });
  };

  handlePaginationChange = (e, { activePage }) => {
    e.preventDefault();
    this.setState({ page: activePage });
  };

  toggleFavorite = (e, { item, marked, idmarked }) => {
    e.preventDefault();
    if (!marked && this.props.user.data[0].token) {
      let data = { article: item };
      this.props.actions.postItem('favorites', JSON.stringify(data));
    }
    const myFavTab = this.props.location.pathname === '/admin/MyFavorites';
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
    const { pagination, articles, loading, favorites, user } = this.props;

    const selectedArticles = [];
    pagination.selected &&
      loading['articles'] === false &&
      pagination.selected.forEach(item =>
        selectedArticles.push(articles.find(article => article.slug === item))
      );

    return (
      <Container fluid>
        <Divider hidden />
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
                firstItem={'First'}
                lastItem={'Last'}
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
                Articles:
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFavorites);

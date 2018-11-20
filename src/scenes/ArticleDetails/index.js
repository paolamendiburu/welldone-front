import React from 'react';
import Details from '../../App/components/Details';
import { connect } from 'react-redux';
import { fetchItem } from '../../actions';

class ArticleDetails extends React.Component {
  render() {
    this.props.fetchItem('articles', this.props.match.params.slug);
    const article = this.props.articles.findIndex(
      x => x.slug === this.props.match.params.slug
    );
    return (
      <Details
        article={this.props.articles[article]}
        user={this.props.user}
        key={article}
        i={article}
        history={this.props.history}
      />
    );
  }
}

const mapDispatchToProps = {
  fetchItem
};
const mapStateToProps = state => {
  return { articles: state.articles, user: state.user.data };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetails);

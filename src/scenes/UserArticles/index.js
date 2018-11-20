import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import LastArticles from '../../App/components/LastArticles';
class UserArticles extends React.Component {
  state = {
    articles: [],
    username: ''
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    this.getArticles(username);
  }
  getArticles = async username => {
    try {
      const result = await axios.get(
        `${
          process.env.REACT_APP_REST_API_LOCATION
        }articles/?username=${username}`
      );
      this.setState({
        articles: result.data,
        username: username
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <h2>Artículos de {this.state.username}:</h2>
        </div>

        <LastArticles
          articles={this.state.articles}
          comments={this.props.comments}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(UserArticles);

import React from 'react';
import { Icon, Menu, Input, Button, Search } from 'semantic-ui-react';
import _ from 'lodash';
import axios from 'axios';
import { toast } from 'react-toastify';

const myApi = axios.create({
  baseURL: `${process.env.REACT_APP_REST_API_LOCATION}`,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});
class SearchBar extends React.Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ loader: false, results: [], value: '' });

  getInfo = async re => {
    const { error, data } = await myApi.get(`/search-bar/?search=${re}`);
    this.setState({ loader: false, results: data });
    if (error) {
      toast.error(error);
    }
  };

  resultRenderer = ({
    slug,
    owner,
    title,
    introduction,
    publish_date,
    status
  }) => [
    slug && <div className="category" />,
    <div className="content">
      {owner && <div className="price">{owner}</div>}
      {title && <div className="title">{title.toUpperCase()}</div>}
      {introduction && <div className="description">{introduction}</div>}
      {status && <div className="price">{status}</div>}
      {publish_date && (
        <div className="name">{new Date(publish_date).toDateString()}</div>
      )}
    </div>
  ];

  handleResultSelect = (e, { result }) =>
    this.props.history.push(`${result.owner}/${result.slug}`);

  handleSearchChange = (e, { value }) => {
    console.log(e, value);
    this.setState({ loader: true, value });
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      this.getInfo(this.state.value);
    }, 1000);
  };
  render() {
    const { loader, value, results } = this.state;
    return (
      <Input
        as={Search}
        loading={loader}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={results}
        resultRenderer={this.resultRenderer}
        value={value}
      />
    );
  }
}

export default SearchBar;

import React, { Component } from 'react';
import axios from "axios/index";
import { Link } from 'react-router-dom';

class Article extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            isLoadding: false,
            error: null,
            article : '',
        })
    }

    componentDidMount(){
        this.setState({ isLoading: true });
        axios.get(process.env.REACT_APP_REST_API_LOCATION+'articles/?slug='+this.props.slug)
            .then(response => {
                if (response) {
                    return response.data;
                } else {
                    throw new Error('Algo a ido mal...');
                }
            })
            .then(data => {
                this.setState({ article: data.results[0], isLoading: false });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    };


    render() {
        const { isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
                <Link to={`/${this.state.article.owner}/${this.state.article.slug}`}><h2>{this.state.article.title}</h2></Link>
                <div className="hightlight__text">
                    {this.props.content}
                </div>
                <div className="owner">{this.state.article.owner}</div>
            </div>
        )
    }
};


export default Article;
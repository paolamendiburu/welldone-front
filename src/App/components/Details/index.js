import React from 'react';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import Comments from '../Comments';
import AnswerArticle from '../AnswerArticle';
import Highlight from '../Highlight';

const Details = props => {
  const article = props.article;

  let media;
  if (article.image) {
    media = article.image;
  } else {
    media = 'https://source.unsplash.com/random';
  }
  if (article) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-xs-12" />
          <div className="col-md-8 col-md-offset-2 col-xs-12">
            <div className="mainheading">
              <h1 className="posttitle">{article.title}</h1>
            </div>
            <img className="featured-image img-fluid" src={media} alt="" />
            <Highlight
              articlePost={renderHTML(article.full_text)}
              articleId={article.slug}
            />
            <div className="metafooter">
              <span className="meta-footer-thumb">
                <img
                  className="author-thumb"
                  src="/images/no-profile.png"
                  alt={article.title}
                />
              </span>
              <span className="author-meta">
                <span className="post-name">
                  <Link key={article.owner} to={`/user/${article.owner}`}>
                    {article.owner}
                  </Link>
                </span>
                <br />
                <span className="post-date">
                  {new Date(article.publish_date).toDateString()}
                </span>
                <br />
              </span>
              <span className="after-post-tags pull-right">
                <ul className="tags">
                  {article.category.map(cat => {
                    return (
                      <li key={cat}>
                        <Link to={`/category/${cat}`}>{cat}</Link>
                      </li>
                    );
                  })}
                </ul>
              </span>
            </div>
          </div>
        </div>
        <AnswerArticle articleId={article.slug} />
        <Button
          content="Back"
          icon="left arrow"
          labelPosition="left"
          color="red"
          onClick={props.history.goBack}
        />

        <Comments slug={article.slug} />
      </div>
    );
  } else {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="bomb" />
          SORRY! ARTICLE NOT FOUND !!
        </Header>
      </Segment>
    );
  }
};
export default Details;

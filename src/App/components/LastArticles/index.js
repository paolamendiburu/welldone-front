import React from 'react';
import ArticleCard from '../ArticleCard';
import styled from 'styled-components';
import LoadingComponent from '../LoadingComponent';
import { Segment } from 'semantic-ui-react';

const Posts = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  padding-top: 20px;
  align-self: center;
  padding-right: 10px;
  padding-left: 10px;
  width: 100%;
`;

const LastArticles = props => {
  if (
    props.loading['articles'] ||
    props.loading['comments'] ||
    props.loading['favorites'] ||
    props.loading['categories']
  )
    return (
      <div className="container">
        <Segment placeholder>
          <LoadingComponent inverted={true} />
        </Segment>
      </div>
    );
  if (!props.articles.length) {
    return <div className="container">Ningun artículo encontrado</div>;
  }
  console.log('articles: ');
  console.log(props.articles);
  return (
    <Posts className="recent-posts">
      {props.articles.map(article => {
        return (
          <ArticleCard
            loading={props.loading}
            article={article}
            key={article.slug}
            i={article.slug}
            comments={
              props.comments &&
              props.comments.filter(comment => article.slug === comment.article)
            }
            toggleFavorite={props.toggleFavorite}
          />
        );
      })}
    </Posts>
  );
};

export default LastArticles;

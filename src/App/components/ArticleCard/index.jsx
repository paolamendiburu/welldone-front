import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Label, Image, Header } from 'semantic-ui-react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import LoadingComponent from '../LoadingComponent';
import { translate } from 'react-i18next';
import { getArticleFavorites } from '../../../reducers';

import {
  Block,
  Photo,
  Title,
  Intro,
  Owner,
  PostDate,
  Tag,
  CommentLike
} from './css';

const Card = ({
  article,
  comments,
  favorites,
  data,
  toggleFavorite,
  loading,
  t
}) => {
  if (loading['articles'] || loading['favorites'] || article.length < 1)
    return <LoadingComponent inverted={true} />;

  const articleFavorites = favorites[article.slug] || [];

  const userMarked = articleFavorites.find(
    item => item.owner === data[0].username
  );

  const idMarked = userMarked && userMarked['id'];
  let loggedIn = data[0].username ? true : false;

  let media;
  if (article.image) {
    media = article.image.replace(': 8000', '');
  } else if (article.media) {
    media = article.media.replace(': 8000', '');
  } else {
    media = 'https://source.unsplash.com/random';
  }

  return (
    <Block>
      <Photo>
        <Link
          key={article.slug}
          to={`/${article.owner}/${article.slug}`}
          article={article}
        >
          <img src={media} alt="" />
        </Link>
      </Photo>

      <Link
        key={article.slug}
        to={`/${article.owner}/${article.slug}`}
        article={article}
      >
        <Title>{article.title}</Title>
      </Link>
      <Intro>
        <section className="start1">{article.introduction}</section>
        <section className="end1">
          <Button
            primary
            as={Link}
            to={`/${article.owner}/${article.slug}`}
            key={article.slug}
            size="tiny"
            color="green"
            content={t('MenuBar.Read More')}
          />
          {article.status === 'DRA' && (
            <Label color="yellow" tag>
              DRAFT
            </Label>
          )}
        </section>
      </Intro>

      <Owner>
        <span>
          <Image src="/images/no-profile.png" alt={article.title} avatar />
        </span>
        <span>
          <Link key={article.owner} to={`/user/${article.owner}`}>
            by {article.owner}
          </Link>
        </span>
      </Owner>
      <PostDate>{distanceInWordsToNow(article.publish_date) + ' ago'}</PostDate>
      <CommentLike>
        <Button
          basic
          as={Link}
          to={`/${article.owner}/${article.slug}`}
          color="blue"
          key={article.slug}
          content={t('MenuBar.Comments')}
          icon="comment"
          label={{
            basic: true,
            color: 'blue',
            pointing: 'left',
            content: comments.length
          }}
        />

        <Button
          color="red"
          basic={!userMarked}
          content={
            userMarked
              ? t('MenuBar.Remove Favorite')
              : t('MenuBar.Add Favorite')
          }
          disabled={!loggedIn}
          icon="star"
          key={`k${article.slug}`}
          item={article.slug}
          marked={userMarked}
          idmarked={idMarked}
          onClick={toggleFavorite}
          label={{
            as: 'a',
            basic: true,
            color: 'red',
            pointing: 'left',
            content: articleFavorites.length
          }}
        />
      </CommentLike>
      <Tag>
        {article.category &&
          article.category.map(cat => (
            <li key={cat}>
              <Link to={`/category/${cat}`}>
                <Label color="teal" size="mini">
                  {cat}
                </Label>
              </Link>
            </li>
          ))}
      </Tag>
    </Block>
  );
};

const mapStateToProps = (state, props) => ({
  data: state.user.data,
  favorites: state.favorites
});

export default translate('translations')(connect(mapStateToProps)(Card));

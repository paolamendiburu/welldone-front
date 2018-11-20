import React from 'react';
import { Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const CommentItem = ({ comment }) => (
  <Comment>
    <Comment.Avatar src="/images/no-profile.png" />
    <Comment.Content>
      <Comment.Author as={Link} to={`/user/${comment.owner}`}>
        {comment.owner.toUpperCase()}
      </Comment.Author>
      <Comment.Text>{comment.text}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default CommentItem;

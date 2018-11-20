import React from 'react';
import { connect } from 'react-redux';
import { Comment, Header } from 'semantic-ui-react';
import { fetchItem } from '../../../actions';
import CommentItem from '../Comment';
import NewComment from '../NewComment';

const Comments = ({ slug, user, comments }) => (
  <Comment.Group threaded>
    <Header as="h3" dividing color="teal">
      Comments
    </Header>
    {comments &&
      comments.map(function(comment) {
        if (comment.article === slug) {
          return <CommentItem comment={comment} key={comment.id} />;
        } else return null;
      })}
    {<NewComment slug={slug} user={user} />}
  </Comment.Group>
);

const mapDispatchToProps = {
  fetchItem
};
const mapStateToProps = state => {
  return { comments: state.comments, user: state.user.data };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);

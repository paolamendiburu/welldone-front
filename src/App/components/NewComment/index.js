import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import * as actionCreators from '../../../actions';
import { bindActionCreators } from 'redux';

const NewComment = props => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log(e);
    const article = props.slug;
    const text = e.currentTarget.text1.value;
    let data = { article, text };
    props.actions.postItem('comments', JSON.stringify(data));
  };

  return (
    <Form reply onSubmit={handleSubmit}>
      <Form.Input
        name="text1"
        placeholder="What did you think of the article?"
      />
      <Form.Button
        content={
          props.user[0].token ? 'Add a comment!' : 'Log in to Add a Comment'
        }
        disabled={props.user[0].token ? false : true}
        labelPosition="left"
        icon="edit"
        primary
      />
    </Form>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

const mapStateToProps = state => ({
  users: state.users,
  comments: state.comments,
  loading: state.loading,
  error: state.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComment);

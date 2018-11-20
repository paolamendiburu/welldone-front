import { GET_COMMENTS_SUCCESS, POST_NEW_COMMENT } from '../../actionTypes';

const commentsReducer = (state = {}, action) => {
  const newCom = action.newComment;
  switch (action.type) {
    case GET_COMMENTS_SUCCESS:
      return action.payload;
    case POST_NEW_COMMENT:
      return [...state, { ...newCom }];
    default:
      return state;
  }
};

export default commentsReducer;

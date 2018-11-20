import {
    USER_SAVING,
    USER_SAVE_SUCCESS,
    USER_RESET,
} from '../../actionTypes';

export const userSaving = () => ({
    type: USER_SAVING,
});


export const userSaveSuccess = payload => ({
    type: USER_SAVE_SUCCESS,
    payload,
});

export const userReset = () => ({
    type: USER_RESET,
});


export const userSaveData = user => (dispatch) => {
    dispatch(userSaving());
    const userObj = {
        username: user.username,
        id: user.id,
        isLogged: user.isLogged,
        token: user.token,
    };
    return dispatch(userSaveSuccess(userObj))
};



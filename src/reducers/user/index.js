import {
    USER_SAVING,
    USER_SAVE_SUCCESS,
    USER_RESET
} from '../../actionTypes';

const initialState = {
    data: [{username: '', id: '', token: '', isLogged: false}],
    saving: false,
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_SAVING:
            return { ...state, saving: true };
        case USER_SAVE_SUCCESS:
            return { ...state, saving: false, data: [payload] };
        case USER_RESET:
            return initialState;
        default:
            return state;
    }
};

export default userReducer
import {
 ACTIONS
} from '../Actions/composeFormActions';

const initialState = {
 id: 0,
 email: '',
 firstName: '',
 lastName: '',
 subject: '',
 message: '',
};

const composeFormReducer = (state = initialState, action) => {
 switch (action.type) {
   case ACTIONS.SET_EDIT:
     return {
       ...state, ...action.payload
     };
   case ACTIONS.CLEAR:
     return {
       ...state, ...initialState
     };
   case ACTIONS.CLEAR1:
     return {
       ...state, ...action.payload
     };
   default:
     return state;
 }
};

export default composeFormReducer;
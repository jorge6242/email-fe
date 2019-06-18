import {
  combineReducers
} from 'redux';
import {
  reducer as form
} from 'redux-form';
import snackBarReducer from './snackBarReducer';
import emailReducer from './emailReducer';
import modalReducer from './modalReducer';
import composeFormReducer from './composeFormReducer';

const rootReducer = combineReducers({
  form,
  snackBarReducer,
  emailReducer,
  modalReducer,
  composeFormReducer,
});

export default rootReducer;
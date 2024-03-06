import { combineReducers } from 'redux';
import loader from './loader';
import register from './auth/register';
import dashboard from './dashboard';
import { LOGOUT_SUCCESS } from '../actions/types';

const appReducer = combineReducers({
    loader,
    register,
    dashboard
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
      return appReducer(undefined, action)
    }
  
    return appReducer(state, action)
  }

  export default rootReducer
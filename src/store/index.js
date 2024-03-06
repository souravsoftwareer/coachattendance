import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk  from 'redux-thunk';
import rootReducer from './../reducers';
import AppUtils from '../utils/AppUtils';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
store.subscribe(() => {
    AppUtils.showMessage("Redux Store State ===>>>>> ", store.getState())
})
export default store;
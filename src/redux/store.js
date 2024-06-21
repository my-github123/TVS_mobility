// store.js
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import orderReducer from './reducer/storeReducer';

const rootReducer = combineReducers({
  order: orderReducer,
});

const store = createStore(rootReducer);

export default store;

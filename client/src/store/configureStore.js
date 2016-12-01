import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default function configureStore(initialState){
  const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(thunk)));
  return store;
}

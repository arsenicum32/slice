import { combineReducers } from 'redux';
import dispute from './dispute';
import { reducer as formReduser } from 'redux-form';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({dispute, form: formReduser, routing: routerReducer});

export default rootReducer;

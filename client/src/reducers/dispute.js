import { combineReducers } from 'redux';
import { union } from 'lodash';

const createDispute = (state, action) => {
  switch (action.type) {
    case 'ADD_DISPUTE':
      return {
        id: action.payload.id,
        discription: action.payload.discription,
        sides: action.payload.sides,
        timer: action.payload.timer,
        referee: action.payload.referee,
        complete: action.payload.complete
      }
    default: return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_DISPUTE':
      return {
        ...state,
        ...action.data.entities.disputes
      }
    case 'ADD_DISPUTE':
      return {
        ...state,
        [action.id]: createDispute(state[action.id], action)
      }
    default: return state;

  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DISPUTE':
      return union(state, action.data.result);
    case 'ADD_DISPUTE':
      return [...state, action.id];
    default:
      return state;
  }
};

const dispute = combineReducers({
  byId,
  allIds
});

export default dispute;

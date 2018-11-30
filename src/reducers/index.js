import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';


const rectangles = handleActions({
  [actions.createRect](state, { payload }) {
    return [...state, payload];
  },
}, []);

export default combineReducers({
  rectangles,
});

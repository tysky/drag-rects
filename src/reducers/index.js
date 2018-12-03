import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';


const rectangles = handleActions({
  [actions.createRect](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.movingRect](state, { payload }) {
    // console.log('old', state[payload.id]);
    // console.log('new', payload);
    return { ...state, [payload.id]: payload };
  },
  [actions.startMovingRect](state, { payload: { rectId } }) {
    const rect = state[rectId];
    const newRect = { ...rect, isMoving: true };
    return { ...state, [rectId]: newRect };
  },
  [actions.finishMovingRect](state, { payload: { rectId } }) {
    const rect = state[rectId];
    const newRect = { ...rect, isMoving: false };
    return { ...state, [rectId]: newRect };
  },
}, {});

const rectOffset = handleActions({
  [actions.startMovingRect](state, { payload }) {
    const { x, y } = payload;
    return { ...state, coordX: x, coordY: y };
  },
  [actions.changeRectOffset](state, { payload }) {
    const { x, y } = payload;
    const offsetX = x - state.coordX;
    const offsetY = y - state.coordY;
    return {
      offsetX, offsetY, coordX: x, coordY: y,
    };
  },
}, {
  offsetX: 0, offsetY: 0, coordX: 0, coordY: 0,
});

export default combineReducers({
  rectangles,
  rectOffset,
});

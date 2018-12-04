import { createAction } from 'redux-actions';
import uniqueId from 'lodash/uniqueId';
import getRectColor from '../utils/getRectColor';


export const createRect = createAction('RECT_CREATE', rect => ({
  ...rect, id: Number(uniqueId()), fill: getRectColor(), isMoving: false,
}));
export const startMovingRect = createAction('RECT_START_MOVING');
export const finishMovingRect = createAction('RECT_FINISH_MOVING');
export const movingRect = createAction('RECT_MOVING');
export const changeRectOffset = createAction('RECT_CHANGE_OFFSET');

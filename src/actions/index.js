import { createAction } from 'redux-actions';

export const createRect = createAction('RECT_CREATE', rect => ({ ...rect, isMoving: false }));
export const startMovingRect = createAction('RECT_START_MOVING');
export const finishMovingRect = createAction('RECT_FINISH_MOVING');
export const movingRect = createAction('RECT_MOVING');
export const changeRectOffset = createAction('RECT_CHANGE_OFFSET');

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

export const toggleDrawingLinksMode = createAction('DRAWING_LINKS_MODE_TOGGLE');
export const startLinkingRects = createAction('RECTS_START_LINKING');
export const finishLinkingRects = createAction('RECTS_FINISH_LINKING', rect2Id => ({ id: uniqueId('link_'), rect2Id }));
export const toggleDeletingLinksMode = createAction('DELETING_LINKS_MODE_TOGGLE');
export const deleteLink = createAction('LINK_DELETE');

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import omit from 'lodash/omit';
import * as actions from '../actions';
import rectSize from '../defaultRectSize';
import isRectsInterseсt from '../utils/isRectsInterseсt';


const rectangles = handleActions({
  [actions.createRect](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.movingRect](state, { payload: { rectId, x, y } }) {
    const rect = state[rectId];

    const offsetX = x - rect.cursor.x;
    const offsetY = y - rect.cursor.y;

    const newRect = {
      ...rect,
      x0: rect.x0 + offsetX,
      y0: rect.y0 + offsetY,
      x: rect.x0 + offsetX - rectSize.width / 2,
      y: rect.y0 + offsetY - rectSize.height / 2,
      isMoving: true,
      cursor: { x, y },
    };
    const otherRects = omit(state, rectId);

    const hasIntersection = isRectsInterseсt(newRect, Object.values(otherRects), rectSize);
    return { ...state, [rectId]: hasIntersection ? rect : newRect };
  },
  [actions.startMovingRect](state, { payload: { rectId, x, y } }) {
    const rect = state[rectId];
    const newRect = { ...rect, isMoving: true, cursor: { x, y } };
    return { ...state, [rectId]: newRect };
  },
  [actions.finishMovingRect](state, { payload: { rectId } }) {
    const rect = state[rectId];
    const newRect = { ...rect, isMoving: false };
    return { ...state, [rectId]: newRect };
  },
}, {});

const links = handleActions({
  [actions.startLinkingRects](state, { payload }) {
    return { ...state, startRectId: payload };
  },
  [actions.finishLinkingRects](state, { payload: { id, rect2Id } }) {
    const rect1Id = state.startRectId;
    const isLinkExisted = Object.values(state.byId).some(link => (
      (rect1Id === link.rect1Id || rect1Id === link.rect2Id)
      && (rect2Id === link.rect1Id || rect2Id === link.rect2Id)));
    if (isLinkExisted) {
      return state;
    }
    const newLink = { id, rect1Id, rect2Id };
    return { ...state, byId: { ...state.byId, [newLink.id]: newLink }, startRectId: null };
  },
  [actions.deleteLink](state, { payload }) {
    return omit(state, `byId.${payload}`);
  },
  [actions.resetStartLinking](state) {
    return { ...state, startRectId: null };
  },
}, { byId: {}, startRectId: null });

const linksEditing = handleActions({
  [actions.toggleDrawingLinksMode](state) {
    return { ...state, canAddLinks: !state.canAddLinks };
  },
  [actions.startLinkingRects](state) {
    return { ...state, startLinking: true };
  },
  [actions.finishLinkingRects](state) {
    return { ...state, startLinking: false };
  },
  [actions.resetStartLinking](state) {
    return { ...state, startLinking: false };
  },
  [actions.toggleDeletingLinksMode](state) {
    return { ...state, canDeleteLinks: !state.canDeleteLinks };
  },
}, { canAddLinks: false, startLinking: false, canDeleteLinks: false });

export default combineReducers({
  rectangles,
  links,
  linksEditing,
});

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import omit from 'lodash/omit';
import * as actions from '../actions';
import rectSize from '../defaultRectSize';
// import { isRectsInterseсt } from '../utils/isRectsInterseсt';


const rectangles = handleActions({
  [actions.createRect](state, { payload }) {
    return { ...state, byId: { ...state.byId, [payload.id]: payload } };
  },
  [actions.movingRect](state, { payload: { rectId, x, y } }) {
    const oldRect = state.movingRectParams;
    // const oldRect = state.byId[rectId];

    const offsetX = x - state.cursor.x;
    const offsetY = y - state.cursor.y;

    const movingRectParams = {
      ...oldRect,
      x0: oldRect.x0 + offsetX,
      y0: oldRect.y0 + offsetY,
      x: oldRect.x0 + offsetX - rectSize.width / 2,
      y: oldRect.y0 + offsetY - rectSize.height / 2,
      isMoving: true,
    };
    // const otherRects = omit(state.byId, rectId);

    // const hasIntersection = isRectsInterseсt(newRect, Object.values(otherRects), rectSize);
    // const rect = hasIntersection ? oldRect : newRect;
    return { ...state, cursor: { x, y }, movingRectParams };
    // return { ...state, cursor: { x, y }, byId: { ...state.byId, [rectId]: rect } };
  },
  [actions.startMovingRect](state, { payload: { rectId, x, y } }) {
    const rect = state.byId[rectId];
    const newRect = { ...rect, willMove: true };
    return {
      ...state, cursor: { x, y }, movingRectParams: newRect, byId: { ...state.byId, [rectId]: newRect },
    };
  },
  [actions.finishMovingRect](state, { payload: { rectId, x, y } }) {
    const oldRect = state.movingRectParams;
    // const oldRect = state.byId[rectId];

    const offsetX = x - state.cursor.x;
    const offsetY = y - state.cursor.y;
    const newRect = {
      ...oldRect,
      x0: oldRect.x0 + offsetX,
      y0: oldRect.y0 + offsetY,
      x: oldRect.x0 + offsetX - rectSize.width / 2,
      y: oldRect.y0 + offsetY - rectSize.height / 2,
      isMoving: false,
      willMove: false,
      isMoved: true,
    };
    // const rect = state.byId[rectId];
    // const newRect = {
    //   ...oldRect, willMove: false, isMoving: false, isMoved: rect.isMoving,
    // };
    return { ...state, movingRectParams: {}, byId: { ...state.byId, [rectId]: newRect } };
  },
  [actions.clearAll]() {
    return { byId: {} };
  },
}, { byId: {}, movingRectParams: {} });

const defaultLinksState = { byId: {}, startRectId: null };
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
  [actions.clearAll]() {
    return defaultLinksState;
  },
}, defaultLinksState);

const defaulLinksEditingState = { canAddLinks: true, startLinking: false, canDeleteLinks: true };
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
  [actions.clearAll]() {
    return defaulLinksEditingState;
  },
}, defaulLinksEditingState);

const error = handleActions({
  [actions.showError]() {
    return true;
  },
  [actions.hideError]() {
    return false;
  },
}, false);

export default combineReducers({
  rectangles,
  links,
  linksEditing,
  error,
});

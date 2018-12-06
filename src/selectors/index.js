import { createSelector } from 'reselect';

const getRects = state => state.rectangles;

export const rectsSelector = createSelector(
  getRects,
  rects => rects.byId,
);

export const rectsListSelector = createSelector(
  rectsSelector,
  rects => Object.values(rects),
);

const getLinks = state => state.links.byId;

export const linksSelector = createSelector(
  getLinks,
  links => Object.values(links),
);

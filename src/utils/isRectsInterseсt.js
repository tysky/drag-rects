const hasIntersection = (rect1, rect2, rectSize) => (
  (Math.abs(rect1.x0 - rect2.x0) <= rectSize.width)
  && (Math.abs(rect1.y0 - rect2.y0) <= rectSize.height)
);

const isRectsInterseсt = (rect, rectangles, rectSize) => rectangles.some(
  ({ x0, y0 }) => hasIntersection({ x0, y0 }, rect, rectSize),
);

export default isRectsInterseсt;

const isRectsInterseсt = (rect1, rect2, rectSize) => (
  (Math.abs(rect1.x0 - rect2.x0) <= rectSize.width)
  && (Math.abs(rect1.y0 - rect2.y0) <= rectSize.height)
);

export default isRectsInterseсt;

const getColor = () => Math.floor(Math.random() * 255);
const getRectColor = () => `rgb(${getColor()}, ${getColor()}, ${getColor()})`;

export default getRectColor;

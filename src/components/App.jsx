import React from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import * as actionCreators from '../actions';


const mapStateToProps = ({ rectangles }) => {
  const props = { rectangles };
  return props;
};

const getColor = () => Math.floor(Math.random() * 255);
const getRectColor = () => `rgb(${getColor()}, ${getColor()}, ${getColor()})`;

const rectSize = { width: 200, height: 100 };

class App extends React.Component {
  handleDoubleClick = (event) => {
    const { clientX, clientY } = event;
    const { createRect } = this.props;
    const newRect = {
      id: Number(uniqueId()),
      x: String(clientX - rectSize.width / 2),
      y: String(clientY - rectSize.height / 2),
      fill: getRectColor(),
    };
    createRect(newRect);
  }

  render() {
    const { rectangles } = this.props;
    const { height, width } = rectSize;
    const { innerWidth, innerHeight } = window;
    return (
      <>
        <svg width={innerWidth} height={innerHeight} onDoubleClick={this.handleDoubleClick}>
          {rectangles.map(({
            id, x, y, fill,
          }) => <rect key={id} x={x} y={y} width={String(width)} height={String(height)} fill={fill} stroke="black" strokeWidth="4" />)}
        </svg>
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(App);

import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = ({ rectangles }) => {
  const props = {
    rectangles,
  };
  return props;
};

class Rectangle extends React.Component {
  handleMouseDown = id => (e) => {
    const { startMovingRect } = this.props;
    startMovingRect({ rectId: id, x: e.clientX, y: e.clientY });
  }

  handleMouseUp = id => () => {
    const { finishMovingRect } = this.props;
    finishMovingRect({ rectId: id });
  }

  handleMouseMove = id => (event) => {
    const { movingRect, rectangles } = this.props;
    const rect = rectangles[id];
    if (rect.isMoving) {
      const { clientX, clientY } = event;
      movingRect({ rectId: id, x: clientX, y: clientY });
    }
  }

  render() {
    const {
      id, x, y, fill, width, height,
    } = this.props;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke="black"
        strokeWidth="4"
        onMouseDown={this.handleMouseDown(id)}
        onMouseUp={this.handleMouseUp(id)}
        onMouseMove={this.handleMouseMove(id)}
      />
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Rectangle);

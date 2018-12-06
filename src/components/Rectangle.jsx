import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import { rectsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const { linksEditing, links: { startRectId } } = state;
  const props = {
    rectangles: rectsSelector(state),
    linksEditing,
    startRectId,
    error: state.error,
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
    if (rect.isMoving || rect.willMove) {
      const { clientX, clientY } = event;
      movingRect({ rectId: id, x: clientX, y: clientY });
    }
  }

  handleClick = id => () => {
    const {
      startLinkingRects,
      finishLinkingRects,
      linksEditing: { canAddLinks, startLinking },
      startRectId,
      resetStartLinking,
      rectangles,
      error,
      hideError,
    } = this.props;

    if (error) {
      hideError();
    }

    if (canAddLinks && !rectangles[id].isMoved) {
      if (!startLinking) {
        startLinkingRects(id);
      } else if (startRectId === id) {
        resetStartLinking();
      } else {
        finishLinkingRects(id);
      }
    }
  }

  render() {
    const {
      id, x, y, fill, width, height, startRectId,
    } = this.props;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke={startRectId === id ? 'yellow' : 'black'}
        strokeWidth={startRectId === id ? '6' : '4'}
        onMouseDown={this.handleMouseDown(id)}
        onMouseUp={this.handleMouseUp(id)}
        onMouseMove={this.handleMouseMove(id)}
        onClick={this.handleClick(id)}
      />
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Rectangle);

import React from 'react';
import { connect } from 'react-redux';
import { Rect } from 'react-konva';
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
    handleDragStart = id => (e) => {
      const { startMovingRect } = this.props;
      const { clientX, clientY } = e.evt;
      startMovingRect({ rectId: id, x: clientX, y: clientY });
    }

    handleDragEnd = id => () => {
      const { finishMovingRect } = this.props;
      finishMovingRect({ rectId: id });
    }

    handleDragMove = id => (event) => {
      const { movingRect, rectangles } = this.props;
      const rect = rectangles[id];
      if (rect.isMoving || rect.willMove) {
        const { clientX, clientY } = event.evt;
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
      // rectangles,
      error,
      hideError,
    } = this.props;
    if (error) {
      hideError();
    }

    // if (canAddLinks && !rectangles[id].isMoved) {
    if (canAddLinks) {
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
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        draggable
        stroke={startRectId === id ? 'yellow' : 'black'}
        strokeWidth={startRectId === id ? 6 : 4}
        onDragStart={this.handleDragStart(id)}
        onDragMove={this.handleDragMove(id)}
        onDragEnd={this.handleDragEnd(id)}
        onClick={this.handleClick(id)}
      />
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Rectangle);

import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import isRectsInterseсt from '../utils/isRectsInterseсt';
import Rectangle from './Rectangle';

const mapStateToProps = ({ rectangles }) => {
  const props = {
    rectangles: Object.values(rectangles),
  };
  return props;
};

class App extends React.Component {
  state = { error: false }

  handleDoubleClick = (event) => {
    this.setState({ error: false });
    const { clientX, clientY } = event;
    const { createRect, rectangles, rectSize } = this.props;
    const rect = { x0: clientX, y0: clientY };
    const hasIntersection = isRectsInterseсt(rect, rectangles, rectSize);
    if (hasIntersection) {
      this.setState({ error: true });
    } else {
      const newRect = {
        x0: clientX, // (x0, y0) - center of the rectangle
        y0: clientY,
        x: clientX - rectSize.width / 2,
        y: clientY - rectSize.height / 2,
      };
      createRect(newRect);
    }
  }

  render() {
    const { error } = this.state;
    const { rectangles, rectSize: { height, width } } = this.props;
    const { innerWidth, innerHeight } = window;
    return (
      <>
        <div className="info">
          <span>Double click to add rectangle</span>
          {error && <span className="error">Error! Can&apos;t add rectangle! Try again.</span>}
        </div>
        <svg width={innerWidth} height={innerHeight} onDoubleClick={this.handleDoubleClick}>
          {rectangles.map(({
            id, x, y, fill,
          }) => (
            <Rectangle
              key={id}
              id={id}
              x={String(x)}
              y={String(y)}
              width={String(width)}
              height={String(height)}
              fill={fill}
            />
          ))}
        </svg>
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(App);

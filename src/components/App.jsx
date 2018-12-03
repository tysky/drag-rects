import React from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import * as actionCreators from '../actions';
import isRectsInterseсt from '../utils/isRectsInterseсt';
import getRectColor from '../utils/getRectColor';


const mapStateToProps = ({ rectangles }) => {
  const props = { rectangles };
  return props;
};

class App extends React.Component {
  state = { error: false }

  handleDoubleClick = (event) => {
    this.setState({ error: false });
    const { clientX, clientY } = event;
    const { createRect, rectangles, rectSize } = this.props;
    const hasIntersection = rectangles.some(
      ({ x0, y0 }) => isRectsInterseсt({ x0, y0 }, { x0: clientX, y0: clientY }, rectSize),
    );
    if (hasIntersection) {
      this.setState({ error: true });
    } else {
      const newRect = {
        id: Number(uniqueId()),
        x0: clientX,
        y0: clientY,
        x: clientX - rectSize.width / 2,
        y: clientY - rectSize.height / 2,
        fill: getRectColor(),
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
          }) => <rect key={id} x={String(x)} y={String(y)} width={String(width)} height={String(height)} fill={fill} stroke="black" strokeWidth="4" />)}
        </svg>
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(App);

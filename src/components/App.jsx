import React from 'react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import * as actionCreators from '../actions';
import { isRectsInterseсt } from '../utils/isRectsInterseсt';
import Rectangle from './Rectangle';
import Portal from './Portal';
import RectsLink from './RectsLink';
import { rectsListSelector, linksSelector } from '../selectors';
import {
  infoStyle, linksStyle, errorStyle, clearButtonStyle,
} from '../canvasElementsStyles';

const mapStateToProps = (state) => {
  const { linksEditing: { canAddLinks, canDeleteLinks } } = state;
  const props = {
    rectangles: rectsListSelector(state),
    canAddLinks,
    canDeleteLinks,
    links: linksSelector(state),
    error: state.error,
  };
  return props;
};

class App extends React.Component {
  handleDoubleClick = (event) => {
    const {
      createRect, rectangles, rectSize, error, showError, hideError,
    } = this.props;

    if (error) {
      hideError();
    }

    const { clientX, clientY } = event.evt;
    const rect = { x0: clientX, y0: clientY };
    const hasIntersection = isRectsInterseсt(rect, rectangles, rectSize);
    if (hasIntersection) {
      showError();
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

  handleDrawLinkCheckbox = () => {
    const { toggleDrawingLinksMode } = this.props;
    toggleDrawingLinksMode();
  }

  handleDeleteLinkCheckbox = () => {
    const { toggleDeletingLinksMode } = this.props;
    toggleDeletingLinksMode();
  }

  handleButtonClick = () => {
    const { clearAll, hideError } = this.props;
    clearAll();
    hideError();
  }

  render() {
    const {
      rectangles, rectSize: { height, width }, canAddLinks, canDeleteLinks, links, error,
    } = this.props;
    const { innerWidth, innerHeight } = window;
    return (
      <>
        <Stage width={innerWidth} height={innerHeight} onDblClick={this.handleDoubleClick}>
          <Layer>
            <Portal>
              <div style={infoStyle}>
                <span>Double click to add rectangle</span>
                {error && (
                <span style={errorStyle}>
                  Not enough space to create a rectangle! Try again.
                </span>
                )}
              </div>
              <div style={linksStyle}>
                <label htmlFor="drawLink" title="To draw a link click to one rectangle and then to another">
                  <input id="drawLink" type="checkbox" checked={canAddLinks} onChange={this.handleDrawLinkCheckbox} />
                  Draw link
                </label>
                <br />
                <label htmlFor="deleteLink" title="To delete a link click on it">
                  <input id="deleteLink" type="checkbox" checked={canDeleteLinks} onChange={this.handleDeleteLinkCheckbox} />
                  Delete link
                </label>
                <br />
                <button style={clearButtonStyle} type="button" onClick={this.handleButtonClick}>Clear</button>
              </div>
            </Portal>
            {rectangles.map(({
              id, x, y, fill,
            }) => (
              <Rectangle
                key={id}
                id={id}
                x={x}
                y={y}
                width={width}
                height={height}
                fill={fill}
              />
            ))}
            {links.map(({ id, rect1Id, rect2Id }) => (
              <RectsLink
                key={id}
                id={id}
                rect1Id={rect1Id}
                rect2Id={rect2Id}
              />
            ))}
          </Layer>
        </Stage>
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(App);

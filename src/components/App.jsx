import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import isRectsInterseсt from '../utils/isRectsInterseсt';
import Rectangle from './Rectangle';
import RectsLink from './RectsLink';

const mapStateToProps = ({ rectangles, links, linksEditing }) => {
  const { canAddLinks, canDeleteLinks } = linksEditing;
  const props = {
    rectangles: Object.values(rectangles),
    canAddLinks,
    canDeleteLinks,
    links: Object.values(links.byId),
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

  handleDrawLinkCheckbox = () => {
    const { toggleDrawingLinksMode } = this.props;
    toggleDrawingLinksMode();
  }

  handleDeleteLinkCheckbox = () => {
    const { toggleDeletingLinksMode } = this.props;
    toggleDeletingLinksMode();
  }

  handleButtonClick = () => {
    const { clearAll } = this.props;
    clearAll();
  }

  render() {
    const { error } = this.state;
    const {
      rectangles, rectSize: { height, width }, canAddLinks, canDeleteLinks, links,
    } = this.props;
    const { innerWidth, innerHeight } = window;
    return (
      <>
        <div className="info">
          <span>Double click to add rectangle</span>
          {error && <span className="error">Error! Can&apos;t add rectangle! Try again.</span>}
        </div>
        <div className="links">
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
          <button className="clearButton" type="button" onClick={this.handleButtonClick}>Clear</button>
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
          {links.map(({ id, rect1Id, rect2Id }) => (
            <RectsLink
              key={id}
              id={id}
              rect1Id={rect1Id}
              rect2Id={rect2Id}
            />
          ))}
        </svg>
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(App);

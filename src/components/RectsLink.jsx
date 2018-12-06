import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import { rectsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const { linksEditing } = state;
  const props = {
    rectangles: rectsSelector(state),
    canDeleteLinks: linksEditing.canDeleteLinks,
  };
  return props;
};

class RectsLink extends React.Component {
  state = { hover: false }

  handleLinkClick = linkId => () => {
    const { deleteLink } = this.props;
    const { canDeleteLinks } = this.props;
    if (canDeleteLinks) {
      deleteLink(linkId);
    }
  }

  toggleLinkHighlight = () => {
    const { hover } = this.state;
    const { canDeleteLinks } = this.props;
    if (canDeleteLinks) {
      this.setState({ hover: !hover });
    }
  }

  render() {
    const { hover } = this.state;
    const {
      rect1Id, rect2Id, rectangles, id,
    } = this.props;
    const rect1 = rectangles[rect1Id];
    const rect2 = rectangles[rect2Id];
    return (
      <line
        x1={rect1.x0}
        y1={rect1.y0}
        x2={rect2.x0}
        y2={rect2.y0}
        stroke={hover ? 'orange' : '#666'}
        strokeWidth={hover ? '6' : '3'}
        onClick={this.handleLinkClick(id)}
        onMouseEnter={this.toggleLinkHighlight}
        onMouseLeave={this.toggleLinkHighlight}
      />
    );
  }
}

export default connect(mapStateToProps, actionCreators)(RectsLink);

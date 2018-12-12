import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-konva';
import * as actionCreators from '../actions';
import { rectsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const { linksEditing } = state;
  const props = {
    rectangles: rectsSelector(state),
    canDeleteLinks: linksEditing.canDeleteLinks,
    movingRectParams: state.rectangles.movingRectParams,
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
      rect1Id, rect2Id, rectangles, id, movingRectParams,
    } = this.props;
    const rect1 = movingRectParams.id === rect1Id ? movingRectParams : rectangles[rect1Id];
    const rect2 = movingRectParams.id === rect2Id ? movingRectParams : rectangles[rect2Id];
    return (
      <Line
        points={[rect1.x0, rect1.y0, rect2.x0, rect2.y0]}
        stroke={hover ? 'orange' : '#666'}
        strokeWidth={hover ? 6 : 3}
        onClick={this.handleLinkClick(id)}
        onMouseEnter={this.toggleLinkHighlight}
        onMouseLeave={this.toggleLinkHighlight}
      />
    );
  }
}

export default connect(mapStateToProps, actionCreators)(RectsLink);

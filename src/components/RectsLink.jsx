import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = ({ rectangles }) => {
  const props = {
    rectangles,
  };
  return props;
};

class RectsLink extends React.Component {
  handleLinkClick = linkId => () => {
    const { deleteLink } = this.props;
    deleteLink(linkId);
  }

  render() {
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
        stroke="#666"
        strokeWidth="3"
        onClick={this.handleLinkClick(id)}
      />
    );
  }
}

export default connect(mapStateToProps, actionCreators)(RectsLink);

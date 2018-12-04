import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = ({ rectangles }) => {
  const props = {
    rectangles,
  };
  return props;
};

const RectsLink = ({ rect1Id, rect2Id, rectangles }) => {
  const rect1 = rectangles[rect1Id];
  const rect2 = rectangles[rect2Id];
  return (
    <line
      x1={rect1.x0}
      y1={rect1.y0}
      x2={rect2.x0}
      y2={rect2.y0}
      stroke="#666"
      strokeWidth="2"
    />
  );
};

export default connect(mapStateToProps, actionCreators)(RectsLink);

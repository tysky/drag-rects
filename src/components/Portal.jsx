// adapted from https://github.com/tajo/react-portal/blob/55ed77ab823b03d1d4c45b950ba26ea5d687e85c/src/LegacyPortal.js

import React from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends React.Component {
  componentDidMount() {
    this.renderPortal();
  }

  componentDidUpdate() {
    this.renderPortal();
  }

  componentWillUnmount() {
    const { node } = this.props;
    ReactDOM.unmountComponentAtNode(this.defaultNode || node);
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  renderPortal() {
    const { children, node } = this.props;
    if (!node && !this.defaultNode) {
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }

    let childrenForRender = children;
    // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
    if (typeof children.type === 'function') {
      childrenForRender = React.cloneElement(children);
    }

    ReactDOM.render(childrenForRender, node || this.defaultNode);
  }

  render() {
    return null;
  }
}

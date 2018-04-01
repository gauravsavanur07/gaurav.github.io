import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';

import DraggableFilter from '../DraggableFilter';
import Handle from './Handle';
import styles from './styles';

const { number, string, func } = PropTypes;

export class ResizableFilter extends Component {
  static propTypes = {
    id: string.isRequired,
    x: number.isRequired,
    width: number.isRequired,
    onResize: func.isRequired
  };

  state = {
    delta: 0,
    x: this.props.x,
    width: this.props.width
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.x !== this.state.x ||
        nextProps.width !== this.state.width) {
      this.setState({
        x: nextProps.x,
        width: nextProps.width
      });
    }
  }

  @autobind
  handleResizing(delta, factor) {
    const x = this.state.x + (factor > 0 ? 0 : delta);
    const width = this.state.width + factor * delta;

    this.setState({ x, width });
  }

  @autobind
  handleResized(delta, factor) {
    this.props.onResize(
      this.props.id,
      this.state.x,
      this.state.width,
      factor
    );
  }

  render() {
    const { id, ...other } = this.props;
    const { x, width } = this.state;

    const handleProps = {
      id,
      onResizing: this.handleResizing,
      onResized: this.handleResized
    };

    const transform = `translate3d(${x}px, 0, 0)`;

    const style = {
      position: 'absolute',
      transform,
      WebkitTransform: transform
    };

    return (
      <div className={styles.filter} style={style}>
        <Handle className={styles.handle}
          factor={-1} {...handleProps} />
        <DraggableFilter { ...{ ...this.props, ...{ x, width } } } />
        <Handle className={styles.handle}
          factor={+1} {...handleProps} />
      </div>
    );
  }
}

export default ResizableFilter;

import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import Button from '../../../Button';
import Slider from '../../../Slider';

import styles from './styles';

const { number, func } = PropTypes;

export class ZoomSlider extends Component {
  static propTypes = {
    zoom: number.isRequired,
    step: number,
    onZoom: func.isRequired,
    onZoomIn: func,
    onZoomOut: func
  };

  static defaultProps = {
    step: 10,
    sliderThickness: '1rem'
  };

  @autobind
  handleZoom(level) {
    this.props.onZoom(Number(level));
  }

  render() {
    const {
      step,
      zoom,
      onZoomIn,
      onZoomOut
    } = this.props;

    return (
      <div styleName='zoom-slider'>
        {onZoomIn &&
          <Button neutral
            className={styles.button}
            icon='zoom_in'
            onClick={onZoomIn} />
        }
        <Slider
          barClassName={styles.sliderBar}
          sliderClassName={styles.slider}
          min={0}
          max={100}
          step={step}
          value={zoom}
          onChange={this.handleZoom}
        />
        {onZoomOut &&
          <Button neutral
            className={styles.button}
            icon='zoom_out'
            onClick={onZoomOut} />
        }
      </div>
    );
  }
}

export default css(ZoomSlider, styles, { allowMultiple: true });

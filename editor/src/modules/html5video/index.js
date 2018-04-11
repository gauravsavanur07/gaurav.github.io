import reduceReducers from 'reduce-reducers';
import { createReducer } from 'redux-act';
import { reduceAny } from '../reducers';

import * as constants from './constants';

import {
  updateReadyState,
  updateNetworkState,
  updateError,
  updateCurrentTime
} from './reducers';

import {
  init,
  loadedMetadata,
  canPlay,
  canPlayThrough,
  progress,
  play,
  pause,
  seeking,
  seeked,
  durationChange,
  rateChange,
  resize,
  volumeChange,
  toggleLoop
} from './actions';

import initialState from './initialState';

const reducer = createReducer({
  [init]: (state, { duration }) => ({ ...state, duration }),
  [loadedMetadata]: (state, { duration, size }) => ({
    ...state,
    duration,
    size
  }),
  [canPlay]: s => ({ ...s, canPlay: true }),
  [canPlayThrough]: s => ({ ...s, canPlayThrough: true }),
  [progress]: ({ percentage, ...state }, { bufferedTime }) => {
    const buffered = Math.floor(bufferedTime / Math.max(state.duration, 1) * 100);
    return { ...state, percentage: { ...percentage, buffered } };
  },
  [resize]: (state, { size }) => ({ ...state, size }),
  [durationChange]: (s, { duration }) => ({ ...s, duration }),
  [play]: s => ({ ...s, paused: false }),
  [pause]: s => ({ ...s, paused: true }),
  [seeking]: s => ({ ...s, seeking: true }),
  [seeked]: s => ({ ...s, seeking: false }),
  [rateChange]: (s, { playbackRate }) => ({ ...s, playbackRate }),
  [volumeChange]: (s, { volume, muted }) => ({ ...s, volume, muted }),
  [toggleLoop]: (s, { loop }) => ({ ...s, loop })
}, initialState);

export default reduceReducers(
  reducer,
  reduceAny(updateReadyState, constants.readyState),
  reduceAny(updateNetworkState, constants.networkState),
  reduceAny(updateError, constants.error),
  reduceAny(updateCurrentTime, constants.time)
);

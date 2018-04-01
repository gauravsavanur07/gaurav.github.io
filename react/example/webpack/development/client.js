import merge from 'webpack-merge';

import base from '../base/client';
import common from './common';

import plugins from './plugins/client';
import loaders from './loaders/client';

import preLoaders from './preLoaders';

export default merge(base, common, {
  entry: ['webpack-hot-middleware/client'],

  // module: { preLoaders, loaders },
  module: { loaders },

  plugins,
  devtool: 'cheap-module-inline-source-map'
});

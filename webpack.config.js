module.exports = {
  entry: './src/client.js',
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        query: {
          presets: [
            'es2015',
            'es2016',
            'stage-1',
            'react',
          ],
        },
      },
    ],
  },
};

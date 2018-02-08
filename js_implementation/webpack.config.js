
const webpack = require('webpack'); // webpack itself
const path = require('path'); // nodejs dependency when dealing with paths
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // extract css into a dedicated file
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // "uglify" our output js code
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

let config = {

  entry: './src/index.js',  // entry file
  output: {
    path: path.resolve(__dirname, './public'), // output path
    filename: 'output.js'  // output filename
  },
  resolve: {
    // auto-resolve certain extensions:
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'],

    // create aliases - e.g. "images" as an alias for src/assets/images
    alias: {
      images: path.resolve(__dirname, 'src/assets/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(
          ExtractTextWebpackPlugin.extract({ // call plugin w/ extract method
            use: ['css-loader', 'sass-loader', 'postcss-loader'], // use these loaders
            fallback: 'style-loader' // fallback for any CSS not extracted
          })  // end extract
        ),
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/assets/images&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsickle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
      },
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'), // call the ExtractTextWebpackPlugin constructor and name our css file
    //new webpack.optimize.UglifyJsPlugin() // call the uglify plugin
    new DashboardPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'), // A directory or URL from which to serve HTML content.
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    inline: true, // inline mode (set to false to disable including client scripts (like livereload))
    open: true // open default browser while launching
  },
  devtool: 'eval-source-map' // enable devtool for better debugging experience
}

module.exports = config;

// append "production behavior":
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
    new OptimizeCSSAssets()
  );
}

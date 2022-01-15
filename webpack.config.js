const HtmlWebpackPlugin = require('html-webpack-plugin');

const electronSettings = {
  devConfigName: 'devElectronConfig',
  buildConfigName: 'buildElectronConfig',
  entry: './src/main/index.js',
  buildName: 'electron',
}

const renderSettings = {
  devConfigName: 'devRenderConfig',
  buildConfigName: 'buildRenderConfig',
  entry: 'src/render/index.jsx',
  buildName: 'render',
  htmlTemplate: 'templates/index.html',
}

const webSettings = {
  configName: 'webConfig',
  entry: 'src/web/index.jsx',
  buildName: 'web',
  htmlTemplate: 'templates/index.html',
  devPort: 8000,
}

const commonConfig = (settings) => ({
  entry: `./${settings.entry}`,
  optimization: {
    chunkIds: 'named',
    moduleIds: 'named',
  },
  output: {
    path: `${__dirname}/build`,
    filename: `./${settings.buildName}.[name].js`,
    assetModuleFilename: './assets/[name][ext]',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(s[ac]ss|css)$/,
        use: ['style-loader', { loader: 'css-loader' }, 'sass-loader'],
        exclude: [/\.module\.(s[ac]ss|css)$/],
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
        include: /\.module\.(s[ac]ss|css)$/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource', 
      },
    ],
  },
  plugins: []
})

const devElectronConfig = (settings) => ({
  ...commonConfig(settings),
  name: settings.devConfigName,
  mode: 'development',
  target: 'electron-main',
  watch: true,
})

const buildElectronConfig = (settings) => ({
  ...devElectronConfig(settings),
  name: settings.buildConfigName,
  mode: 'production',
  watch: false
})

const devRenderConfig = (settings) => ({
  ...commonConfig(settings),
  name: settings.devConfigName,
  mode: 'development',
  target: 'electron-renderer',
  watch: true,
  plugins: [
    ...commonConfig(settings).plugins,
    new HtmlWebpackPlugin({
      template: settings.htmlTemplate,
      minify: {
        removeComments: false,
      },
    }),
  ]
})

const buildRenderConfig = (settings) => ({
  ...devRenderConfig(settings),
  name: settings.buildConfigName,
  mode: 'production',
  watch: false
})

const webConfig = (settings) => ({
  ...commonConfig(settings),
  name: settings.configName,
  mode: 'development',
  target: 'web',
  output: {
    path: `${__dirname}/build/web`,
    filename: `./${settings.buildName}.[name].js`,
    assetModuleFilename: './assets/[name][ext]',
  },
  plugins: [
    ...commonConfig(settings).plugins,
    new HtmlWebpackPlugin({
      template: settings.htmlTemplate,
      minify: {
        removeComments: false,
      },
    }),
  ],
  devServer: {
    static: `./build/${settings.buildName}`,
    historyApiFallback: true,
    host: require('os').hostname().toLowerCase(),
    port: settings.devPort,
    open: false,
  },
})


module.exports = [
  devElectronConfig(electronSettings),
  buildElectronConfig(electronSettings),
  devRenderConfig(renderSettings),
  buildRenderConfig(renderSettings),
  webConfig(webSettings),
]
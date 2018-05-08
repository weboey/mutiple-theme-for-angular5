const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成index.html
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理dist目录
module.exports = {
    entry: {
      'vendor': './src/polyfills.ts',
      'app': './src/main.ts'
    },
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/', //  /mutiple-theme-for-angular/dist/
      filename: '[name].bundle.js'
    },
    resolve: {
      unsafeCache: true,
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: [
        '.js', '.ts','.json'
      ]
    },
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, 'src'),
                use: ['awesome-typescript-loader', 'angular2-template-loader'],
                exclude: [/node_modules/,/\.(spec|e2e)\.ts$/]
            },
            {
              test: /\.html$/,
              use: 'html-loader?-minimize' // raw-loader 也可以
            } ,
            {
              test: /\.css$/,
              use: 'raw-loader'
            }
        ]
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CleanWebpackPlugin(['./dist']), //Clean remove files before build
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: true,
        chunks: ['vendor', 'app'],
        filename: 'index.html'
      })
    ],
    devServer: {
      contentBase: './dist',
      compress: true,
      port: 52581
    }
};

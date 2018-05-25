const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成index.html
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理dist目录
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 将样式表抽离成专门的单独文件。这样，样式表将不再依赖于 JavaScript：
const extractSass = new ExtractTextPlugin({
  filename: 'style.[hash].css'
});

// 主题 Loader 的集合
const THEME_PATH = './src/themes/prebuilt';
const styleLoaders = [{ loader: 'css-loader' }, { loader: 'sass-loader' }];
const themeFileNameSet = fs.readdirSync(path.resolve(THEME_PATH));
const resolveToThemeStaticPath = fileName => path.resolve(THEME_PATH, fileName);
const themePaths = themeFileNameSet.map(resolveToThemeStaticPath);
const getThemeName = fileName => `theme-${path.basename(fileName, path.extname(fileName))}`;
const themesExtractLessSet = themeFileNameSet.map(fileName => new ExtractTextPlugin(`${getThemeName(fileName)}.css`));
const themeLoaderSet = themeFileNameSet.map((fileName, index) => {
  return{
    test: /\.(scss|css)$/,
    include: resolveToThemeStaticPath(fileName),
    loader: themesExtractLessSet[index].extract({
      use: styleLoaders
    })
  }
});

module.exports = {
    entry: {
      'vendor': './src/polyfills.ts',
      'app': './src/main.ts',
      'themes': './src/themes.ts'
    },
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/mutiple-theme-for-angular/dist/', //  /mutiple-theme-for-angular/dist/
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
            exclude: [/\/node_modules/,/\/build/,/\.(spec|e2e|task_helpers)\.ts$/]
          },
          {
            test: /\.html$/,
            use: 'html-loader?-minimize' // raw-loader 也可以
          } ,
          {
            test: /\.(scss|sass|css)$/,
            use: ['raw-loader']
          },
          // {
          //   test: /\.(scss|sass)$/,
          //   exclude: themePaths,
          //   use: [
          //     {
          //       "loader": "raw-loader"
          //     },
          //     {
          //       "loader": "sass-loader",
          //       "options": {
          //         "sourceMap": true,
          //         "precision": 8,
          //         "includePaths": []
          //       }
          //     }
          //   ]
          // },
          ...themeLoaderSet
        ]
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CleanWebpackPlugin(['./dist']), //Clean remove files before build
      extractSass,
      ...themesExtractLessSet,
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: true,
        filename: 'index.html',
        excludeChunks: ['themes']
      }),
      new webpack.DefinePlugin({
        'process.env.themes': JSON.stringify(themeFileNameSet.map(fileName => fileName.replace('.scss', '')))
      })
    ],
    devServer: {
      contentBase: './dist',
      compress: true,
      inline:true, // 当源文件改变时会自动刷新页面
      port: 52581
    }
};

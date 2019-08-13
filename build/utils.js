'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const glob = require('glob');
const pathSrc = path.resolve(__dirname, '../src');

// 指定开发模式下需要加载的模块（可以做到只加载当前模块，提高开发效率）
// index模块为必须，all 为所有
// ['index'],

const devModules = ['index'];
// 获取入口集合
const getEntries = function(suffix, polyfill) {
  // 自动获取
  const entryHtml = glob.sync(pathSrc + '/views/**/app.html'); // 根据html来
  const entries = {};
  entryHtml.forEach((filePath) => {
    // views/index/app.html --> views/index   chunk有'/'则js/css会有相应的目录
    let _chunk = filePath.split(pathSrc.replace(/\\/g, '/') + '/')[1]; // views/index/app.html
    _chunk = _chunk.substring(0, _chunk.lastIndexOf('/'));
    let flag = true;
    if (process.env.NODE_ENV !== 'production') {
      flag = false;
      for (let item of devModules) {
        if (item && (_chunk.indexOf('views/' + item) >= 0 || item === 'all')) {
          flag = true;
          break;
        }
      }
    }
    // views/workshop/work-slitting.html
    if (flag) {
      let arr = _chunk.split('/'), larr = [], rarr = [];
      // console.log(arr) // [ 'views', 'workshop', 'work', 'sllitting', 'slitting']
      // -->> views/workshop/work-slitting.html
      larr = arr.slice(0, 2);
      _chunk = larr.join('/');
      if (arr.length > 2) {
        rarr = arr.slice(2, arr.length);
        _chunk = _chunk + '/' + rarr.join('-');
      }
      if (suffix) {
        filePath = filePath.replace('.html', suffix);
      }
      if (polyfill) {
        entries[_chunk] = ['babel-polyfill', filePath];
      } else {
        entries[_chunk] = filePath;
      }
    }
  });
  //{ 'views/index/index': 'F:/webui/multiple-pages/demo/src/views/index/index.js',
  //  'views/user/user': 'F:/webui/multiple-pages/demo/src/views/user/user.js' }
  // 自动指定，可指定模块
  // const entries = {
  //   'views/index/index': pathSrc + '/views/index/index/index' + suffix, // 默认页面/登录
  //   // 车间MES
  //   'views/workshop/w4mm': pathSrc + '/views/workshop/work/w4mm/w4mm' + suffix, // 4mm分条机作业管理
  //   'views/workshop/m4mm': pathSrc + '/views/workshop/monitor/m4mm/m4mm' + suffix, // 4mm分条机作业管理
  // };
  return entries;
};
// 多入口配置（入口JS固定为main.js）
exports.entries = function() {
  // ['babel-polyfill', './src/main.js']
  let _entries = getEntries('.js', true);
  return _entries;
};
//多页面输出配置
exports.htmlPlugins = function() {
  let entryHtmls = getEntries('.html');
  let arr = [];
  for (let _chunk in entryHtmls) {
    console.log('loading chunk:', _chunk);
    // _chunk ：views/index/index
    let conf = {
      // favicon: pathSrc + '/assets/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      template: entryHtmls[_chunk], // html模板路径
      // filename: 'views/' + fileName, // 生成的html存放路径，相对于path
      filename: _chunk + '.html',
      chunks: [_chunk],
      inject: true  // js插入的位置，true/'head'/'body'/false
    };
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        chunks: ['manifest', 'vendor', _chunk],
        minify: {
          // removeAttributeQuotes: true, // 删除可删除的引号
          removeComments: true, // 移除HTML中的注释
          collapseWhitespace: true // 删除空白符与换行符
        },
        chunksSortMode: 'dependency'
      })
    }
    arr.push(new HtmlWebpackPlugin(conf));
  }
  return arr;
};

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        // 解决打包后背景图片路径不对的问题
        // static/css/views/index/index.css
        // ../../../../static/img/xx.jpg
        publicPath: '../../../', // 注意: 此处根据路径, 自动更改
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

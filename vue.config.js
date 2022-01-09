// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cdn = {
  js: [
    // 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
    'https://cdn.staticfile.org/vue/2.6.6/vue.min.js',
    'https://ydcommon.51yund.com/vue/vue-router.min.js',
    'https://ydcommon.51yund.com/vue/axios.min.js',
    'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js',
    'https://cdn.staticfile.org/element-ui/2.8.2/index.js',
    'https://ydcommon.51yund.com/vue/crypto-js.min.js'
  ],
  css: [
    'https://cdn.staticfile.org/element-ui/2.8.2/theme-chalk/index.css',
    'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css'
  ]
}

module.exports = {
  publicPath:
    process.env.env_config === 'prod'
      ? 'https://ydcommon.51yund.com/'
      : process.env.env_config === 'test'
      ? '/vapps/calory/'
      : '/',
  // 设置跨域
  crossorigin: 'anonymous',
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   * */
  productionSourceMap: false,
  transpileDependencies: ['swiper', 'dom7'],

  // 它支持webPack-dev-server的所有选项
  devServer: {
    host: 'localhost',
    port: 8083, // 端口号
    https: false, // https:{type:Boolean}
    open: true //配置自动启动浏览器
    // proxy: {  // 配置跨域处理
    //     '/resource': {
    //       target: 'http://192.168.100.230:10999',
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '^/resource': '/resource'
    //       }
    //     }
    // }
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((options) => {
      options[0].cdn = cdn
      return options
    })
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      'crypto-js': 'CryptoJS',
      nprogress: 'NProgress'
    }
    // 这是七牛找不到资源时的紧急处理方法，通过修改hash位数修改编译后的资源文件名
    // output: {
    //     filename: `js/[name].[hash:6].js`,
    //     chunkFilename: `js/[name].[hash:6].js`
    // },
    // plugins: [
    //     new MiniCssExtractPlugin({
    //         filename: `css/[name].[hash:6].css`,
    //         chunkFilename: `css/[name].[hash:6].css`
    //     })
    // ]
  }
}

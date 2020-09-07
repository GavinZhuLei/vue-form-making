const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  publicPath: '/vue-form-making/',
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 本地开发环境请求的代理配置
    proxy: {
      '/dev-api/': {
        target: 'http://127.0.0.1:8099',
        changeOrigin: true,
        pathRewrite: {
          '/': '/'
        }
      }
    }
  },
  configureWebpack: config => {
    let plugins = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_debugger: false,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      })
    ]
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}

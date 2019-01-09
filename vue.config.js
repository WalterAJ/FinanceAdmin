const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {//配置跨域
        '/api': {
            target: 'http://localhost:3000/api/',//这里后台的地址模拟的;应该填写你们真实的后台接口
            ws: true,
            changOrigin: true,//允许跨域
            pathRewrite: {
                '^/api': ''//请求的时候使用这个api就可以
            }
        }
        
    }
  }

  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   open: true, //浏览器自动打开页面
  //   host: "localhost", //如果是真机测试，就使用这个IP
  //   port: 8080,
  //   https: false,
  //   hotOnly: false, //热更新（webpack已实现了，这里false即可）
  //   devServer: {
  //     open: true,
  //     host: 'localhost',
  //     port: 8080,
  //     https: false,
  //     //以上的ip和端口是我们本机的;下面为需要跨域的
  //     proxy: {//配置跨域
  //         '/api': {
  //             target: 'http://localhost:3000/api/',//这里后台的地址模拟的;应该填写你们真实的后台接口
  //             ws: true,
  //             changOrigin: true,//允许跨域
  //             pathRewrite: {
  //                 '^/api': ''//请求的时候使用这个api就可以
  //             }
  //         }
          
  //     }
  //   }
  // }
}

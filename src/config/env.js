// 环境配置
let appId = 102 //sso登录服务的appid，传0表示走老的授权登录
let appVersion = 1 //sso登录服务的版本，默认为第一版
let logFlag = {
  dev: false, // 开发和测试环境是否上报log
  from: false, // 是否上传页面来源
  packageName: 'web-init'
}
const isDevEnv = process.env.NODE_ENV == 'development'
let basePath = isDevEnv ? devBasePath : prodBasePath // api请求地址
let devBasePath = 'http://192.168.100.230:10999'
let prodBasePath = 'http://192.168.100.230:10999'
let socketPath = 'ws://192.168.100.230:10999/socket' // socket请求地址
let ssoPath = 'https://sso.51yund.com' // 授权登录地址
let localPath = 'https://51yund.com' // 获取定位地址
let logPath = 'https://api.51yund.com' // 上传日志地址
let jumpPath = 'https://d.51yund.com' // 跳转登录地址
let filterErr = ['sskey过期'] //过滤掉某些错不上报

export {
  basePath,
  ssoPath,
  localPath,
  jumpPath,
  logPath,
  logFlag,
  appId,
  appVersion,
  filterErr,
  socketPath
}

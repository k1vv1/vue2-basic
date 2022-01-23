// 全局注入
import './rem'
import {
  injectTool
} from './tool'
import injectHttp from './http'
import errorLog from './errorHandler.js'

export const injectGlobal = () => {
  injectTool()
  injectHttp()
  errorLog()
}

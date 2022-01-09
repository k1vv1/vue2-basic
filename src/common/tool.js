import * as config from '@/config/env'
import store from '@/store/index'
import urls from '@/server/urls'
const tool = {}

export const injectTool = () => {
  if (typeof window.tool == 'undefined') {
    window.tool = tool
  }
}

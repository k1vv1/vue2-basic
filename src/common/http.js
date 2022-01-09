// 封装axios请求
import qs from 'qs'
import router from '../router/index'
import { basePath } from '@/config/env'
import urls from '@/server/urls'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: basePath,
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const post = async (url, params) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, qs.stringify(params))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        const errRes = err.response
        handleHttpErr(errRes)
        reject(err)
      })
  })
}

const get = (url, params) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        const errRes = err.response
        handleHttpErr(errRes)
        reject(err)
      })
  })
}

const del = (url, params) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, {
        params: params
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        const errRes = err.response
        handleHttpErr(errRes)
        reject(err)
      })
  })
}

const patch = async (url, params) => {
  return new Promise((resolve, reject) => {
    instance
      .patch(url, qs.stringify(params))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        const errRes = err.response
        handleHttpErr(errRes)
        reject(err)
      })
  })
}

const upload = async (url, params) => {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return new Promise((resolve, reject) => {
    instance
      .post(url, params, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        const errRes = err.response
        handleHttpErr(errRes)
        reject(err)
      })
  })
}

export function down(url, params) {
  let config = {
    responseType: 'blob'
  }
  return new Promise((resolve, reject) => {
    instance
      .post(url, qs.stringify(params), config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        const errRes = err.response
        handleHttpErr(errRes)
        reject(err)
      })
  })
}

instance.interceptors.response.use(
  (config) => {
    NProgress.done()
    return config
  },
  (error) => {
    if (error.message.includes('timeout')) {
      Message.warning('网络超时')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

instance.interceptors.request.use(async (config) => {
  NProgress.start()
  const url = config.url
  const method = config.method.toUpperCase()
  const withParamMethods = ['GET', 'DELETE']
  const methodFlag = withParamMethods.some((item) => item == method)
  let params = methodFlag ? config.params : qs.parse(config.data)
  const curTimeStamp = new Date().getTime() / 1000
  const curDate = utils.formatDate(curTimeStamp, 'yyyy-MM-dd hh:mm:ss')
  const authStr = await _hamcShaV2(url, method, params, curDate)
  config.headers['X-Authorization'] = authStr
  config.headers['X-Authorization-Date'] = curDate
  config.headers['Client-Token'] = window.localStorage.getItem('token')
  config.headers['Client-ID'] = window.localStorage.getItem('userId')
  return config
})

export default () => {
  if (typeof window.$nhttp == 'undefined') {
    window.$nhttp = {
      post: post,
      get: get,
      patch: patch,
      delete: del,
      upload: upload,
      down: down
    }
  }
}

function handleHttpErr(errRes) {
  const errData = errRes.data
  const codeFlag = errData.code
  if (codeFlag == 10103 || codeFlag == 10104) {
    localStorage.removeItem('authKey')
    localStorage.removeItem('authSecret')
    instance(errRes.config)
  } else if (codeFlag == 10122) {
    Message.warning('登录过期，请重新登录')
    localStorage.clear()
    router.replace('/login')
  } else {
    const msg = codeFlag ? errData.message : '请求异常，请稍后重试'
    Message.error(msg)
  }
}

function getAuthorizeInfo() {
  return axios({
    method: 'get',
    url: basePath + nurls.auth,
    params: {
      source: 'web'
    }
  })
    .then(function (res) {
      return res
    })
    .catch((res) => {
      location.href =
        'https://ydcommon.51yund.com/circle_html/error_index/errIndex.html'
    })
}
async function _hamcShaV2(path, method, params = {}, datetime) {
  let key = localStorage.getItem('authKey')
  let secret = localStorage.getItem('authSecret')
  if (!key || !secret) {
    const authInfo = await getAuthorizeInfo()
    key = authInfo.data.business_key
    secret = authInfo.data.business_secret
    localStorage.setItem('authKey', key)
    localStorage.setItem('authSecret', secret)
  }
  console.log(params)
  let sortParamsEncode = decodeURIComponent(changeDataType(ksort(params)))
  let encryptStr =
    path + '|' + method.toUpperCase() + '|' + sortParamsEncode + '|' + datetime
  let digest = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(encryptStr, secret)
  )
  const authStr = `${key} ${digest}`
  return authStr
}

function ksort(unordered) {
  const ordered = Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key]
      return obj
    }, {})
  return ordered
}
var nextStr = ''

function changeDataType(obj) {
  let str = ''
  if (typeof obj == 'object') {
    for (let i in obj) {
      if (typeof obj[i] != 'function' && typeof obj[i] != 'object') {
        str += i + '=' + obj[i] + '&'
      } else if (typeof obj[i] == 'object') {
        nextStr = ''
        str += changeSonType(i, obj[i])
      }
    }
  }
  return str.replace(/&$/g, '')
}

function changeSonType(objName, objValue) {
  if (typeof objValue == 'object') {
    for (let i in objValue) {
      if (typeof objValue[i] != 'object') {
        let value = objName + '[' + i + ']=' + objValue[i]
        nextStr += encodeURI(value) + '&'
      } else {
        changeSonType(objName + '[' + i + ']', objValue[i])
      }
    }
  }
  return nextStr
}

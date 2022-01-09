import Vue from 'vue'
/**
 * 取小数位的精度   页面用法：{{'13232.1' | doubleNum}} 返回值：13232.10
 * @param {Object} value     //需要匹配小数位的原始值
 * @param {Object} d         //小数位的位数（可不传，不传默认保留两位小数）
 */
Vue.filter('doubleNum', function (value, d) {
  if (value == '--') {
    return value
  }
  d = d ? d : '2'
  if (value) {
    return parseFloat(value).toFixed(d)
  } else {
    // return '--'
    return (0).toFixed(d)
  }
})

/**
 * 千分位符   页面用法：{{'13232.1' | thousand}}  返回值：13,232.1
 * @param {Object} value     //需要匹配的原始值
 * @param {Object} d         //需要保留的小数位的位数（可不传，不传保留原始小数位）
 */
Vue.filter('thousand', function (value, d) {
  if (value) {
    if (d) value = parseFloat(value).toFixed(d)
    value = value.toString()
    var re = /\d{1,3}(?=(\d{3})+$)/g
    var n1 = value.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
      return s1.replace(re, '$&,') + s2
    })
    return n1
  }
})

/**
 * 日期格式重置   页面用法：{{'26565353' | formatDate(yyyy/MM/dd hh:mm)}}  返回值：'2017/08/22 18:30'
 */
Vue.filter('formatDate', function (value, fmt) {
  if (!value) return value
  let timeSc = new Date(value * 1000)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (timeSc.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': timeSc.getMonth() + 1,
    'd+': timeSc.getDate(),
    'h+': timeSc.getHours(),
    'm+': timeSc.getMinutes(),
    's+': timeSc.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }

  function padLeftZero(str) {
    return ('00' + str).substr(str.length)
  }
  return fmt
})

/**
 * 时间格式重置   页面用法：{{'18:30:26' | formatTime}}  返回值：'18:30'
 * @param {Object} value     //需要匹配的原始值
 */
Vue.filter('formatTime', function (value) {
  if (value) {
    if (value == '23:59:59') {
      return '24:00'
    } else {
      return value.slice(0, 5)
    }
  }
})

//秒转时长   1314 => 00:21:54
Vue.filter('formatDuration', function (value, fmt) {
  value = +value
  if (value <= 0) return 0
  let o = {
    'd+': ~~(value / 86400),
    'h+': ~~((value % 86400) / 3600),
    'm+': ~~(((value % 86400) % 3600) / 60),
    's+': ((value % 86400) % 3600) % 60
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : utils.padLeftZero(str)
      )
    }
  }
  return fmt
})

/**
 * 格式重置   返回百分比
 * @param {Object} value     //需要匹配的原始值
 */
Vue.filter('percent', function (value) {
  if (value) {
    return parseFloat(value).toFixed(2) + '%'
  } else {
    return (0).toFixed(2) + '%'
  }
})

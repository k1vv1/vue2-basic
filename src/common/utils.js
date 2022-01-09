const utils = {
  padLeftZero: function (str) {
    //个位数的时分秒拼接0
    str = str + ''
    return ('00' + str).substr(str.length)
  },
  formatDate: function (value, fmt) {
    if (!value) return ''
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
  },

  //秒转时长   1314 => 00:21:54
  formatDuration: (value, fmt) => {
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
  },

  formatNumber: (n) => {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  // 去除首尾空格
  trimStr(str) {
    return str.replace(/^\s*|\s*$/g, '')
  },

  preloadImg(list, callback) {
    return new Promise((resolve, reject) => {
      let loadLen = 0
      list.forEach((item) => {
        let img = new Image()
        img.src = item
        img.onload = () => {
          loadLen++
          if (loadLen === list.length) {
            callback()
          }
        }
      })
    })
  },

  throttle(fn, delay) {
    let last = 0 // 上次触发时间
    return (...args) => {
      const now = Date.now()
      if (now - last > delay) {
        last = now
        fn.apply(this, args)
      }
    }
  },

  debounce(fn, delay) {
    let timer
    return (...args) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  },
  voicePrompt: function (readWords) {
    new Audio(
      'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=' +
        encodeURI(readWords)
    ).play()
  }
}

export default () => {
  if (typeof window.utils == 'undefined') {
    window.utils = utils
  }
}

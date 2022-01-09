import { socketPath } from '../config/env'
import { Message } from 'element-ui'
class WebSocketClass {
  constructor(url, startText, cb) {
    this.url = url
    this.startText = startText
    this.cb = cb
    this.instance = null
    this.connect(url, startText, cb)
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new WebSocketClass()
    }
    return this.instance
  }

  connect(url, startText, cb) {
    this.ws = new WebSocket(socketPath + url)
    this.ws.onopen = (e) => {
      this.status = 'open'
      Message.success('设备连接成功')
      console.log(`设备连接成功`, e)
      this.heartCheck()
      this.getMessage(startText, cb)
    }
  }

  heartCheck() {
    // 心跳机制的时间可以自己与后端约定
    this.pingPong = 'ping' // ws的心跳机制状态值
    this.pingInterval = setInterval(() => {
      if (this.ws.readyState === 1) {
        // 检查ws为连接状态 才可发送
        this.ws.send('ping') // 客户端发送ping
      }
    }, 10000)
    this.pongInterval = setInterval(() => {
      if (this.pingPong === 'ping') {
        this.closeHandle('pingPong没有改变为pong') // 没有返回pong 重启webSocket
      }
      // 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启
      console.log('返回pong')
      this.pingPong = 'ping'
    }, 20000)
  }

  closeHandle(e = 'err') {
    // 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连
    if (this.status !== 'close') {
      console.log(`断开，重连websocket`, e)
      if (this.pingInterval !== undefined && this.pongInterval !== undefined) {
        // 清除定时器
        clearInterval(this.pingInterval)
        clearInterval(this.pongInterval)
      }
      this.connect(this.url, this.startText, this.cb) // 重连
    } else {
      console.log(`websocket手动关闭,或者正在连接`)
    }
  }

  getMessage(startText, cb) {
    this.ws.send(startText)
    this.ws.onmessage = (e) => {
      const res = JSON.parse(e.data)
      if (res.pong === 'pong') {
        this.pingPong = 'pong' // 服务器端返回pong,修改pingPong的状态
      } else {
        Message.warning(res.message)
      }
      cb(res)
    }
  }

  close(closeText) {
    clearInterval(this.pingInterval)
    clearInterval(this.pongInterval)
    this.ws.send(closeText)
    this.status = 'close'
    this.ws.close()
    Message.error('已断开设备连接')
    console.log('close')
  }
}

export default WebSocketClass

import Vue from 'vue'
Vue.directive('drag', {
  //自定义指令                                      JS
  bind: function (el, binding) {
    let oDiv = el //当前元素
    oDiv.onmousedown = function (e) {
      //鼠标按下，计算当前元素距离可视区的距离
      let disX = e.clientX - oDiv.offsetLeft
      let disY = e.clientY - oDiv.offsetTop

      document.onmousemove = function (e) {
        //通过事件委托，计算移动的距离
        let l = e.clientX - disX
        let t = e.clientY - disY
        //移动当前元素
        oDiv.style.left = l + 'px'
        oDiv.style.top = t + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    function onMouseWheel(ev) {
      /*当鼠标滚轮事件发生时，执行一些操作*/
      ev = ev || window.event
      var down = true // 定义一个标志，当滚轮向下滚时，执行一些操作
      down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0
      if (down) {
        oDiv.style.width = oDiv.offsetWidth - 20 + 'px'
      } else {
        oDiv.style.width = oDiv.offsetWidth + 20 + 'px'
      }
      if (ev.preventDefault) {
        /*FF 和 Chrome*/
        ev.preventDefault() // 阻止默认事件
      }
      return false
    }
    addEvent(oDiv, 'mousewheel', onMouseWheel)
    addEvent(oDiv, 'DOMMouseScroll', onMouseWheel)

    function addEvent(obj, xEvent, fn) {
      if (obj.attachEvent) {
        obj.attachEvent('on' + xEvent, fn)
      } else {
        obj.addEventListener(xEvent, fn, false)
      }
    }
  }
})

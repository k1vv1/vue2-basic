;
(function (doc, win) {
  const docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      let clientWidth = docEl.clientWidth
      if (!clientWidth) return
      clientWidth = clientWidth < 1240 ? 1240 : clientWidth
      docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px'
    }
  if (!doc.addEventListener) return
  recalc()
  win.addEventListener(resizeEvt, recalc, false)
})(document, window)

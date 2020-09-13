import config from '@/config/defaultSettings'

// 设置页面标题
export const setDocumentTitle = function (title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  // 兼容手机端
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}
// 页面标题
export const domTitle = config.title

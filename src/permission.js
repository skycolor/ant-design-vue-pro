// 路由、vux、localStorage
import router from './router'
import store from './store'
import storage from 'store'
// 进度条
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'
// antd的通知提示框
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
// 为了获取登录后的用户标示符，其它项目可以用userid来处理
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false })

// 白名单
const whiteList = ['login']
// 登录路由
const loginRoutePath = '/user/login'
// 默认路由
const defaultRoutePath = '/'

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 设置标题
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  // 有token
  if (storage.get(ACCESS_TOKEN)) {
    // 去登录
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // 查看登录用户角色
      if (store.getters.roles.length === 0) {
        // 获取登录者信息
        store.dispatch('GetInfo').then(res => {
          const roles = res.result && res.result.role
          // 生成动态路由
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // 此时不会留下路由跳转历史记录
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
        }).catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout').then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
        })
      } else {
        next()
      }
    }
  } else {
    // 在免登录白名单，直接进入
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      // 如果当前页面是login页面，则无法触发afterEach
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 结束进度条
  NProgress.done()
})

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'login' } },
    {
      path: '/login',
      name: 'login',
      meta: {
        type: 'login'
      },
      component: () => import('@/views/login')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home'),
      children: [
        {
          path: '/home/basiclist',
          name: 'basiclist',
          component: () => import('@/views/basiclist')
        },
        {
          path: '/home/basicform',
          name: 'basicform',
          component: () => import('@/views/basicform')
        },
        {
          path: '/home/jumptest',
          name: 'jumptest',
          component: () => import('@/views/jumptest'),
          meta: {
            title: '跳转测试'
          }
        },
        {
          path: '/home/jumptest/details',
          name: 'jumptestdetails',
          component: () => import('@/views/jumptest/details'),
          meta: { title: '跳转测试详情页', active: '/home/jumptest' }
        },
        {
          path: '/home/dynamiccomponents',
          name: 'dynamiccomponents',
          component: () => import('@/views/dynamiccomponents')
        },
        {
          path: '/home/editmodal',
          name: 'editmodal',
          component: () => import('@/views/editmodal')
        }
      ]
    }
  ]
})

export default router

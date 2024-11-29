import * as Consty from '@/datasource/const'
import { CommonService } from '@/services'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    },
    {
      path: '',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/',
      component: () => import('@/views/IndexView.vue'),
      meta: {
        roles: [Consty.ADMIN, Consty.TEACHER]
      },
      children: [
        {
          path: 'admin',
          component: () => import('@/views/admin/IndexView.vue'),
          meta: {
            roles: [Consty.ADMIN]
          }
        },
        {
          path: 'teacher',
          component: () => import('@/views/teacher/IndexView.vue'),
          meta: {
            roles: [Consty.TEACHER]
          },
          children: [
            {
              path: '',
              component: () => import('@/views/teacher/HomeView.vue')
            },
            {
              path: 'schedule',
              component: () => import('@/views/teacher/HomeView.vue')
            },
            {
              path: 'importSchedule',
              component: () => import('@/views/teacher/ImportScheduleView.vue')
            },
            {
              path: 'bookLab',
              component: () => import('@/views/teacher/BookLabView.vue')
            }
          ]
        }
      ]
    }
  ]
})

//路由守卫
router.beforeEach(to => {
  if (!to.meta.roles) {
    return true
  }

  const role = (to.meta.roles as string[]).find(r => r == CommonService.getRole())
  if (role) {
    return true
  }
  sessionStorage.clear()
  return '/login'
})

export default router

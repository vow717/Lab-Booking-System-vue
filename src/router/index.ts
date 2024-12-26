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
          path: 'settings',
          component: () => import('@/views/header/UserSettingView.vue')
        },
        {
          path: 'user',
          component: () => import('@/views/UserView.vue'),
          meta: {
            roles: [Consty.ADMIN, Consty.TEACHER]
          },
          children: [
            {
              path: 'news',
              component: () => import('@/views/header/NewsView.vue')
            },
            {
              path: 'self',
              component: () => import('@/views/header/SelfView.vue')
            }
          ]
        },
        {
          path: 'self',
          component: () => import('@/views/header/SelfView.vue'),
          meta: {
            roles: [Consty.ADMIN]
          }
        },
        {
          path: 'admin',
          component: () => import('@/views/admin/IndexView.vue'),
          meta: {
            roles: [Consty.ADMIN]
          },
          children: [
            {
              path: 'lab',
              component: () => import('@/views/admin/LabView.vue')
            },
            {
              path: 'user',
              component: () => import('@/views/admin/UserView.vue')
            },
            {
              path: 'reset',
              component: () => import('@/views/admin/ResetView.vue')
            },
            {
              path: 'notice',
              component: () => import('@/views/admin/NoticeView.vue'),
              children: [
                {
                  path: 'notices/:id',
                  component: import('@/views/admin/OperationNoticeView.vue')
                }
              ]
            }
          ]
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
              path: 'Course',
              component: () => import('@/views/teacher/editcourse/ExperimentView.vue')
            },
            {
              path: 'bookLab',
              component: () => import('@/views/teacher/BookLabView.vue')
            },
            {
              path: 'reservationmanager',
              component: () => import('@/views/teacher/reservationmanager/ReservationsView.vue')
            },
            {
              path: 'fastbook',
              component: () => import('@/views/teacher/FastBookView.vue')
            },
            {
              path: 'notice',
              component: () => import('@/views/teacher/NoticeView.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
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

import * as consty from '@/datasource/const'
import type { Notice, User } from '@/datasource/type'
import { useGet, usePost } from '@/fetch'
import router from '@/router'
import { useLabsStore } from '@/stores/LabsStore'
import { useNoticesStore } from '@/stores/NoticesStore'
import { useTeacherStore } from '@/stores/TeacherStore'
import { useUsersStore } from '@/stores/UsersStore'
import { useUserStore } from '@/stores/UserStore'
import type { Ref } from 'vue'
import { ELLoading, StoreMapCache } from './Decorators'

const noticesStore = useNoticesStore()
export class CommonService {
  static loginGuardService = async (user: User) => {
    const resp = await usePost<User>('login', user)
    const us = resp.data.value?.data
    const token = resp.response.value?.headers.get('token')
    const role = resp.response.value?.headers.get('role')
    console.log('us:', us, 'token', token, 'role', role)
    if (!us || !token || !role) {
      throw '登录错误'
    }
    useUserStore().userS.value = us
    useUserStore().setUserSessionStorage(us)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('role', role)

    if (user.account == user.password) {
      router.push('/settings')
      return
    }
    if (user.role === consty.ADMIN) {
      router.push('/user/self')
    }
    let path = '/login'
    switch (role) {
      case consty.ADMIN:
        path = '/admin'
        console.log('/admin')

        break
      case consty.TEACHER:
        path = '/teacher'
        console.log('/teacher')
        break
    }
    router.push(path)
  }

  static getRole() {
    return sessionStorage.getItem('role')
  }
  //清空所有缓存store
  static clearAllStore() {
    useTeacherStore().clear()
    useLabsStore().clear()
    useUsersStore().clear()
    useNoticesStore().clear()
  }

  static updateSelfPassword = async (pwd: string) => {
    await usePost('passwords', { password: pwd })
  }
  //通知
  @ELLoading()
  @StoreMapCache(noticesStore.groupNoticesMapS)
  static async listNoticeService(page: number) {
    const data = await useGet<Notice[]>(`/notice/page/${page}`)
    return data as unknown as Ref<{ count: number; notices: Notice[] }>
  }
}

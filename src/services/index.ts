import * as consty from '@/datasource/const'
import type { User } from '@/datasource/type'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

import { usePatch, usePost } from '@/fetch'
import { useInfosStore } from '@/stores/InfosStore'
import { useTeacherStore } from '@/stores/TeacherStore'
import { useUsersStore } from '@/stores/UsersStore'
import type { Ref } from 'vue'

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
    useInfosStore().clear()
    useUsersStore().clear()
  }
  static async updateSelfPassword(pass: String) {
    const data = await usePatch<String[]>(`users/${pass}`, pass)
    return data as unknown as Ref<User[]>
  }
}

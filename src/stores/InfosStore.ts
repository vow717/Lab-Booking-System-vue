import type {Lab,User,Notice } from '@/datasource/type'
import { shallowRef } from 'vue'
const groupUsersS = shallowRef<User[]>()
const groupLabsS = shallowRef<Lab[]>()
const groupNoticesS = shallowRef<Notice[]>()
const clear = () => {
    groupUsersS.value = undefined
  groupLabsS.value = undefined
  groupNoticesS.value = undefined
}
const store = { groupUsersS, groupLabsS,groupNoticesS, clear }
export const useInfosStore = () => {
  return store
}

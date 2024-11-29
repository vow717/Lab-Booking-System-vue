import type {Lab,User,notice } from '@/datasource/type'
import { shallowRef } from 'vue'
const groupUsersS = shallowRef<User[]>()
const groupLabsS = shallowRef<Lab[]>()
const groupNoticesS = shallowRef<notice[]>()
const clear = () => {
    groupUsersS.value = undefined
  groupLabsS.value = undefined
  groupNoticesS.value = undefined
}
const store = { groupUsersS, groupLabsS,groupNoticesS, clear }
export const useInfosStore = () => {
  return store
}

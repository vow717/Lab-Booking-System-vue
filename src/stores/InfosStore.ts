import type {Lab,User,Notice } from '@/datasource/type'
import { shallowRef } from 'vue'
const groupUsersS = shallowRef<User[]>()
const groupLabsS = shallowRef<Lab[]>()
const groupNoticesS = shallowRef<{count:number,notices:Notice[]}>({count:0,notices:[]})
const clear = () => {
    groupUsersS.value = undefined
  groupLabsS.value = undefined
  groupNoticesS.value = {count:0,notices:[]}
}
const store = { groupUsersS, groupLabsS,groupNoticesS, clear }
export const useInfosStore = () => {
  return store
}

import type {Lab,User,Notice } from '@/datasource/type'
import { shallowRef } from 'vue'

const groupNoticesS = shallowRef<{count:number,notices:Notice[]}>()
const groupNoticesMapS = shallowRef<Map<number,{count:number,notices:Notice[]}>>(new Map())

const clear = () => {
  groupNoticesS.value = undefined
  groupNoticesMapS.value.clear()}
const store = { groupNoticesS,groupNoticesMapS, clear }
export const useNoticesStore = () => {
  return store
}

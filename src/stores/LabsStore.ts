import type {Lab,User,Notice } from '@/datasource/type'
import { shallowRef } from 'vue'
const groupLabsS = shallowRef<Lab[]>()
const clear = () => {
  groupLabsS.value = undefined
}
const store = {  groupLabsS, clear }
export const useLabsStore = () => {
  return store
}

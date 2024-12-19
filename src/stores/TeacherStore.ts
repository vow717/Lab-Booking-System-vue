import type { DEF2Course } from '@/datasource/type'
import { shallowRef } from 'vue'

const myCoursesS = shallowRef<DEF2Course[]>()
const clear = () => {
  myCoursesS.value = undefined
}
const store = { myCoursesS, clear }
export const useTeacherStore = () => {
  return store
}

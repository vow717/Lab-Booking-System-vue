import type { DEF2Course, Reservation } from '@/datasource/type'
import { shallowRef } from 'vue'

const myCoursesS = shallowRef<DEF2Course[]>()
const myReservationsS = shallowRef<Reservation[]>()
const clear = () => {
  myCoursesS.value = undefined
  myReservationsS.value = undefined
}
const store = { myCoursesS, clear, myReservationsS }
export const useTeacherStore = () => {
  return store
}

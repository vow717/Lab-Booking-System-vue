import type { User } from '@/datasource/type'
import { shallowRef } from 'vue'
const allAdminsS = shallowRef<User[]>()
const allTeachersS = shallowRef<User[]>()
const clear = () => {
  allAdminsS.value = undefined
  allTeachersS.value = undefined
}
const store = { allAdminsS, allTeachersS, clear }
export const useUsersStore = () => store
import { useDelete, useGet, usePatch, usePost } from '@/fetch'
import { useInfosStore } from '@/stores/InfosStore'
import type {Lab,User} from '@/datasource/type'
import { ELLoading, StoreCache, StoreClear } from './Decorators'
import { useUsersStore } from '@/stores/UsersStore'
import type { Ref } from 'vue'

const ADMIN = 'admin'

const infosStore = useInfosStore()
const usersStore = useUsersStore()

export class AdminService {
    // 获取所有实验室
  @ELLoading()
   @StoreCache(infosStore.groupLabsS)
    static async listLabsService() {
      const data = await useGet<Lab[]>(`${ADMIN}/labs`)
      return data as unknown as Ref<Lab[]>
    }
    


    @StoreCache(infosStore.groupLabsS, true)
    static async delLabsService(lid: string) {
      const data = await useDelete<Lab[]>(`${ADMIN}/processes/${lid}`)
      return data as unknown as Ref<Lab[]>
    }

    @StoreCache(infosStore.groupLabsS, true)
    static async updateLabService(lab: Lab) {
      // @ts-ignore
      lab.manager = JSON.stringify(lab.manager)
      // @ts-ignore
      const data = await usePatch<Lab[]>(`${TEACHER}/labs`, lab)
      return data as unknown as Ref<Lab[]>
    }

    // 添加实验室
    @StoreCache(infosStore.groupLabsS, true)
    static async addLabService(lab: Lab) {
      const data = await usePost<Lab[]>(`${ADMIN}/processes`, lab)
      return data.data.value?.data as unknown as Ref<Lab[]>
    }
    //添加一个用户
    @StoreCache(infosStore.groupUsersS,true)
    static async addUserService(user:User){
      const data = await usePost<User[]>(`${ADMIN}/users`,user)
      return data.data.value?.data as unknown as Ref<User[]>
    }
      //添加多个用户
      @StoreCache(infosStore.groupUsersS, true)
      @ELLoading()
      static async addUsersService(users: User[]) {
        console.log(users);   
        const data = await usePost<User[]>(`${ADMIN}/users`, users)
        return data.data.value?.data as unknown as Ref<User[]>
      }

      @ELLoading()
    @StoreCache(usersStore.allTeachersS)
     static async listTeachersService() {
       const data = await useGet<User[]>(`${ADMIN}/teachers`)
       return data as unknown as Ref<User[]>
     }  

     @ELLoading()
     static async resetService(account:String){
      const data = await usePost<String>(`${ADMIN}/reset`,account)
      return data.data.value?.data as unknown as Ref<User[]>
     }
}

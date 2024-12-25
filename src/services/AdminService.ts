import { useDelete, useGet, usePatch, usePost } from '@/fetch'
import { useInfosStore } from '@/stores/InfosStore'
import type {Lab,User,Notice} from '@/datasource/type'
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
      const data = await useDelete<Lab[]>(`${ADMIN}/labs/${lid}`)
      return data as unknown as Ref<Lab[]>
    }

    @StoreCache(infosStore.groupLabsS, true)
    @StoreClear(useInfosStore().clear)
    static async updateLabService(lab: Lab) {
      // @ts-ignore
      lab.manager = JSON.stringify(lab.manager)
      const data = await usePatch<Lab[]>(`${ADMIN}/labs/${lab.id}`, lab)
      return data as unknown as Ref<Lab[]>
    }

    // 添加实验室
    @StoreCache(infosStore.groupLabsS, true)
    @StoreClear(useInfosStore().clear)
    static async addLabService(lab: Lab) {
      // @ts-ignore
      lab.manager = JSON.stringify(lab.manager)
      console.log(lab);
      const data = await usePost<Lab[]>(`${ADMIN}/labs`,lab)
      return data.data.value?.data as unknown as Ref<Lab[]>
    }
    //添加一个用户
    @StoreCache(infosStore.groupUsersS,true)
    static async addUserService(user:User){
      console.log(user);
      
      const data = await usePost<User[]>(`${ADMIN}/users`,user)
      return data.data.value?.data as unknown as Ref<User[]>
    }
      //批处理添加多个用户
      @StoreCache(infosStore.groupUsersS, true)
      @ELLoading()
      static async addUsersService(users: User[]) {
        console.log(users);   
        const data = await usePost<User[]>(`${ADMIN}/users/batch`, users)
        return data.data.value?.data as unknown as Ref<User[]>
      }

      //删除单个用户
      @StoreCache(infosStore.groupUsersS, true)
      @ELLoading()
      static async deluserService(uid:String){
        console.log(uid);   
        const data = await useDelete<String>(`${ADMIN}/users/${uid}`)
        return data as unknown as Ref<User[]>
      }

      //添加通知
      @StoreCache(infosStore.groupNoticesS, true)
      @ELLoading()
      static async addNoticeService(notice:Notice){
        console.log(notice);   
        const data = await usePost<Notice[]>(`${ADMIN}/notice`, notice)
        return data.data.value?.data as unknown as Ref<Notice[]>
      }

      //删除一个通知
      @StoreCache(infosStore.groupNoticesS, true)
      @ELLoading()
      static async delNoticeService (nid:string) {
        const data = await useDelete<Notice>(`${ADMIN}/notice/${nid}`)
        return data as unknown as Ref<Notice[]>
      }
      //删除多个通知
      @StoreCache(infosStore.groupNoticesS, true)
      @ELLoading()
      static async delNoticesService (nids:String[]) {
        console.log(nids);  
        const data = await useDelete<String[]>(`${ADMIN}/notices/batch`,nids)
        return data as unknown as Ref<Notice[]>
      }


      @ELLoading()
      @StoreCache(usersStore.allTeachersS)
     static async listTeachersService() {
       const data = await useGet<User[]>(`${ADMIN}/users/teachers`)
       return data as unknown as Ref<User[]>
     }  

     @ELLoading()
     static async resetService(account:String){
      const data = await usePost<String>(`${ADMIN}/reset`,account)
      return data.data.value?.data as unknown as Ref<User[]>
     }

     //修改个人信息
     static async editUserService(user:User){
      const data = await usePatch<String>(`$user/update/${user.id}`,user)
      return data as unknown as Ref<User[]>
     }
}

import { useDelete, useGet, usePatch, usePost } from '@/fetch'
import { useInfosStore } from '@/stores/InfosStore'
import type {Lab,User,Notice} from '@/datasource/type'
import { ELLoading, StoreCache,StoreCacheLength, StoreClear } from './Decorators'
import { useUsersStore } from '@/stores/UsersStore'
import { useUserStore } from '@/stores/UserStore'

import type { Ref } from 'vue'

const ADMIN = 'admin'

const infosStore = useInfosStore()
const usersStore = useUsersStore()
const userStore = useUserStore()
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
      const data = await usePatch<Lab[]>(`${ADMIN}/labs`, lab)
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
    @StoreCache(usersStore.allTeachersS,true)
    static async addUserService(user:User){
      const data = await usePost<User[]>(`${ADMIN}/users`,user)
      return data.data.value?.data as unknown as Ref<User[]>
    }
    //批处理添加多个用户
    @StoreCache(usersStore.allTeachersS, true)
    @ELLoading()
    static async addUsersService(users: User[]) {
      console.log(users);   
      const data = await usePost<User[]>(`${ADMIN}/users/batch`, JSON.stringify(users))
      return data.data.value?.data as unknown as Ref<User[]>
    }

      //删除单个用户
      @StoreCache(usersStore.allTeachersS, true)
      @ELLoading()
      static async deluserService(uid:String){
        console.log(uid);   
        const data = await useDelete<String>(`${ADMIN}/users/teacher/${uid}`)
        return data as unknown as Ref<User[]>
      }

    //通知
      // @StoreCacheLength(infosStore.groupNoticesS, true)
      @ELLoading()
      static async listNoticeService(page:number){ 
        const data = await useGet<Notice[]>(`${ADMIN}/notices/page/${page}`)
        console.log(data);    
        return data as unknown as {count:number,notices:Notice[]}
        // return data as unknown as Ref<{count:number,notices:Notice[]}>
      }

      //添加通知 
      // @StoreCacheLength(infosStore.groupNoticesS, true)
      @ELLoading()
      static async addNoticeService(notice:Notice){
        console.log(notice);   
        const data = await usePost<Notice[]>(`${ADMIN}/notices`, notice)
        return data.data.value?.data as unknown as {count:number,notices:Notice[]}
      }

      @StoreClear(useInfosStore().clear)
      // @StoreCacheLength(infosStore.groupNoticesS, true)
      static async updateNoticeService(page:number,notice:Notice) {
        const data = await usePatch<Notice[]>(`${ADMIN}/notices/page/${page}`, notice)
        console.log(infosStore.groupNoticesS);
        return data as unknown as {count:number,notices:Notice[]}
      }

      
      //删除一个通知
      // @StoreCacheLength(infosStore.groupNoticesS, true)
      @ELLoading()
      static async delNoticeService (page:number,nid:string) {
        const data = await useDelete<Notice>(`${ADMIN}/notices/page/${page}/${nid}`)
        console.log(infosStore.groupNoticesS);    
        return data as unknown as {count:number,notices:Notice[]}
      }
      
      //删除多个通知
      // @StoreCacheLength(infosStore.groupNoticesS, true)
      @ELLoading()
      static async delNoticesService (nids:String[],page:number) {
        console.log(JSON.stringify(nids));  
        const data = await useDelete<String[]>(`${ADMIN}/notices/page/${page}/batch`,nids)
        return data as unknown as {count:number,notices:Notice[]}
      }


      @ELLoading()
      @StoreCache(usersStore.allTeachersS, true)
     static async listTeachersService() {
       const data = await useGet<User[]>(`${ADMIN}/users/teachers`)
       return data as unknown as Ref<User[]>
     }  

     @ELLoading()
     @StoreCache(usersStore.allTeachersS, true)
     static async resetService(account:String){
      const data = await usePatch<String>(`${ADMIN}/reset`,account)
      return data as unknown as Ref<User[]>
     }

     //修改个人信息
     @ELLoading()
      @StoreCache(userStore.userS, true)
     static async editUserService(user:User){
      const data = await usePatch<String>(`$user/update`,user)
      return data as unknown as Ref<User[]>
     }
}

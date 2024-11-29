import { useDelete, useGet, usePatch, usePost } from '@/fetch'
import { useInfosStore } from '@/stores/InfosStore'
import type {Lab} from '@/datasource/type'
import { ELLoading, StoreCache, StoreClear } from './Decorators'
import { useUsersStore } from '@/stores/UsersStore'

import type { Ref } from 'vue'

const ADMIN = 'admin'

const infosStore = useInfosStore()
const usersStore = useUsersStore()
export class AdminService {
    // 获取所有实验室
   @StoreCache(infosStore.groupLabsS)
    static async listLabsService() {
      const data = await useGet<Lab[]>(`${ADMIN}/labs`)
      return data as unknown as Ref<Lab[]>
    }
}
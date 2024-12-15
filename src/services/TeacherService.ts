import type { DEF2Course } from '@/datasource/type'
import { useGet, usePost } from '@/fetch'
import { useTeacherStore } from '@/stores/TeacherStore'
import type { Ref } from 'vue'
import { ELLoading, StoreCache, StoreClear } from './Decorators'

export class TeacherService {
  //获取教师的所有课程
  @ELLoading()
  @StoreCache(useTeacherStore().myCoursesS)
  static async listCoursesService() {
    const data = await useGet<DEF2Course[]>(`teacher/courses`)
    return data as unknown as Ref<DEF2Course[]>
  }

  //添加课程
  @ELLoading()
  @StoreClear(useTeacherStore().clear)
  @StoreCache(useTeacherStore().myCoursesS)
  static async addCourseService(course: DEF2Course) {
    const data = await usePost<DEF2Course>(`teacher/course/add`, course)
    return data as unknown as Ref<DEF2Course>
  }
}

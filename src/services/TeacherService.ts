import type { DEF2Course, LabFree, Reservation } from '@/datasource/type'
import { useDelete, useGet, usePatch, usePost } from '@/fetch'
import { useTeacherStore } from '@/stores/TeacherStore'
import type { Ref } from 'vue'
import { ELLoading, StoreCache, StoreClear } from './Decorators'

export class TeacherService {
  //-----------------课程-----------------
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
  static async addCourseService(courses: DEF2Course[]) {
    const data = await usePost<DEF2Course>(`teacher/courses`, courses)
    return data as unknown as Ref<DEF2Course>
  }
  //修改课程
  @ELLoading()
  @StoreClear(useTeacherStore().clear)
  @StoreCache(useTeacherStore().myCoursesS)
  static async updateCourseService(course: DEF2Course) {
    const data = await usePatch<DEF2Course>(`teacher/courses`, course)
    return data as unknown as Ref<DEF2Course>
  }
  //删除课程
  @ELLoading()
  @StoreClear(useTeacherStore().clear)
  @StoreCache(useTeacherStore().myCoursesS)
  static async deleteCourseService(courseId: number) {
    const data = await useDelete<DEF2Course>(`teacher/course/${courseId}`)
    return data as unknown as Ref<DEF2Course>
  }
  //-----------------预约记录-----------------
  //获取教师的所有预约记录
  static async listReservationsService() {
    const data = await useGet<Reservation[]>(`teacher/reservations`)
    return data as unknown as Ref<Reservation[]>
  }
  //添加预约记录
  static async addReservationService(reservation: Reservation) {
    const data = await usePost<Reservation[]>(`teacher/reservations`, reservation)
    return data as unknown as Ref<Reservation[]>
  }
  //删除预约记录
  static async deleteReservationService(reservationId: string) {
    const data = await useDelete<Reservation>(`teacher/reservation/${reservationId}`)
    return data as unknown as Ref<Reservation>
  }
  //查询day week那天空闲的实验室以及其空余的时间段
  static async listFreeLabService(day: number, week: number) {
    const data = await useGet<LabFree[]>(`teacher/freeLab/${day}/${week}`)
    return data as unknown as Ref<LabFree[]>
  }
}

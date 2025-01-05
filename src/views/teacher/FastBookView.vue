<script setup lang="ts">
import { createElNotificationSuccess } from '@/components/message'
import type { DEF2Course, ReservationOrder } from '@/datasource/type'
import { TeacherService } from '@/services/TeacherService'
import { ElMessageBox } from 'element-plus'
import { ref, watch } from 'vue'

const courses = await TeacherService.listCoursesService()
const reservations = await TeacherService.listReservationsService()
const selectCourse = ref<DEF2Course>()
const selectDay = ref(0)
const selectWeek = ref(0)
const days = [
  { value: 1, label: '周一' },
  { value: 2, label: '周二' },
  { value: 3, label: '周三' },
  { value: 4, label: '周四' },
  { value: 5, label: '周五' },
  { value: 6, label: '周六' },
  { value: 7, label: '周日' }
]
const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
const tempOrder: DEF2Course[] = [
  {
    id: '0',
    name: '补课'
  },
  {
    id: '0',
    name: '考试'
  },
  {
    id: '0',
    name: '讲题'
  },
  {
    id: '0',
    name: '其他'
  }
]
const canSelectCourses = ref<DEF2Course[]>()
//预约课时已经满的课程不显示
canSelectCourses.value = courses.value.filter(course => {
  return (
    reservations.value.filter(reservation => reservation.courseId == course.id).length <
    (course?.total ?? 0)
  )
})
const showFreeLabs = ref([])
//但凡周和星期数改变，就重新查询空余实验室
watch([selectWeek, selectDay], () => {
  showFreeLabs.value = []
})
const findFreeLabs = async () => {
  //查询前先清空之前的查询结果
  showFreeLabs.value = []
  //调用后端接口查询空余实验室
  const freeLabs = await TeacherService.listFreeLabService(selectWeek.value, selectDay.value)
  freeLabs.value.forEach(item => {
    let status1 =
      item.freePeriods.indexOf('1') !== -1
        ? '空闲'
        : reservations.value.find(
              reservation =>
                reservation.day === selectDay.value &&
                reservation.period === 1 &&
                reservation.week === selectWeek.value
            )
          ? '占用'
          : '有课'
    let status2 =
      item.freePeriods.indexOf('2') !== -1
        ? '空闲'
        : reservations.value.find(
              reservation =>
                reservation.day === selectDay.value &&
                reservation.period === 2 &&
                reservation.week === selectWeek.value
            )
          ? '占用'
          : '有课'
    let status3 =
      item.freePeriods.indexOf('3') !== -1
        ? '空闲'
        : reservations.value.find(
              reservation =>
                reservation.day === selectDay.value &&
                reservation.period === 3 &&
                reservation.week === selectWeek.value
            )
          ? '占用'
          : '有课'
    let status4 =
      item.freePeriods.indexOf('4') !== -1
        ? '空闲'
        : reservations.value.find(
              reservation =>
                reservation.day === selectDay.value &&
                reservation.period === 4 &&
                reservation.week === selectWeek.value
            )
          ? '占用'
          : '有课'
    showFreeLabs.value.push({
      laboratoryName: item.laboratoryName,
      laboratoryId: item.laboratoryId,
      1: status1,
      2: status2,
      3: status3,
      4: status4
    })
  })
}
const bookLab = async (
  labId: string,
  labName: string,
  week: number,
  day: number,
  period: number
) => {
  if (selectCourse.value == undefined) {
    alert('请选择课程')
    return
  }
  //调用后端接口预约实验室
  const reservationOrder: ReservationOrder = {
    courseId: selectCourse.value.id,
    courseName: selectCourse.value.name,
    laboratoryId: labId,
    laboratoryName: labName,
    weeks: [week],
    day: day,
    period: period
  }
  const confirmResult = await ElMessageBox.confirm('确定预约此实验室吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  if (confirmResult === 'confirm') {
    await TeacherService.addReservationService(reservationOrder)
    await findFreeLabs()
    createElNotificationSuccess('预约成功')
  } else {
    console.log('已取消预约操作')
  }
}
</script>
<template>
  <div>
    <h3>快速查询空余实验室</h3>
    <el-divider></el-divider>
    <p>选择课程：</p>
    <!-- 这个value-key是为了让el-select组件知道选中的是哪个课程,不加这个属性的话,默认选中的是整个对象，这样的话会有显示问题，比如你不管选中哪个课程，显示的都是第一个课程 -->
    <el-select v-model="selectCourse" value-key="id" placeholder="请选择课程" style="width: 30%">
      <el-option
        v-for="item in courses"
        :key="item.id"
        :label="item.name"
        :value="item"
        :disabled="canSelectCourses?.findIndex(course => course.id === item.id) === -1">
        <!--悬浮如果不能选，提示预约课时已满-->
        <span v-if="canSelectCourses?.findIndex(course => course.id === item.id) === -1">
          {{ item.name }}
          <el-tooltip content="预约课时已满" placement="top">
            <el-tag type="danger">预约课时已满</el-tag>
          </el-tooltip>
        </span>
      </el-option>
      <el-option
        v-for="item in tempOrder"
        :key="item.id"
        :label="item.name"
        :value="item"></el-option>
    </el-select>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="4">
        <span>周数：</span>
        <el-select v-model="selectWeek" placeholder="请选择周数" style="width: 100%">
          <el-option v-for="item in weeks" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <span>星期数：</span>
        <el-select v-model="selectDay" placeholder="请选择星期" style="width: 100%">
          <el-option
            v-for="item in days"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" style="margin-top: 20px">
        <el-button
          type="primary"
          @click="findFreeLabs"
          :disabled="selectDay === 0 || selectWeek === 0">
          查询
        </el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-table :data="showFreeLabs" style="width: 100%" v-if="showFreeLabs.length > 0">
      <el-table-column prop="laboratoryName" label="实验室名"></el-table-column>
      <el-table-column prop="1" label="第1,2节">
        <template #default="{ row }">
          <span style="font-size: large">{{ row[1] }}</span>
          |
          <el-button
            type="primary"
            @click="bookLab(row.laboratoryId, row.laboratoryName, selectWeek, selectDay, 1)"
            :disabled="row[1] != '空闲'">
            预约
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="2" label="第3,4节">
        <template #default="{ row }">
          <span style="font-size: large">{{ row[2] }}</span>
          |
          <el-button
            type="primary"
            @click="bookLab(row.laboratoryId, row.laboratoryName, selectWeek, selectDay, 2)"
            :disabled="row[2] != '空闲'">
            预约
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="3" label="第5,6节">
        <template #default="{ row }">
          <span style="font-size: large">{{ row[3] }}</span>
          |
          <el-button
            type="primary"
            @click="bookLab(row.laboratoryId, row.laboratoryName, selectWeek, selectDay, 3)"
            :disabled="row[3] != '空闲'">
            预约
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="4" label="第7,8节">
        <template #default="{ row }">
          <span style="font-size: large">{{ row[4] }}</span>
          |
          <el-button
            type="primary"
            @click="bookLab(row.laboratoryId, row.laboratoryName, selectWeek, selectDay, 4)"
            :disabled="row[4] != '空闲'">
            预约
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>

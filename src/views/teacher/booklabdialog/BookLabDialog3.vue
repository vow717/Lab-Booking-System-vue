<script setup lang="ts">
import { type DEF2Course, type Reservation, type ReservationOrder } from '@/datasource/type'
import { TeacherService } from '@/services/TeacherService'
import { ElMessageBox } from 'element-plus'
import { computed, ref, watch } from 'vue'

//定义最多可预约的周数
const weekMax = 18

const props = defineProps<{
  course: DEF2Course | null
  closeDialog3: () => void
  lab: DEF2Course
  time: { period: number; day: number } | null
}>()
//前端根据实验室的id和currentCourse的period和day去找到该实验室的预约数据
const reservations = await TeacherService.listLabReservationsService(props.lab.id)
console.log('labName:', props.lab.name, 'reservations:', reservations)
const reservationOrders = ref<Reservation[]>([])
reservationOrders.value = computed(() => {
  return reservations.value.filter(reservation => {
    reservation.courseId === props.course?.id &&
      reservation.period === props.time?.period &&
      reservation.day === props.time?.day
  })
})
//拿到数据后，前端根据数据渲染哪些哪些周的课程被预约了
//这里模拟一下
const weeks = ref<number[]>(reservations?.value?.map(reservation => reservation.week) ?? [])
const wantOrderR = ref<number[]>()

const confirmReservation = async () => {
  //加一个确认提交的modal
  const confirmResult = await ElMessageBox.confirm('确定提交预约吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })

  //向后端提交预约数据
  if (confirmResult === 'confirm') {
    console.log(reservationR.value)
    await TeacherService.addReservationService(reservationR.value)
    wantOrderR.value = []
    props.closeDialog3()
  } else {
    console.log('已取消删除操作')
  }
}

//要提交的预约记录
const reservationR = ref<ReservationOrder>({})
watch(wantOrderR, () => {
  reservationR.value = {
    courseId: props.course?.id,
    courseName: props.course?.name,
    laboratoryId: props.lab.id,
    laboratoryName: props.lab.name,
    weeks: wantOrderR.value,
    period: props.time?.period,
    day: props.time?.day
  }
})
</script>
<template>
  <div>
    <p>课程名称：{{ props.course?.name }}</p>
    <p>实验室名称: {{ props.lab.name }}</p>
    <p>预约情况</p>
    <div>
      <!--多选框-->
      <el-checkbox-group v-model="wantOrderR">
        <!--属性排列，一行占4个？-->
        <el-checkbox
          v-for="week in weekMax"
          :key="week"
          :label="week"
          :disabled="weeks.includes(week)">
          第{{ week }}周
        </el-checkbox>
      </el-checkbox-group>
      <br />
      <div>{{ reservationR }}</div>
      <el-button @click="confirmReservation">确定预约</el-button>
    </div>
  </div>
</template>
<style scoped>
.el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
}
.el-checkbox {
  width: 20%;
}
</style>

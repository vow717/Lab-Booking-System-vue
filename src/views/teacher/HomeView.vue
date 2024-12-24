<script setup lang="ts">
import { TeacherService } from '@/services/TeacherService'
import { onMounted, ref, watch } from 'vue'

const myReservations = await TeacherService.listReservationsService()

const days = ['######', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
const periods = ['第一二节', '第三四节', '第五六节', '第七八节']
const showCourses = ref<
  { courseName: string; labName: string; period: number; day: number; week: string }[]
>([])
//处理预约信息,将相同的课程名、实验室名、时间段、星期的预约信息合并,并将周次合并
//展现在课表上
const dealReservations = () => {
  console.log('myReservations', myReservations)
  let reservations = myReservations
  console.log(reservations)
  while (reservations.length > 0) {
    const reservation = reservations[0]
    const courseName = reservation.courseName
    const labName = reservation.laboratoryName
    const period = reservation.period
    const day = reservation.day
    const weeks: number[] = []

    reservations = reservations.filter(item => {
      if (
        item.courseName === courseName &&
        item.laboratoryName === labName &&
        item.period === period &&
        item.day === day
      ) {
        weeks.push(item.week as number)
        return false
      }
      return true
    })
    //升序排序
    weeks.sort((a, b) => a - b)
    console.log(weeks)
    let weekShow = '' + weeks[0] + '-'
    let nowBefore = weeks[0]
    for (let i = 0; i < weeks.length; i++) {
      if (weeks[i + 1] - weeks[i] == 1) {
        continue
      } else {
        weekShow += `${weeks[i]}`

        if (i != weeks.length - 1) {
          weekShow += `,${weeks[i + 1]}` + '-'
        } else {
          break
        }
        nowBefore = weeks[i + 1]
        console.log(weekShow)
      }
      console.log(weekShow)
    }
    if (courseName && period && day && weekShow && labName) {
      showCourses.value.push({
        courseName: courseName,
        labName: labName,
        period: period,
        day: day,
        week: weekShow
      })
    }
  }
}
const manageCourses = (period: number, day: number) => {
  return showCourses.value.filter(item => item.period === period && item.day === day)
}

watch(myReservations, () => {
  dealReservations()
})
onMounted(() => {
  dealReservations()
})
</script>
<template>
  <div>
    {{ myReservations }}
    <tbody>
      <tr>
        <td v-for="(day, index) in days" :key="index">
          <div>{{ day }}</div>
        </td>
      </tr>
      <tr v-for="(period, indexr) in periods" :key="indexr">
        <td>
          <div>{{ period }}</div>
        </td>
        <td v-for="(day, indexd) in days.length - 1" :key="indexd">
          <div v-for="(item, index) in manageCourses(indexr + 1, indexd + 1)" :key="index">
            <div>{{ item.courseName }}</div>
            <div>{{ item.labName }}</div>
            <div>{{ item.week }}</div>
          </div>
        </td>
      </tr>
    </tbody>
  </div>
</template>

<style scoped>
tbody {
  display: flex;
  flex-direction: column;
}
tbody tr {
  display: flex;
  width: 100%;
}
tbody tr td {
  flex-basis: 0;
  flex-grow: 1;
  width: 10%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
}
tbody tr td > div {
  flex-grow: 1;
  text-align: center;
  border: 1px solid black;
}
</style>

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
  let reservations = myReservations.value
  while (reservations?.length > 0) {
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
/* 整体表格主体样式 */
tbody {
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
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
  border: 2px solid #e0e0e0;
  border-style: solid;
  border-radius: 5px;
  padding: 12px;
  position: relative;
  transition: all 0.3s ease;
}

tbody tr td > div {
  flex-grow: 1;
  text-align: center;
  background-color: #f5f5f5;
  font-size: 14px;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  padding: 8px;
  overflow: hidden;
}

/* 表头样式 */
tr:first-child td > div {
  background-color: #2980b9;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 16px;
}

/* 鼠标悬停在单元格上的效果 */
tbody tr td:hover {
  background-color: #e6e6e6;
  transform: scale(1.05);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

/* 课程项内部标题样式 */
.course-title {
  font-size: 18px;
  color: #333333;
  margin-bottom: 5px;
  font-weight: bold;
}

/* 课程项内部实验室名称样式 */
.lab-name {
  font-size: 16px;
  color: #666666;
  margin-bottom: 8px;
}

/* 课程项内部周次信息样式 */
.week-info {
  font-size: 14px;
  color: #888888;
}

/* 给课程项添加渐变边框效果 */
tbody tr td > div:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(45deg, #ffc107, #ff9800);
  opacity: 0.2;
  pointer-events: none;
  z-index: -1;
}

/* 选中课程项时的样式（可通过添加类名等方式触发，这里仅做样式示例） */
.selected-course {
  background-color: #e74c3c !important;
  color: white !important;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2) !important;
  transform: scale(1.05) !important;
}
</style>

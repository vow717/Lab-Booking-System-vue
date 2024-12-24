<script setup lang="ts">
import type { DEF2Course } from '@/datasource/type'
import { TeacherService } from '@/services/TeacherService'
import { defineProps, ref } from 'vue'
import ChildDialog from './BookLabDialog3.vue'
// 接收父组件传递的课程信息
const props = defineProps<{
  course: DEF2Course | null
  closeDialog2: () => void
  lab: DEF2Course
}>()
interface TransformedReservation {
  period: number
  days: number
  course: { name: string; class: string; week: number }[]
}
// 这里可以编写子组件中关于模态框确定预约等相关逻辑
const confirmReservation = (period: number, day: number) => {
  currentTime.value = { period, day }
  dialogVisible.value = true
}

const handleCloseDialog = () => {
  dialogVisible.value = false
  props.closeDialog2()
}

const dialogVisible = ref(false)
const currentTime = ref<{ period: number; day: number }>({ period: 0, day: 0 })
//-------------------------------
const days = ['######', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
const periods = ['第一二节', '第三四节', '第五六节', '第七八节']

//这个数据到时候是从预约表里找该实验室的预约数据
const reservations = await TeacherService.listLabReservationsService(props.lab.id as string)

const transformReservation = () => {
  const result: TransformedReservation[] = []
  // 用于存储已经处理过的 (period, day) 组合
  const processed = new Set()
  if (!reservations.value) return result
  else {
    reservations.value.forEach(reservation => {
      const { period, day, courseName, week } = reservation
      const key = `${period}-${day}`
      if (!processed.has(key)) {
        processed.add(key)
        const newObj = {
          period: period,
          days: day,
          course: []
        }
        result.push(newObj)
      }
      const courseObj = {
        name: courseName,
        class: reservation.laboratoryId,
        week: week
      }
      const target = result.find(item => item.period === period && item.days === day)
      target.course.push(courseObj)
    })
    console.log('result', result)
    return result
  }
}
const coursesShow = ref<TransformedReservation[]>(transformReservation())

//根据period和day找到该实验室的全部预约数据并且还要根据course.name和course.class来讲此课程此教室的全部预约记录的week的数组拼接成字符串
const showCourses = (period: number, day: number) => {
  if (!coursesShow.value) return []
  else
    return coursesShow.value
      .filter(courseshow => courseshow.period === period && courseshow.days === day)
      .map(courseshow => {
        const courses: { name: string; class: string; week: string }[] = []
        courseshow.course.forEach(course => {
          if (!courses.find(item => item.name === course.name && item.class === course.class)) {
            courses.push({ name: course.name, class: course.class, week: '' })
          }
          courses.forEach(item => {
            const weeks: number[] = []
            courseshow.course.forEach(course => {
              if (course.name === item.name && course.class === item.class) {
                weeks.push(course.week)
              }
            })
            weeks.sort((a, b) => a - b)
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
            item.week = weekShow
          })
        })
        return courses
      })
      .flat() // 二维数组扁平化
}

//判断实验室period节，day天的1-18周是否已经被选满
const enoughTime = (period: number, day: number) => {}
</script>

<template>
  <div>
    <p>课程名称：{{ props.course?.name }}</p>
    <p>实验室名称: {{ props.lab.name }}</p>
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
          <button :disabled="false" @click="confirmReservation(indexr + 1, indexd + 1)">
            <div v-for="(item, index) in showCourses(indexr + 1, indexd + 1)" :key="index">
              <div>{{ item.name }}</div>
              <div>{{ item.week }}</div>
            </div>
          </button>
        </td>
      </tr>
    </tbody>
    <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      draggable>
      <ChildDialog
        :course="props.course"
        :closeDialog3="handleCloseDialog"
        :lab="props.lab"
        :time="currentTime" />
    </el-dialog>
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
button {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #f0f0f0;
}
</style>

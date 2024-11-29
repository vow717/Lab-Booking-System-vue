<script setup lang="ts">
import type { DEF2Course } from '@/datasource/type'
import { defineProps, ref } from 'vue'

// 接收父组件传递的课程信息
const props = defineProps<{
  course: DEF2Course | null
  closeDialog2: () => void
  lab: { id: string; name: string; required_config: string }
}>()

// 这里可以编写子组件中关于模态框确定预约等相关逻辑
const confirmReservation = () => {
  // 假设这里进行一些预约的操作，比如发送请求等
  console.log('确认预约课程：', props.course)
  // 可以在这里关闭模态框，通知父组件等操作，示例中简单关闭模态框
  props.closeDialog2()
  console.log('关闭模态框')
}

//-------------------------------
const days = ['######', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
const periods = ['第一二节', '第三四节', '第五六节', '第七八节']

//这个数据到时候是从预约表里找该实验室的预约数据
const reservations = ref([])

//这个数据到时候室从预约表里提取的有效数据
const courses = [
  {
    period: 1,
    days: 1,
    course: [
      { name: 'websssss', class: '201', week: '1-6' },
      { name: 'websssss', class: '201', week: '8-12' }
    ]
  },
  {
    period: 4,
    days: 5,
    course: [
      { name: 'websssss', class: '501', week: '1-6' },
      { name: 'websssss', class: '501', week: '8-12' }
    ]
  },
  {
    period: 3,
    days: 3,
    course: [
      { name: 'websssss', class: '301', week: '1-6' },
      { name: 'websssss', class: '301', week: '8-12' },
      { name: 'websssss', class: '301', week: '14-18' }
    ]
  },
  {
    period: 2,
    days: 2,
    course: [{ name: 'c++sssss', class: '301', week: '1-6' }]
  }
]

const showCourses = (period: number, day: number) => {
  return courses
    .filter(course => course.period === period && course.days === day)
    .map(course => course.course)[0]
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
          <button :disabled="false" @click="">
            <div v-for="(item, index) in showCourses(indexr + 1, indexd + 1)" :key="index">
              <div>{{ item.name }}</div>
              <div>{{ item.week }}</div>
            </div>
          </button>
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

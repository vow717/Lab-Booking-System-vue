<script setup lang="ts">
const days = ['######', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
const periods = ['第一二节', '第三四节', '第五六节', '第七八节']

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
          <div v-for="(item, index) in showCourses(indexr + 1, indexd + 1)" :key="index">
            <div>{{ item.name }}</div>
            <div>{{ item.class }}</div>
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

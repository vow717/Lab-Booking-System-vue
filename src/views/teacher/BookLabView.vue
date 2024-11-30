<script setup lang="ts">
import type { DEF2Course } from '@/datasource/type'
import { computed, ref } from 'vue'
import ChildDialog from './booklabdialog/BookLabDialog1.vue'
//courses是会从数据库中获取的实验课课程
//这里虚拟创建一下
const courses = ref<DEF2Course[]>([
  {
    id: '1',
    name: 'web实验',
    type: 'DEF2',
    reserved: 0,
    require_config: 'Windows 11',
    require_number: 100,
    total: 12
  },
  {
    id: '2',
    name: 'java实验',
    type: 'DEF2',
    reserved: 0,
    require_config: 'Windows 10',
    require_number: 80,
    total: 8
  },
  {
    id: '3',
    name: 'c++实验',
    type: 'DEF2',
    reserved: 0,
    require_config: 'Windows 8',
    require_number: 120,
    total: 10
  },
  {
    id: '4',
    name: 'python实验',
    type: 'DEF2',
    reserved: 0,
    require_config: 'Windows 7',
    require_number: 60,
    total: 6
  },
  {
    id: '5',
    name: 'php实验',
    type: 'DEF2',
    reserved: 0,
    require_config: 'Windows XP',
    require_number: 40,
    total: 4
  },
  {
    id: '6',
    name: 'go实验',
    type: 'DEF2',
    reserved: 0,
    require_config: 'Windows 2000',
    require_number: 20,
    total: 2
  },
  {
    id: '7',
    name: 'ruby实验',
    type: 'DEF2',
    reserved: 0,
    require_config: 'Windows 98',
    require_number: 130,
    total: 14
  },
  {
    id: '8',
    name: 'c#实验',
    type: 'DEF2',
    reserved: 0,
    require_config: 'Windows 95',
    require_number: 70,
    total: 7
  }
])

// 控制实验室标签显示隐藏的变量
const tagVisible = ref(false)
// 当前点击课程的信息
const currentCourse = ref<DEF2Course | null>(null)
// 点击预约按钮的方法
const openDialog = (course: DEF2Course) => {
  currentCourse.value = course
  tagVisible.value = true
}
// 处理子组件发出的关闭模态框事件
const handleCloseDialog = () => {
  console.log('关闭模态框')
  tagVisible.value = false
}

// 选择高亮的课程
const isHighlighted = computed(() => {
  return (cId: string) => {
    if (!currentCourse.value) {
      return false
    }
    return cId === currentCourse.value.id
  }
})
</script>
<template>
  <div>
    <p>当老师导入课表，课表里面的实验课，就会被筛选type然后加载在这个页面。</p>
    <p>老师就可以对每个实验课课程预约实验室。</p>
  </div>
  <div class="cardcontainer">
    <!--用卡片形式摆列所有的课程courses-->
    <!--加个高光类，如果key(course.id)==current选的course,启动这个类-->
    <el-card
      v-for="course in courses"
      :key="course.id"
      :class="{ highlight: isHighlighted(course.id) }">
      <div>
        <p>课程名称：{{ course.name }}</p>
        <p>需求配置：{{ course.require_config }}</p>
        <p>上课人数:{{ course.require_number }}</p>
        <p>已选课时/总课时：{{ course.reserved }}/{{ course.total }}</p>
        <el-button @click="openDialog(course)">选择</el-button>
      </div>
    </el-card>
  </div>
  <el-divider />
  <div v-if="tagVisible">
    <ChildDialog :course="currentCourse" :closeDialog1="handleCloseDialog" />
  </div>
</template>

<style scoped>
.cardcontainer {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
.highlight {
  background-color: #f0f0f0;
}
</style>

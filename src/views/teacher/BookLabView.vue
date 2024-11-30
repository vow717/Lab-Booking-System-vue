<script setup lang="ts">
import type { DEF2Course } from '@/datasource/type'
import { ref } from 'vue'
import ChildDialog from './booklabdialog/BookLabDialog1.vue'
//courses是会从数据库中获取的实验课课程
//这里虚拟创建一下
const courses = ref<DEF2Course[]>([
  {
    id: '1',
    name: 'web实验',
    type: 'DEF2',
    reserved: 0,
    require_config: '100人,Windows 11',
    total: 12
  },
  {
    id: '2',
    name: 'java实验',
    type: 'DEF2',
    reserved: 0,
    require_config: '80人,Windows 10',
    total: 8
  }
])

// 控制模态框显示隐藏的变量
const dialogVisible = ref(false)
// 当前点击课程的信息
const currentCourse = ref<DEF2Course | null>(null)
// 点击预约按钮的方法
const openDialog = (course: DEF2Course) => {
  currentCourse.value = course
  dialogVisible.value = true
}
// 处理子组件发出的关闭模态框事件
const handleCloseDialog = () => {
  console.log('关闭模态框')
  dialogVisible.value = false
}
</script>
<template>
  <div>
    <p>当老师导入课表，课表里面的实验课，就会被筛选type然后加载在这个页面。</p>
    <p>老师就可以对每个实验课课程预约实验室。</p>
  </div>
  <div>
    <!--用卡片形式摆列所有的课程courses-->
    <el-card v-for="(course, index) in courses" :key="index">
      <div>
        <p>课程名称：{{ course.name }}</p>
        <p>需求配置：{{ course.require_config }}</p>
        <p>已选课时/总课时：{{ course.reserved }}/{{ course.total }}</p>
        <el-button @click="openDialog(course)">预约</el-button>
      </div>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      title="预约实验室"
      weight="50%"
      :close-on-click-modal="false"
      :destroy-on-close="true">
      <ChildDialog :course="currentCourse" :closeDialog1="handleCloseDialog" />
    </el-dialog>
  </div>
</template>

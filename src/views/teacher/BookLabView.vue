<script setup lang="ts">
import type { DEF2Course } from '@/datasource/type'
import { ref } from 'vue'
//courses是会从数据库中获取的实验课课程
//这里虚拟创建一下
const courses = ref<DEF2Course[]>([
  {
    name: 'web实验',
    type: 'DEF2',
    reserved: 0,
    require_config: '100人,Windows 11',
    total: 10
  },
  {
    name: 'java实验',
    type: 'DEF2',
    reserved: 0,
    require_config: '80人,Windows 10',
    total: 10
  }
])
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
        <el-button>预约</el-button>
      </div>
    </el-card>
  </div>
</template>

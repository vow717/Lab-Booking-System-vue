<script setup lang="ts">
import { createElNotificationSuccess } from '@/components/message'
import type { DEF2Course } from '@/datasource/type'
import { TeacherService } from '@/services/TeacherService'
import { ref } from 'vue'
import AddDialog from './AddDialog.vue'
import ChildDialog from './EditDialog.vue'
//模拟课程数据:
const coursesData = [
  {
    id: '1',
    name: 'web实验',
    type: 'DEF2',
    require_config: 'Windows 11',
    require_number: 100,
    total: 12
  },
  {
    id: '2',
    name: 'java实验',
    type: 'DEF2',
    require_config: 'Windows 10',
    require_number: 80,
    total: 8
  },
  {
    id: '3',
    name: 'c++实验',
    type: 'DEF2',
    require_config: 'Windows 8',
    require_number: 120,
    total: 10
  },
  {
    id: '4',
    name: 'python实验',
    type: 'DEF2',
    require_config: 'Windows 7',
    require_number: 60,
    total: 6
  },
  {
    id: '5',
    name: 'php实验',
    type: 'DEF2',
    require_config: 'Windows XP',
    require_number: 40,
    total: 4
  },
  {
    id: '6',
    name: 'go实验',
    type: 'DEF2',
    require_config: 'Windows 2000',
    require_number: 20,
    total: 2
  },
  {
    id: '7',
    name: 'ruby实验',
    type: 'DEF2',
    require_config: 'Windows 98',
    require_number: 10,
    total: 1
  }
]
const dialogVisible = ref(false)
const currentCourse = ref<DEF2Course>({})
const allCourses = ref<DEF2Course[]>([])
allCourses.value = coursesData //后面是await请求

const closeDialog = () => {
  dialogVisible.value = false
}
const DelF = async (id: number) => {
  await TeacherService.deleteCourseService(id)
  createElNotificationSuccess('删除成功')
}
const EditF = (course: DEF2Course) => {
  //编辑课程
  currentCourse.value = course
  dialogVisible.value = true
}
</script>
<template>
  <div>
    <AddDialog />
  </div>
  <div>
    <el-table :data="allCourses">
      <el-table-column type="index" label="#" />
      <el-table-column prop="name" label="课程名称" />
      <el-table-column prop="require_config" label="实验环境" />
      <el-table-column prop="require_number" label="实验人数" />
      <el-table-column prop="total" label="实验次数" />

      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="EditF(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="DelF(scope.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-if="dialogVisible">
    <ChildDialog :course="currentCourse" :closeDialog="closeDialog" />
  </div>
</template>

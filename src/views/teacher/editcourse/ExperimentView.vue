<script setup lang="ts">
import { createElNotificationSuccess } from '@/components/message'
import type { DEF2Course } from '@/datasource/type'
import { TeacherService } from '@/services/TeacherService'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import AddDialog from './AddDialog.vue'
import ChildDialog from './EditDialog.vue'

const dialogVisible = ref(false)
const currentCourse = ref<DEF2Course>()
const allCourses = await TeacherService.listCoursesService()

const closeDialog = () => {
  dialogVisible.value = false
}
const DelF = async (id: string) => {
  const confirmResult = await ElMessageBox.confirm('确定删除此课程吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  if (confirmResult === 'confirm') {
    await TeacherService.deleteCourseService(id)
    createElNotificationSuccess('删除成功')
  } else {
    console.log('已取消删除操作')
  }
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
      <el-table-column prop="requireConfig" label="实验环境" />
      <el-table-column prop="requireNumber" label="实验人数" />
      <el-table-column prop="total" label="实验次数" />

      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="EditF(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="DelF(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-if="dialogVisible">
    <ChildDialog :course="currentCourse" :closeDialog="closeDialog" />
  </div>
</template>

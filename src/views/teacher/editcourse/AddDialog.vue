<script setup lang="ts">
import { createElNotificationSuccess } from '@/components/message'
import type { DEF2Course } from '@/datasource/type'
import { TeacherService } from '@/services/TeacherService'
import { ElMessageBox } from 'element-plus'
import { computed, ref } from 'vue'
const addDialogVisible = ref(false)
const closeDialog = () => {
  courseForm.value = {}
  addDialogVisible.value = false
}
const courseForm = ref<DEF2Course>({})
const submitOk = computed(
  () => courseForm.value.name && courseForm.value.requireNumber && courseForm.value.total
)
const submitF = async () => {
  const confirmResult = await ElMessageBox.confirm('确定添加此课程吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  //提交表单
  if (confirmResult === 'confirm') {
    //提交表单
    console.log('提交表单')
    await TeacherService.addCourseService(courseForm.value)
    closeDialog()
    createElNotificationSuccess('添加课程成功')
  } else {
    console.log('已取消操作')
  }
  closeDialog()
}
</script>
<template>
  <el-button type="primary" @click="addDialogVisible = true">添加课程</el-button>
  <el-dialog title="添加课程" v-model="addDialogVisible" width="30%" :before-close="closeDialog">
    <el-form :model="courseForm" label-width="80px">
      <el-form-item label="课程名称">
        <el-input v-model="courseForm.name"></el-input>
      </el-form-item>
      <el-form-item label="实验环境">
        <el-input v-model="courseForm.requireConfig"></el-input>
      </el-form-item>
      <el-form-item label="实验人数">
        <el-input v-model="courseForm.requireNumber" type="number"></el-input>
      </el-form-item>
      <el-form-item label="实验课时">
        <el-input v-model="courseForm.total" type="number"></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitF" :disabled="!submitOk">确 定</el-button>
    </footer>
  </el-dialog>
</template>

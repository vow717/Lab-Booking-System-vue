<script setup lang="ts">
import { createElNotificationSuccess } from '@/components/message'
import type { DEF2Course } from '@/datasource/type'
import { TeacherService } from '@/services/TeacherService'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
const props = defineProps<{
  course: DEF2Course
  closeDialog: () => void
}>()

//深拷贝课程数据,防止直接修改props.course
const courseForm = ref<DEF2Course>(JSON.parse(JSON.stringify(props.course)))
const dialogVisible = ref(true)
const submitF = async () => {
  const confirmResult = await ElMessageBox.confirm('确定提交修改吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  if (confirmResult === 'confirm') {
    //提交表单
    await TeacherService.updateCourseService(courseForm.value)
    props.closeDialog()
    createElNotificationSuccess('修改成功')
  } else {
    console.log('已取消修改操作')
  }
}

//关闭,销毁组件,render(null,document.body)的null代表销毁,document.body表示销毁的位置
const closeF = () => {
  props.closeDialog()
}
</script>
<template>
  <el-dialog title="编辑课程" v-model="dialogVisible" width="30%" :before-close="closeF" draggable>
    <el-form :model="courseForm" label-width="80px">
      <el-form-item label="课程名称">
        <el-input v-model="courseForm.name"></el-input>
      </el-form-item>
      <el-form-item label="实验环境">
        <el-input v-model="courseForm.require_config"></el-input>
      </el-form-item>
      <el-form-item label="实验人数">
        <el-input v-model="courseForm.require_number" type="number"></el-input>
      </el-form-item>
      <el-form-item label="实验课时">
        <el-input v-model="courseForm.total" type="number"></el-input>
      </el-form-item>
    </el-form>
    <footer slot="footer">
      <el-button @click="closeF">取 消</el-button>
      <el-button type="primary" @click="submitF">确 定</el-button>
    </footer>
  </el-dialog>
</template>

<script setup lang="ts">
import type { Lab } from '@/datasource/type'
import { createEditProcessDialog } from './operation/index'
import { AdminService } from '@/services/AdminService'
import { ElMessage, ElMessageBox } from 'element-plus'
import { EditPen,DeleteFilled } from '@element-plus/icons-vue';
const prop = defineProps<{ labs: Lab}>()
const allLabsM = defineModel('alllabs')
const labsR = prop.labs
const delPorcessF = (lid: string) => {
  ElMessageBox.confirm(`删除${labsR.name}将不可恢复，确定删除？`, 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(async () => {
      allLabsM.value =  await AdminService.delLabsService(lid)
      console.log( allLabsM.value );      
    })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}
</script>
<template>
  <div>
    <el-button type="primary" @click="createEditProcessDialog(prop.labs)">
      <el-icon><EditPen /></el-icon>
    </el-button>
    <el-button
      type="danger"
      @click="delPorcessF(prop.labs.id ?? '')">
      <el-icon><DeleteFilled /></el-icon>
    </el-button>
  </div>
</template>

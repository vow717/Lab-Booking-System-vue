<script setup lang="ts">
import type { Lab,Notice } from '@/datasource/type'
import { createEditNoticeDialog } from './operation/index'
import { AdminService } from '@/services/AdminService'
import { ElMessage, ElMessageBox } from 'element-plus'
import { EditPen,DeleteFilled } from '@element-plus/icons-vue';
const prop = defineProps<{ notice: Notice}>()
const noticeR = prop.notice
const delNoticeF = (lid: string) => {
  ElMessageBox.confirm(`删除  ${noticeR.title}  将不可恢复，确定删除？`, 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(async () => {
      await AdminService.delNoticeService(lid)
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
    <el-button type="primary" @click="createEditNoticeDialog(prop.notice)">
      <el-icon><EditPen /></el-icon>
    </el-button>
    <el-button
      type="danger"
      @click="delNoticeF(prop.notice.id ?? '')">
      <el-icon><DeleteFilled /></el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import type { Lab,Notice } from '@/datasource/type'
import { createEditNoticeDialog } from './operation/index'
import { AdminService } from '@/services/AdminService'
import { ElMessage, ElMessageBox } from 'element-plus'
import { EditPen,DeleteFilled } from '@element-plus/icons-vue';
const prop = defineProps<{ notice: Notice,allNoticesId:String[],currentPage:number}>()
const noticesidM = defineModel<String[]>('noticesid')
const checkedcountM = defineModel<number>('checkedcount')
const checkAllM = defineModel<boolean>('checkall')
const indeterminateM = defineModel<boolean>('indeterminate')
const noticeR = prop.notice
const allNotNicesIdR = prop.allNoticesId
const delNoticeF = (lid: string) => {
  ElMessageBox.confirm(`删除  ${noticeR.title}  将不可恢复，确定删除？`, 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(async () => {
      await AdminService.delNoticeService(prop.currentPage,lid)
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

/**
 * 使用nextTick函数（Vue 提供的用于在 DOM 更新后的回调函数）来确保在checkedcountM.value更新后再进行
 */
import { nextTick } from 'vue';
const handleNoticesChange = (value: string[]) => {
    checkedcountM.value = value.length;
    nextTick(() => {
        console.log(checkedcountM.value, value.length);
        checkAllM.value = checkedcountM.value === allNotNicesIdR.length;
        indeterminateM.value = checkedcountM.value as number > 0 && checkedcountM.value as number < allNotNicesIdR.length;
    });
}
</script>
<template>
  <div>
    <el-button type="primary" @click="createEditNoticeDialog(prop.notice,prop.currentPage)">
      <el-icon><EditPen /></el-icon>
    </el-button>
    <el-button
      type="danger"
      @click="delNoticeF(prop.notice.id ?? '')">
      <el-icon><DeleteFilled /></el-icon>
    </el-button>
    <el-checkbox-group class="my-checkbox"
            v-model="noticesidM"
            @change="handleNoticesChange">
            <el-checkbox  :key="prop.notice.id"  :value="prop.notice.id">
    </el-checkbox>
  </el-checkbox-group>
  </div>
</template>
<style scoped>
.my-checkbox{
  display: inline-block;
  margin: 0 10px;
}
</style>

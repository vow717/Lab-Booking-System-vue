<script setup lang="ts">
import type { Lab,Notice } from '@/datasource/type'
import { createEditNoticeDialog } from './operation/index'
import { AdminService } from '@/services/AdminService'
import { ElMessage, ElMessageBox } from 'element-plus'
import { EditPen,DeleteFilled } from '@element-plus/icons-vue';
const prop = defineProps<{ 
  notice: Notice,
  curPageNoticesId:String[],
  currentPage:number;
  listNoticeF: () => Promise<void>
}>()
const allNoticesM = defineModel<{count:number,notices:Notice[]}>('allnotices')
const checkedcountM = defineModel<number>('checkedcount')
const checkNIdM = defineModel<string[]>('checknid')
const checkAllM = defineModel<boolean>('checkall')
const indeterminateM = defineModel<boolean>('indeterminate')
const noticeR = prop.notice
const curPageNoticesIdR = prop.curPageNoticesId
const delNoticeF = async (lid: string, noticeTitle: string) => {
    try {
        // 显示确认对话框
        await ElMessageBox.confirm(`删除  ${noticeTitle}  将不可恢复，确定删除？`, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        });
        // 调用删除服务
        await AdminService.delNoticeService(prop.currentPage,lid)
        await prop.listNoticeF()
        // 显示成功消息
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
    } catch (error) {
        if (error === 'cancel') {
            // 用户取消删除操作
            ElMessage({
                type: 'info',
                message: '取消删除'
            });
        } else {
            // 其他错误，如服务端错误或网络错误
            ElMessage({
                type: 'error',
                message: '删除时发生错误，请稍后重试'
            });
        }
    }
};

/**
 * 使用nextTick函数（Vue 提供的用于在 DOM 更新后的回调函数）来确保在checkedcountM.value更新后再进行
 */
import { nextTick } from 'vue';
const handleNoticesChange = (value: string[]) => {
    checkedcountM.value = value.length;
    nextTick(() => {
        checkAllM.value = checkedcountM.value === curPageNoticesIdR.length;
        indeterminateM.value = checkedcountM.value as number > 0 && checkedcountM.value as number < allNoticesM.value?.count!;
    });
}
const updateAllNotices = (notices:{count:number,notices:Notice[]}) =>{
  console.log(notices); 
  allNoticesM.value = notices
}
</script>
<template>
  <div>
    <el-button type="primary" @click="createEditNoticeDialog(prop.notice,prop.currentPage,updateAllNotices)">
      <el-icon><EditPen /></el-icon>
    </el-button>
    <el-button
      type="danger"
      @click="delNoticeF(prop.notice.id!,prop.notice.title!)">
      <el-icon><DeleteFilled /></el-icon>
    </el-button>
    <el-checkbox-group class="my-checkbox"
            v-model="checkNIdM"
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

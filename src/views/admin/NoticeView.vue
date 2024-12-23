<script setup lang="ts">
import type {Notice} from '@/datasource/type'
import {listNotices} from '@/datasource/datasourse'
import { ref,watch } from 'vue';
import { useRoute } from 'vue-router'
import AddNoticeVue from '@/views/admin/operation/AddNoticeVue.vue'
import EditNoticeVue from '@/views/admin/OperationNoticeView.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { DeleteFilled } from '@element-plus/icons-vue';
import { AdminService } from '@/services/AdminService';

const noticesR = ref<Notice[]>([])
const route = useRoute()
const noticesIdR = ref<String[]>([])
const checkedCount = ref<number>(0)
noticesR.value = listNotices()

//对通知排序 有待改善 数量多排序效率低
noticesR.value.sort((a: Notice, b: Notice) => {
  if (a.updateTime && b.updateTime) {
    return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
  }
  return 0;
});
const delNoticesF = () => {
    if(checkedCount.value <= 0){
        return  alert("至少选择一项删除")   
    }
  ElMessageBox.confirm(`删除 ${checkedCount.value} 项将不可恢复，确定删除？`, 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(async () => {
      await AdminService.delNoticesService(noticesIdR.value)
      
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

const handleNoticesChange = (value: string[]) =>{
    checkedCount.value = value.length
}
//
watch((noticesIdR),()=>{
    console.log(noticesIdR.value);
    
})
</script>
<template>
<div>
    <el-row> <el-col :span="2"><AddNoticeVue /></el-col>
        <el-col :span="2"><el-button
      type="danger"
      @click="delNoticesF">
      <el-icon><DeleteFilled /></el-icon>
    </el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <el-scrollbar>
        <el-table :data="noticesR">
            <el-table-column prop="updateTime" label="Date" width="150" >
                <template #default="scope">
                    {{ scope.row.updateTime?.substring(0, 10) }}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="title" width="300" />
            <el-table-column prop="content" label="content" width="500" />
            <el-table-column label="操作" width="250">
            <template #default="scope">
            <EditNoticeVue :notice="scope.row"  />
            <el-checkbox-group
            v-model="noticesIdR"
            @change="handleNoticesChange">
            <el-checkbox  :key="scope.row.id"  :value="scope.row.id">
    </el-checkbox>
  </el-checkbox-group>
          </template>
          </el-table-column>
        </el-table>
    </el-scrollbar>
        </el-col>
    </el-row>
    

</div>
</template>

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
import type { ComponentSize } from 'element-plus'


const noticesR = ref<Notice[]>([])
const route = useRoute()
const noticesIdR = ref<String[]>([])
const allNoticesIdR = ref<String[]>([])
const checkedCount = ref<number>(0)
noticesR.value = listNotices()

const checkAll = ref(false)
const isIndeterminate = ref(false)


const handleCheckAllChange = (val: boolean) => {
  noticesIdR.value = val ?  allNoticesIdR.value : []
  isIndeterminate.value = false
  checkedCount.value = allNoticesIdR.value.length
}
//对通知排序 有待改善 数量多排序效率低
noticesR.value.sort((a: Notice, b: Notice) => {
  if (a.updateTime && b.updateTime) {
    return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
  }
  return 0;
});

noticesR.value.forEach((n)=>{
  allNoticesIdR.value.push(n.id as string)
})

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

//分页

const currentPage = ref(1)
const pageSize = ref(2)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
<template>
<div>
    <el-row> <el-col :span="2"><AddNoticeVue /></el-col>
        <el-col :span="2">
          <el-button type="danger" @click="delNoticesF">
            <el-icon><DeleteFilled /></el-icon>
          </el-button></el-col>
          <el-col :span="2">
          <el-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    Check all
  </el-checkbox>

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
            <el-table-column prop="title" label="title" width="280" />
            <el-table-column prop="content" label="content" width="500" />
            <el-table-column label="操作" width="170">
            <template #default="scope">
            <EditNoticeVue :notice="scope.row"  
            :allNoticesId="allNoticesIdR"
            v-model:noticesid="noticesIdR" 
            v-model:checkedcount="checkedCount"
             v-model:checkall="checkAll"
            v-model:indeterminate="isIndeterminate"/>
          </template>
          </el-table-column>
        </el-table>
    </el-scrollbar>
        </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="pagination-block">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper"
      :total="allNoticesIdR.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
      </el-col>
    </el-row>

</div>
</template>
<style scoped>
.pagination-block{
  margin: 10px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

</style>

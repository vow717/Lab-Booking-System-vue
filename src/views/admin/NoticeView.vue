<script setup lang="ts">
import type {Notice} from '@/datasource/type'
import { computed, ref,watch } from 'vue';
import { useRoute } from 'vue-router'
import AddNoticeVue from '@/views/admin/operation/AddNoticeVue.vue'
import EditNoticeVue from '@/views/admin/OperationNoticeView.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { DeleteFilled } from '@element-plus/icons-vue';
import { AdminService } from '@/services/AdminService';
import type { ComponentSize } from 'element-plus'
import router from '@/router';
import { CommonService } from '@/services';

const noticesR = ref<{count:number,notices:Notice[]}>({count:0,notices:[]})
const checkNIdR = ref<String[]>([])
const curPageNoticesIdR = ref<String[]>([])
const checkedCount = ref<number>(0)

//分页
const route = useRoute();
const pageNum = 8
const size = ref<ComponentSize>('small')
const background = ref(false)
const disabled = ref(false)
const paramPageR = ref<string>(route.params.page as string)
const currentPageR = ref(parseInt(paramPageR.value, 10))
currentPageR.value = computed(() => parseInt(paramPageR.value, 10)).value;
//
const listNoticeF = async() => {
  await CommonService.listNoticeService(currentPageR.value).then((notices)=>{
 if(notices){
  noticesR.value.notices = notices.value.notices
  noticesR.value.count = notices.value.count
 }
 getCurPageNoticesIdF()
})
}
//
const getCurPageNoticesIdF = () =>{
  noticesR.value.notices.forEach((n)=>{
    curPageNoticesIdR.value.push(n.id as string)
  })
}
listNoticeF()

const checkAll = ref(false)
const isIndeterminate = ref(false)

const handleCheckAllChange = (val: boolean) => {
  checkNIdR.value = val == true ?  curPageNoticesIdR.value : []
  isIndeterminate.value = false
  checkedCount.value = checkNIdR.value.length
}


const delNoticesF = async () => {
    if (checkedCount.value <= 0) {
        return ElMessage.warning("至少选择一项删除");
    }
    try {
        // 确认删除操作
        await ElMessageBox.confirm(`删除 ${checkedCount.value} 项将不可恢复，确定删除？`, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        });
        // 调用删除服务
        await AdminService.delNoticesService(checkNIdR.value,currentPageR.value).then((res)=>{
          noticesR.value =  res.value
        });
        // 重新获取通知列表，使用当前页码
        // listNoticeF()
        getCurPageNoticesIdF()
        
        ElMessage.success('删除成功');
    } catch (error) {
        ElMessage.info('取消删除');
    }
};

//分页
watch(currentPageR , async(newval)=>{
  await CommonService.listNoticeService(currentPageR.value).then((res)=>{
          noticesR.value =  res.value
        });
    getCurPageNoticesIdF()
})

const handleCurrentChange = async(val: number) => {
  currentPageR.value = val
  router.push(`/admin/notices/page/${currentPageR.value}`)
}
</script>
<template>
<div>
    <el-row class="my-row"> 
      <el-col :span="2" ><AddNoticeVue 
         :curpagenoticesid="getCurPageNoticesIdF"
         v-model:notices="noticesR"
         />
        </el-col>
        <el-col :span="2">
          <el-checkbox
      v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    Check all
  </el-checkbox>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="delNoticesF" v-if="checkNIdR.length">
            <el-icon><DeleteFilled /></el-icon>
          </el-button></el-col>
    </el-row>
    <el-row>
        <el-col>
            <el-scrollbar>
        <el-table :data="noticesR.notices">
            <el-table-column prop="updateTime" label="Date" width="150" >
                <template #default="scope">
                    {{ scope.row.updateTime?.substring(0, 10) }}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="title" width="280" />
            <el-table-column prop="content" label="content" width="480" />
            <el-table-column label="操作" width="170">
            <template #default="scope">
            <EditNoticeVue :notice="scope.row"  
            :curPageNoticesId="curPageNoticesIdR"
            :currentPage="currentPageR"
            :listNoticeF="listNoticeF"
            v-model:allnotices="noticesR" 
            v-model:checkedcount="checkedCount"
            v-model:checknid="checkNIdR"
             v-model:checkall="checkAll"
            v-model:indeterminate="isIndeterminate"
            />
          </template>
          </el-table-column>
        </el-table>
    </el-scrollbar>
        </el-col>
    </el-row>
    <el-row >
      <el-col>
        <div class="pagination-block">
    <el-pagination
      v-model:current-page="currentPageR"
      v-model:page-size="pageNum"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper"
      :total="noticesR.count"
      @current-change="handleCurrentChange"
    />
  </div>
      </el-col>
    </el-row>

</div>
</template>
<style scoped>
.pagination-block{
  margin: 5px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.my-row{
  height: 2rem;
  display: flex;

}
</style>

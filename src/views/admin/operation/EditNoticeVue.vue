<script setup lang="ts">
import { createNoticeBoard } from '@/components/Notice'
import { locationItems } from '@/datasource/const'
import type { Notice } from '@/datasource/type'
import { AdminService } from '@/services/AdminService'
import { Check, CloseBold} from '@element-plus/icons-vue'
import { ElButton, ElCol, ElDialog, ElInput, ElOption, ElRow, ElSelect } from 'element-plus'
import {  ref, watch } from 'vue'
const prop = defineProps<{ notice: Notice,page:number}>()
const noticeR = ref<Notice>(JSON.parse(JSON.stringify(prop.notice)))
const dialogTableVisible = ref(true)
const titleR = ref(noticeR.value.title)
console.log(titleR);
const textareaR = ref(noticeR.value.content)
const messageR = ref('题目不可为空')
const message2R = ref('')
//
const updateNoticeF = async() => {
    if(  noticeR.value.title === titleR.value && noticeR.value.content === textareaR.value){
        message2R.value = ('题目和内容未修改')
        alert( message2R.value)
        return
    }
    noticeR.value.title === titleR.value
    noticeR.value.content === textareaR.value
  await AdminService.updateNoticeService(prop.page,noticeR.value)
createNoticeBoard('通知信息更新成功', '')
  dialogTableVisible.value = false
  noticeR.value = {}
}
 //

</script>
<template>
  <el-dialog v-model="dialogTableVisible" title="Message" width="800" class="my-dialog">
    <div>
        <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col >
          <el-input v-model="noticeR.title" class="w-150px mb-2 my-title" truncated  placeholder="题目"></el-input>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col >
          <el-input type="textarea" class="w-150px mb-2 myInput" truncated
          v-model="noticeR.content" placeholder="内容"
            :autosize="{ minRows: 4}"/>
        </el-col>
      </el-row>
   </div>
   <el-tooltip v-if="!titleR" :content="messageR" placement="bottom" effect="light">
      <el-button  :icon="CloseBold" :disabled="!titleR"></el-button>
    </el-tooltip>
    <el-tooltip v-else content="提交" placement="bottom" effect="light">
      <el-button
          type="success"
          :icon="Check"
          @click="updateNoticeF"
          :disabled="!titleR"
      ></el-button>
    </el-tooltip>
    {{ noticeR }}
  </el-dialog>
</template>
<style scoped>
.my-title{
    width: 100%;
}
.myInput {
    min-height: 50px; /* 设置一个合适的最小高度，可根据实际需求调整 */
    height: auto;
    resize: vertical; /* 允许垂直方向拉伸，以便更自然地撑开 */
}
</style>

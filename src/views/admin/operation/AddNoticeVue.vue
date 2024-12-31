<script setup lang="ts">
import { createMessageDialog } from '@/components/message/indexC'
import { AdminService } from '@/services/AdminService'
import type { Notice } from '@/datasource/type'
import { Check, Plus,CloseBold } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { createNoticeBoard } from '@/components/Notice'
import { useUserStore } from '@/stores/UserStore'
import router from '@/router';

const props = defineProps<{
    curpagenoticesid: () => void;
}>()
const noticesM = defineModel<{count:number,notices:Notice[]}>('notices')
const publisherR = useUserStore().userS
const noticeR = ref<Notice>({title:"",content:"",publisher:publisherR.value?.name})
const dialogVisible = ref(false)
const messageR = ref('题目不可为空')
//


const addNoticeF = async () => {
    const titleValue = noticeR.value.title?.trim();
    const contentValue = noticeR.value.content?.trim()
    if (titleValue === '') {
        createMessageDialog('题目不能为空');
        return;
    }
    try {
        noticeR.value.title = titleValue
        noticeR.value.content = contentValue
        noticesM.value = await AdminService.addNoticeService(1,noticeR.value);
        router.push(`/admin/notices/page/1`)
        createNoticeBoard('通知添加成功', '');
        dialogVisible.value = false;
        noticeR.value = {};
    } catch (error) {
        createMessageDialog('通知添加失败，请稍后再试');
    }
}

</script>
<template>
  <el-button  class="addNotice" type="primary" @click="dialogVisible = true">
    <el-icon><Plus /></el-icon>
  </el-button>
  <el-dialog v-model="dialogVisible" title="Message" width="800">
    <div>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col>
          <el-input  v-model="noticeR.title" class="w-150px mb-2" truncated  placeholder="题目"></el-input>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col >
          <el-input type="textarea" class="w-150px mb-2 myInput" truncated
          v-model="noticeR.content" placeholder="内容"
            :autosize="{ minRows: 4}"
        ></el-input>
 
        </el-col>
      </el-row>
   </div>
   <el-tooltip v-if="!noticeR.title " :content="messageR" placement="bottom" effect="light">
      <el-button type="disabled" :icon="CloseBold" :disabled="!noticeR.title"></el-button>
    </el-tooltip>
    <el-tooltip v-else content="提交" placement="bottom" effect="light">
      <el-button
          type="success"
          :icon="Check"
          @click="addNoticeF"
          :disabled="!noticeR.title"
      ></el-button>
    </el-tooltip>
  <el-text>{{ noticeR }}</el-text>
  </el-dialog>
</template>
<style scoped>
.addNotice{
  margin-bottom: 20px;
}
.myInput {
    min-height: 50px; 
    height: auto;
    resize: vertical; 
}
</style>

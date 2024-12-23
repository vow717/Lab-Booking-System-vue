<script setup lang="ts">
import { createMessageDialog } from '@/components/message/indexC'
import { locationItems, rolesItems } from '@/datasource/const'
import { AdminService } from '@/services/AdminService'
import type { Notice } from '@/datasource/type'
import { Check, Minus, Plus,CloseBold } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import { createNoticeBoard } from '@/components/Notice'
import { useUserStore } from '@/stores/UserStore'
/**
export interface notice {
  id?: string
  title?: string
  content?: string
  publisher?: string //发布人名字
  createTime?: string
  updateTime?: string
}
 */
 const publisherR = useUserStore().userS
const noticeR = ref<Notice>({title:"",content:"",publisher:publisherR.value?.name})
const dialogVisible = ref(false)
const messageR = ref('题目不可为空')
const message2R = ref('')
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
        await AdminService.addNoticeService(noticeR.value);
        createNoticeBoard('通知添加成功', '');
        dialogVisible.value = false;
        noticeR.value = {};
    } catch (error) {
        // 这里可以添加对添加用户操作失败情况的处理逻辑，比如显示错误提示等
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
    min-height: 50px; /* 设置一个合适的最小高度，可根据实际需求调整 */
    height: auto;
    resize: vertical; /* 允许垂直方向拉伸，以便更自然地撑开 */
}
</style>

<script setup lang="ts">
import { AdminService } from '@/services/AdminService';
import type{ User } from '@/datasource/type';
import {  h,ref, watch } from 'vue';
import { Check ,Search} from '@element-plus/icons-vue';
import { createNoticeBoard } from '@/components/Notice';
import { ElMessage, ElMessageBox } from 'element-plus';

const inAccount = ref("")
const teacherR = ref<User>()
const viewInfoR = ref(false)
const message1 = ref("重置此账号的密码")
const message2 = ref('无此账号用户')


const searchF = async() =>{
    try{ 
  await AdminService.listSearchTeacherAcountService(inAccount.value).then((res)=>{
    teacherR.value = res.value    
    viewInfoR.value = true
  })
}catch{
  if(!teacherR.value?.account){
    teacherR.value = undefined
    alert("无此账号用户")
  }  
}
}

const resetF = async() =>{

    try {
    // 确认删除操作
    await ElMessageBox.confirm(
      h('div', [
        '重置用户账号为 ',
        h('span', { style: 'color: red; font-size: 20px;' }, teacherR.value?.account),
        ' 将不可恢复，确定重置？'
      ]),
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    );
    // 调用删除服务
    if(teacherR.value?.account){
        await AdminService.resetService(teacherR.value?.account)
        createNoticeBoard('重置密码成功', '')
        inAccount.value = ''
        teacherR.value = undefined
    }
  } catch (error) {
    ElMessage.info('取消重置');
  } finally {
    inAccount.value = '';
    teacherR.value = undefined;
    viewInfoR.value = false

    
  }

}

</script>
<template>
<div>
<el-row>
    <el-col :span="8"></el-col>
    <el-col  :span="8">
        <el-input placeholder="请输入要重置密码的账号：" class="my-input" v-model="inAccount"/>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="1">
      <el-button type="success" :icon="Search" circle :disabled="!inAccount"
      @click="searchF"/>
</el-col>
    <el-col :span="1">
        <el-tooltip
        class="box-item"
        effect="dark"
        :content="message1"
        placement="right-start"
      >
      <el-button type="success" :icon="Check" circle :disabled="!teacherR?.account"
      @click="resetF"/>
    </el-tooltip>

</el-col>
<el-col :span="6"></el-col>
</el-row>
<el-row>
    <el-col :span="8"></el-col>
    <el-text v-if="!teacherR">{{ message2 }}</el-text>
    <el-col v-if="viewInfoR && teacherR" :span="8">
        <br>
           姓名：  {{ teacherR?.name }} <br>
           电话： {{ teacherR?.phone }}
    </el-col>
    <el-col :span="8"></el-col>
</el-row>



</div>
</template>
<style scoped>


</style>
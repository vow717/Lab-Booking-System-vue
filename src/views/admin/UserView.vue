<script setup lang="ts">
import { h, ref,watch } from 'vue';
import AddUserVue from './operation/AddUserVue.vue';
import type{User} from '@/datasource/type'
import { AdminService } from '@/services/AdminService';
import { readUserForSelectionFile } from '@/services/ExcelUtils'

const allUsersR = ref<User[]>([])
  const filesChange = (event: Event) => {
  const element = event.target as HTMLInputElement
  if (!element || !element.files) {
    return
  }
  readUserForSelectionFile(element.files![0]).then((users) => {
    allUsersR.value = users
  })

  element.value = ''
}
const submitF = async () => {
  try{
    if(allUsersR.value){
  await AdminService.addUsersService(allUsersR.value)
  createNoticeBoard('导入用户成功', '');
  }
  }catch{
    alert("导入失败")
  }finally{
    allUsersR.value = []
  }
  
}

import {Search ,DeleteFilled} from '@element-plus/icons-vue';
import { createNoticeBoard } from '@/components/Notice';
import { ElMessage, ElMessageBox } from 'element-plus';

const inAccount = ref("")
const teacherR = ref<User>()
const viewInfoR = ref(false)
const message1 = ref("删除此账号")
const message2 = ref('无此账号用户')
let allTeachers = await AdminService.listTeachersService()
console.log(allTeachers);

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
const delF = async () => {
  try {
    // 确认删除操作
    await ElMessageBox.confirm(
      h('div', [
        '删除用户账号为 ',
        h('span', { style: 'color: red; font-size: 20px;' }, teacherR.value?.account),
        ' 将不可恢复，确定删除？'
      ]),
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    );
    // 调用删除服务
    await AdminService.deluserService(teacherR.value?.id as string);
    createNoticeBoard('删除用户成功', '');
  } catch (error) {
    ElMessage.info('取消删除');
  } finally {
    inAccount.value = '';
    teacherR.value = undefined;
    viewInfoR.value = false

    
  }
};

</script>
<template>
  <div>
    <div>
      <el-row :gutter="10" style="margin-bottom: 10px"> 
        <el-col :span="6"><AddUserVue /></el-col>
        <el-col  :span="6">
        <el-input placeholder="请输入要删除的账号：" class="my-input" v-model="inAccount"/>
    </el-col>
    <el-col :span="1">
      <el-button type="success" :icon="Search" circle :disabled="!inAccount"
      @click="searchF"/>
</el-col>
<el-col :span="1">
      <el-button type="danger" :icon="DeleteFilled" circle :disabled="!teacherR?.account"
      @click="delF"/>
</el-col>
<el-text v-if="!teacherR && !viewInfoR">{{ message2 }}</el-text>
    <el-col v-if="viewInfoR" :span="8" class="teacher">
        <br>
           姓名：  {{ teacherR?.name }}  &nbsp;&nbsp;&nbsp;
           电话： {{ teacherR?.phone }}
    </el-col>
    <el-col :span="8"></el-col>
        <el-col>
        读取用户表格：
        <br />
        <input type="file" @change="filesChange" />
        <br />
        <br />
        <el-button type="success" @click="submitF" v-if="allUsersR.length">导入</el-button>
      </el-col>
      <el-col :span="12">
      {{ allUsersR}}
    </el-col>
      </el-row>
    </div>
    

  </div>
  <br>
  <div>
    <el-row :gutter="10" style="margin-bottom: 10px"> 
      

</el-row>
<el-row :gutter="10" style="margin-bottom: 10px"> 
  
</el-row>
</div>
</template>
<style scoped>
.teacher{
  position: absolute;
  top: -1rem;
  right: 5rem;
}
</style>
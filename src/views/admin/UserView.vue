<script setup lang="ts">
import { ref,watch } from 'vue';
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
  if(allUsersR.value){
  await AdminService.addUsersService(allUsersR.value)
  }
}

import { Check } from '@element-plus/icons-vue';
import { createNoticeBoard } from '@/components/Notice';

const inAccount = ref("")
const teacherR = ref<User>()
const viewInfoR = ref(false)
const message1 = ref("删除此账号")
const message2 = ref('无此账号用户')
let allTeachers = await AdminService.listTeachersService()
console.log(allTeachers);

watch(inAccount,()=>{
    teacherR.value = allTeachers.value.find((t) =>t.account === inAccount.value)
    if(teacherR.value){
        viewInfoR.value = true
    }
    })
const delF = async() =>{
await AdminService.deluserService(teacherR.value?.id as String)
createNoticeBoard('删除用户成功', '')
allTeachers = await AdminService.listTeachersService()
console.log(allTeachers);
inAccount.value = ''
}

</script>
<template>
  <div>
    <div>
      <el-row :gutter="10" style="margin-bottom: 10px"> 
        <el-col><AddUserVue /></el-col>
        <hr/>
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
      <el-col  :span="8">
        <el-input placeholder="请输入要删除的账号：" class="my-input" v-model="inAccount"/>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="1">
        <el-tooltip
        class="box-item"
        effect="dark"
        :content="message1"
        placement="right-start"
      >
      <el-button type="success" :icon="Check" circle :disabled="!teacherR?.name"
      @click="delF"/>
    </el-tooltip>

</el-col>

</el-row>
<el-row :gutter="10" style="margin-bottom: 10px"> 
  <el-text v-if="!teacherR && !viewInfoR">{{ message2 }}</el-text>
    <el-col v-if="viewInfoR" :span="8">
        <br>
           姓名：  {{ teacherR?.name }} <br>
           电话： {{ teacherR?.phone }}
    </el-col>
    <el-col :span="8"></el-col>
</el-row>
</div>
</template>

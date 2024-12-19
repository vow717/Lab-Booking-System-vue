<script setup lang="ts">
import { ref } from 'vue';
import AddUserVue from './operation/AddUserVue.vue';
import type{User} from '@/datasource/type'
import { AdminService } from '@/services/AdminService';
import { readUserForSelectionFile } from '@/services/ExcelUtils'

const allUsersR = ref<User[]>()
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
  await AdminService.addUsersService(allUsersR.value)
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
        <el-button type="success" @click="submitF" v-if="allUsersR">导入</el-button>
      </el-col>
      </el-row>
    </div>
    

  </div>
</template>

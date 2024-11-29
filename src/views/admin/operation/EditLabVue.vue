<script setup lang="ts">
import { createNoticeBoard } from '@/components/Notice'
import { locationItems } from '@/datasource/const'
import type { Lab,User } from '@/datasource/type'
import { AdminService } from '@/services/AdminService'
import { Check} from '@element-plus/icons-vue'
import { ElButton, ElCol, ElDialog, ElInput, ElOption, ElRow, ElSelect } from 'element-plus'
import {  ref, watch } from 'vue'

const prop = defineProps<{ lab: Lab}>()
const labR = ref<Lab>(JSON.parse(JSON.stringify(prop.lab)))
const dialogTableVisible = ref(true)
const manTable = ref<Lab>(JSON.parse(JSON.stringify(prop.lab.manager)))
const textarea = ref('')
const selectedValue = ref('')
selectedValue.value = labR.value.location || ''
//
const updateLabF = async() => {
await AdminService.updateLabService(labR.value)
createNoticeBoard('过程更新成功', '')
  dialogTableVisible.value = false
  labR.value = {}
}
 //

</script>
<template>
  <el-dialog v-model="dialogTableVisible" title="Message" width="800">
    <div>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="6">
          <el-input class="myInput" v-model="labR.name" placeholder="实验室号"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select 
            v-model="selectedValue"
            size="large"
            style="width: 240px" >
            <el-option
              v-for="(li, index) in locationItems"
              :key="index"
              :label="li.name"
              :value="li.v"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="6">
          <el-input
    v-model="textarea"
    maxlength="30"
    style="width: 240px"
    placeholder="Please input"
    show-word-limit
    type="textarea"
  />
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="6">
          <el-input v-model="manTable.name" placeholder="负责人姓名"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model.number="manTable.phone" placeholder="负责人电话"></el-input>
        </el-col>
        <el-col :span="6">
          
        </el-col>
      </el-row>
   </div>
   <el-button
        type="success"
        :icon="Check"
        @click="updateLabF"
      </el-button>
  </el-dialog>
</template>
<style scoped>
.myInput{
  height: 40px;
}
</style>

<script setup lang="ts">
import { createNoticeBoard } from '@/components/Notice'
import { locationItems ,statusItems} from '@/datasource/const'
import type { Lab,User } from '@/datasource/type'
import { AdminService } from '@/services/AdminService'
import { Check, CloseBold} from '@element-plus/icons-vue'
import { ElButton, ElCol, ElDialog, ElInput, ElOption, ElRow, ElSelect } from 'element-plus'
import {  ref, watch } from 'vue'
const prop = defineProps<{ lab: Lab}>()
const labR = ref<Lab>(JSON.parse(JSON.stringify(prop.lab)))
const dialogTableVisible = ref(true)
const capacityR = ref<Number>(labR.value.capacity as number)
console.log(capacityR);
const labNameR = ref(labR.value.name?.slice(2))
const textarea = ref(labR.value.config)
const selectedValue =ref( labR.value.name?.slice(0,2) || '')
const statusR = ref(labR.value.status)
const managerR = ref<{name:String,phone:String}>(JSON.parse(labR.value.manager))
const messageR = ref('实验室号、地点、状态、容纳人数(数字)不可为空')
watch(capacityR, (newValue, oldValue) => {
    if (newValue!== null && isNaN(Number(newValue))) {
        capacityR.value = JSON.parse(JSON.stringify(prop.lab.capacity))
      }
    });
//
const updateLabF = async() => {
  labR.value.name = selectedValue.value + labNameR
  console.log(labR.value.name);
  labR.value.capacity = capacityR.value as number
  labR.value.config = textarea.value
  labR.value.manager = managerR.value
  labR.value.status = statusR.value
await AdminService.updateLabService(labR.value)
createNoticeBoard('实验室信息更新成功', '')
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
          <el-input class="myInput" v-model="labNameR" placeholder="实验室号"></el-input>
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
          <el-input v-model.number="capacityR" placeholder="容纳人数"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select 
            v-model="statusR"
            size="defult"
            style="width: 240px" >
            <el-option
              v-for="(li, index) in statusItems"
              :key="index"
              :label="li"
              :value="li"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="6">
          <el-input v-model="managerR.name" placeholder="管理员姓名"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="managerR.phone" placeholder="管理员电话"></el-input>
        </el-col>
      </el-row>
   </div>

   <el-tooltip v-if="!(capacityR && labNameR && selectedValue && statusR)" :content="messageR" placement="bottom" effect="light">
      <el-button  :icon="CloseBold" :disabled="!(capacityR && labNameR && selectedValue && statusR)"></el-button>
    </el-tooltip>
    <el-tooltip v-else content="提交" placement="bottom" effect="light">
      <el-button
          type="success"
          :icon="Check"
          @click="updateLabF"
          :disabled="!(capacityR && labNameR && selectedValue && statusR)"
      ></el-button>
    </el-tooltip>
    {{ labR }}
  </el-dialog>
</template>
<style scoped>
.myInput{
  height: 40px;
}
</style>

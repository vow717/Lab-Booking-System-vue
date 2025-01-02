<script setup lang="ts">
import { createNoticeBoard } from '@/components/Notice'
import { locationItems,statusItems ,managerItems} from '@/datasource/const'
import { AdminService } from '@/services/AdminService'
import type { Lab,User } from '@/datasource/type'
import { Check, Minus, Plus,CloseBold } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'

const labR = ref<Lab>({})
const allLabsM = defineModel('alllabs')
const dialogVisible = ref(false)
const capacityR = ref(null)
const labNameR = ref('')
const textarea = ref('')
const selectedValue = ref('')
const statusR = ref(statusItems[0])
const managerR = ref<{name:String,phone:String}>(managerItems[0])
const messageLabR = ref('实验室号、地点、状态、容纳人数(数字)不可为空')


//
watch(capacityR, (newValue, oldValue) => {
    if (newValue!== null && isNaN(Number(newValue))) {
        capacityR.value = null;
      }
});

watch(selectedValue, (newValue, oldValue) => {
  if(managerR.value = managerItems.find((m) =>m.name.slice(0,2) === newValue.slice(0,2))) return
  else  {managerR.value = managerItems[0]} return
  
});
//
const addLabF = async () => {
  labR.value.name = selectedValue.value.slice(0,2) + labNameR.value
  labR.value.config = textarea.value
  labR.value.status = statusR.value
  if(capacityR.value != null){
    labR.value.capacity = capacityR.value as number
  }
  labR.value.manager = managerR.value
  allLabsM.value = await AdminService.addLabService(labR.value)  
  createNoticeBoard('实验室添加成功', '')
  dialogVisible.value = false
  labR.value = {}
}
</script>
<template>
  <el-button  class="addLab" type="primary" @click="dialogVisible = true">
    <el-icon><Plus /></el-icon>
  </el-button>
  <el-dialog v-model="dialogVisible" title="Message" width="800">
    <div>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="8">
          <el-select 
            v-model="selectedValue"
            size="defult"
            style="width: 240px" >
            <el-option
              v-for="(li, index) in locationItems"
              :key="index"
              :label="li.name"
              :value="li.name"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input class="myInput" v-model="labNameR" placeholder="实验室号"></el-input>
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
      <br>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="6">
          <el-input v-model="managerR.name" placeholder="管理员姓名"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="managerR.phone" placeholder="管理员电话"></el-input>
        </el-col>
      </el-row>
   </div>
   <el-tooltip v-if="!(capacityR && labNameR && selectedValue && statusR)" :content="messageLabR" placement="bottom" effect="light">
      <el-button type="disabled" :icon="CloseBold" :disabled="!(capacityR && labNameR && selectedValue && statusR)"></el-button>
    </el-tooltip>
    <el-tooltip v-else content="提交" placement="bottom" effect="light">
      <el-button
          type="success"
          :icon="Check"
          @click="addLabF"
          :disabled="!(capacityR && labNameR && selectedValue && statusR)"
      ></el-button>
    </el-tooltip>
  {{ labR }}
  </el-dialog>
</template>
<style scoped>
.addLab{
  margin-bottom: 20px;
}
</style>

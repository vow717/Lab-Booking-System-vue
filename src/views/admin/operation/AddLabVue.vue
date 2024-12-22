<script setup lang="ts">
import { createNoticeBoard } from '@/components/Notice'
import { locationItems } from '@/datasource/const'
import { AdminService } from '@/services/AdminService'
import type { Lab } from '@/datasource/type'
import { Check, Minus, Plus,CloseBold } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'

const labR = ref<Lab>({})
const dialogVisible = ref(false)
const capacityR = ref(null)
const textarea = ref('')
const selectedValue = ref('')
selectedValue.value = labR.value.name?.slice(0,2) || ''
const messageLabR = ref('实验室号、地点、容纳人数(数字)不可为空')

//
watch(capacityR, (newValue, oldValue) => {
    if (newValue!== null && isNaN(Number(newValue))) {
        capacityR.value = null;
      }
    });
//
const addLabF = async () => {
  await AdminService.addLabService(labR.value)
  createNoticeBoard('实验室添加成功', '')
  dialogVisible.value = false
  labR.value = {}
}

//
</script>
<template>
  <el-button  class="addLab" type="primary" @click="dialogVisible = true">
    <el-icon><Plus /></el-icon>
  </el-button>
  <el-dialog v-model="dialogVisible" title="Message" width="800">
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
          <el-input v-model.number="capacityR" placeholder="容纳人数"></el-input>
        </el-col>
        <el-col :span="6">
          
        </el-col>
      </el-row>
   </div>
   <el-tooltip v-if="!(capacityR && labR.name && selectedValue)" :content="messageLabR" placement="bottom" effect="light">
      <el-button type="disabled" :icon="CloseBold" :disabled="!(capacityR && labR.name && selectedValue)"></el-button>
    </el-tooltip>
    <el-tooltip v-else content="提交" placement="bottom" effect="light">
      <el-button
          type="success"
          :icon="Check"
          @click="addLabF"
          :disabled="!(capacityR && labR.name && selectedValue)"
      ></el-button>
    </el-tooltip>
  
  </el-dialog>
</template>
<style scoped>
.addLab{
  margin-bottom: 20px;
}
</style>

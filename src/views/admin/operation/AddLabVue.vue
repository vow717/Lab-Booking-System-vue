<script setup lang="ts">
import { createNoticeBoard } from '@/components/Notice'
import { locationItems } from '@/datasource/const'
import { AdminService } from '@/services/AdminService'
import type { Lab } from '@/datasource/type'
import { Check, Minus, Plus } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'

const prop = defineProps<{ lab: Lab}>()
const labR = ref<Lab>({})
const dialogVisible = ref(false)
const manTable = ref<Lab>({})
const textarea = ref('')
const selectedValue = ref('')
selectedValue.value = labR.value.location || ''


//

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
        @click="addLabF"
      </el-button>
  </el-dialog>
</template>
<style scoped>
.addLab{
  margin-bottom: 20px;
}
</style>

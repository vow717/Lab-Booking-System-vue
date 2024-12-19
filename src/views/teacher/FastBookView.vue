<script setup lang="ts">
import { listCourses } from '@/datasource/datasourse'
import type { LabFree } from '@/datasource/type'
import { ref } from 'vue'

const courses = listCourses()
const selectCourseId = ref('')
const selectDay = ref(0)
const selectWeek = ref(0)
const days = [
  { value: 1, label: '周一' },
  { value: 2, label: '周二' },
  { value: 3, label: '周三' },
  { value: 4, label: '周四' },
  { value: 5, label: '周五' },
  { value: 6, label: '周六' },
  { value: 7, label: '周日' }
]
const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

const freeLabs = ref<LabFree[]>([])
const showFreeLabs = ref([])
const findFreeLabs = () => {
  //调用后端接口查询空余实验室
  //await
  freeLabs.value = [
    {
      laboratoryId: '1',
      laboratoryName: '实验室901',
      freePeriods: '1,2,3,4'
    },
    {
      laboratoryId: '3',
      laboratoryName: '实验室903',
      freePeriods: '1,4'
    },
    {
      laboratoryId: '8',
      laboratoryName: '实验室905',
      freePeriods: '2,3,4'
    }
  ]
  freeLabs.value.forEach(item => {
    showFreeLabs.value.push({
      laboratoryName: item.laboratoryName,
      laboratoryId: item.laboratoryId,
      1: item.freePeriods.indexOf('1') != -1 ? '空' : '占',
      2: item.freePeriods.indexOf('2') != -1 ? '空' : '占',
      3: item.freePeriods.indexOf('3') != -1 ? '空' : '占',
      4: item.freePeriods.indexOf('4') != -1 ? '空' : '占'
    })
  })
}
</script>
<template>
  <div>
    <h3>快速查询空余实验室</h3>
    <el-divider></el-divider>
    <p>选择课程：</p>
    <el-select v-model="selectCourseId" placeholder="请选择课程" style="width: 30%">
      <el-option
        v-for="item in courses"
        :key="item.id"
        :label="item.name"
        :value="item.id"></el-option>
    </el-select>
    <el-divider></el-divider>
    <el-row v-if="selectCourseId != ''">
      <el-col :span="4">
        <span>周数：</span>
        <el-select v-model="selectWeek" placeholder="请选择周数" style="width: 100%">
          <el-option v-for="item in weeks" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <span>星期数：</span>
        <el-select v-model="selectDay" placeholder="请选择星期" style="width: 100%">
          <el-option
            v-for="item in days"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="findFreeLabs">查询</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-table :data="showFreeLabs" style="width: 100%">
      <el-table-column prop="laboratoryName" label="实验室名"></el-table-column>
      <el-table-column prop="1" label="第1,2节">
        <template #default="{ row }">
          <span>{{ row[1] }}</span>
          <input type="checkbox" :disabled="row[1] == '占'" />
        </template>
      </el-table-column>
      <el-table-column prop="2" label="第3,4节">
        <template #default="{ row }">
          <span>{{ row[2] }}</span>
          <input type="checkbox" :disabled="row[2] == '占'" />
        </template>
      </el-table-column>
      <el-table-column prop="3" label="第5,6节">
        <template #default="{ row }">
          <span>{{ row[3] }}</span>
          <input type="checkbox" :disabled="row[3] == '占'" />
        </template>
      </el-table-column>
      <el-table-column prop="4" label="第7,8节">
        <template #default="{ row }">
          <span>{{ row[4] }}</span>
          <input type="checkbox" :disabled="row[4] == '占'" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<template>
  <div>
    <input type="file" @change="handleFileChange" />

    <el-table v-if="jsonData.length" :data="jsonData" style="width: 100%">
      <el-table-column v-for="(value, key) of jsonData[0]" :key="key" :prop="key" :label="key" />
    </el-table>
  </div>
  <br />
  <el-button type="primary" @click="handleSave()" :disabled="!jsonData.length">
    确认上传课表
  </el-button>
  <div>{{ ABC1 }}</div>

  <!-- <div v-if="ABC1.length">
    <el-table :data="ABC1" style="width: 100%">
      <el-table-column label="课程名称" prop="name" />
      <el-table-column label="总学时" prop="total" />
      <el-table-column label="课程类型" prop="type" />
      <el-table-column label="上课节点" prop="theory">
        <template #default="{ row }">
          <el-table :data="row.theory" style="width: 100%">
            <el-table-column label="上课节点" prop="period" />
            <el-table-column label="上课日期" prop="day" />
            <el-table-column label="上课周次" prop="week" />
            <el-table-column label="上课地点" prop="class" />
          </el-table>
        </template>
      </el-table-column>
    </el-table>
  </div> -->
</template>

<script setup lang="ts">
import type { ABC1Course, DEF2Course } from '@/datasource/type'
import { ref } from 'vue'
import * as XLSX from 'xlsx'

const jsonData = ref([])
const ABC1 = ref<ABC1Course[]>([])
const DEF2 = ref<DEF2Course[]>([])

const handleFileChange = async uploadedFile => {
  const file = uploadedFile.target.files[0]
  jsonData.value = await parseExcelFile(file)
}

const parseExcelFile = async file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      const data = reader.result
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const rawJsonData = XLSX.utils.sheet_to_json(worksheet)

      // 对数据进行封装处理
      const formattedData = rawJsonData.map(row => ({
        name: row['课程名称'] || '',
        room: row['上课地点'] || '',
        period: row['上课节点（节数）'] || '',
        day: row['上课日期（星期）'] || '',
        week: row['上课周次'] || '',
        type: row['课程类型'] || '',
        require_config: row['课程要求'] || '',
        total: row['总学时'] || ''
      }))

      resolve(formattedData)
    }
    reader.onerror = error => reject(error)
  })
}

//对excel课程信息进行处理
const handleSave = () => {
  const abc1 = jsonData.value.filter(course => course.type === '理论课')
  const def2 = jsonData.value.filter(course => course.type === '实验课')

  abc1.forEach(course => {
    if (ABC1.value.find(c => c.name == course.name) !== undefined) {
      ABC1.value
        .find(c => c.name == course.name)
        .theory.push({
          period: course.period,
          day: course.day,
          week: course.week,
          class: course.room
        })
    } else {
      ABC1.value.push({
        name: course.name,
        total: course.total,
        type: course.type,
        theory: [{ period: course.period, day: course.day, week: course.week, class: course.room }]
      })
    }
  })
  def2.forEach(course => {
    DEF2.value.push({
      name: course.name,
      total: course.total,
      type: course.type,
      reserved: 0
    })
  })
}
</script>
<style scoped>
input[type='file'] {
  border: 1px solid #ccc;
  background-color: aqua;
  padding: 10px;
  border-radius: 5px;
  font-size: 20px;
}
input[type='file']:hover {
  cursor: pointer;
}
</style>

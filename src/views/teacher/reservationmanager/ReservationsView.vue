<script setup lang="ts">
import { listReservations } from '@/datasource/datasourse'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'

//const reservations=TacherService.listReservations();

let showReservations = listReservations()
const needDelete = ref<string[]>([])
//按课程名，实验室名，节数，星期名，周数排序
showReservations.sort((a, b) => {
  return (
    a.courseName.localeCompare(b.courseName) ||
    a.laboratoryName.localeCompare(b.laboratoryName) ||
    a.period - b.period ||
    a.day - b.day ||
    a.week - b.week
  )
})

const delDay = (day: number) => {
  return ['周一', '周二', '周三', '周四', '周五', '周六', '周日'][day - 1]
}
const delPeriod = (period: number) => {
  return ['第1,2节', '第3,4节', '第5,6节', '第7,8节'][period - 1]
}
const delF = async (ids: string[]) => {
  const confirmResult = await ElMessageBox.confirm('确定删除预约吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  if (confirmResult === 'confirm') {
    for (let i = 0; i < ids.length; i++) {
      //await TeacherService.deleteReservationService(ids[i])
      showReservations = showReservations.filter(item => item.id !== ids[i])
    }
  } else {
    console.log('已取消删除操作')
  }
  needDelete.value = []
}
</script>
<template>
  {{ needDelete }}
  <br />
  <el-button type="danger" @click="delF(needDelete)" :disabled="needDelete.length == 0">
    批量删除
  </el-button>
  <div>
    <el-table :data="showReservations" style="width: 100%">
      <el-table-column prop="courseName" label="课程名"></el-table-column>
      <el-table-column label="实验室名" prop="laboratoryName"></el-table-column>
      <el-table-column label="星期数">
        <template #default="{ row }">
          <span>{{ delDay(row.day) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="节数">
        <template #default="{ row }">
          <span>{{ delPeriod(row.period) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="week" label="周数"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="danger" @click="delF([row.id])">删除</el-button>
          <!--空格-->
          <el-divider direction="vertical"></el-divider>
          <input type="checkbox" v-model="needDelete" :value="row.id" />
        </template>
      </el-table-column>
    </el-table>

    <el-row></el-row>
  </div>
</template>

<script setup lang="ts">
import { TeacherService } from '@/services/TeacherService'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'

const showReservations = await TeacherService.listReservationsService()

const needDelete = ref<string[]>([])
//按课程名
const coursesName = new Set<string>()
showReservations.value.forEach(item => {
  coursesName.add(item.courseName)
})
const showAll = (name: string) => {
  return showReservations.value.filter(item => item.courseName == name)
}
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
    await TeacherService.deleteReservationService(ids)
    showReservations.value = showReservations.value.filter(item => ids.indexOf(item.id) == -1)
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
    <el-collapse accordion>
      <template v-for="(item, index) in coursesName" :key="index">
        <el-collapse-item :title="item" :name="item">
          <el-table :data="showAll(item)" style="width: 100%">
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
        </el-collapse-item>
      </template>
    </el-collapse>
    <el-row></el-row>
  </div>
</template>

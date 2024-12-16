<script setup lang="ts">
import type { DEF2Course } from '@/datasource/type'
import { ref, watch } from 'vue'
import ChildDialog from './BookLabDialog2.vue'
// 接收父组件传递的课程信息
const props = defineProps<{
  course: DEF2Course | null
  closeDialog1: () => void
}>()

const dialogVisible = ref(false)
const currentLab = ref<{ id: string; name: string; config: string; capacity: number }>({})
//监听课程信息的变化,一变课表dialogVisible就变为false
watch(
  () => props.course,
  () => {
    dialogVisible.value = false
  }
)

const labs = ref([
  {
    id: '1',
    name: '实验室1',
    config: 'Windows 11',
    capacity: 100
  },
  {
    id: '2',
    name: '实验室2',
    config: 'Windows 10',
    capacity: 80
  },
  {
    id: '3',
    name: '实验室3',
    config: 'Windows 8',
    capacity: 120
  },
  {
    id: '4',
    name: '实验室4',
    config: 'Windows 7',
    capacity: 40
  },
  {
    id: '5',
    name: '实验室5',
    config: 'Windows XP',
    capacity: 20
  },
  {
    id: '6',
    name: '实验室6',
    config: 'Windows 2000',
    capacity: 60
  },
  {
    id: '7',
    name: '实验室7',
    config: 'Windows 98',
    capacity: 130
  },
  {
    id: '8',
    name: '实验室8',
    config: 'Windows 95',
    capacity: 50
  },
  {
    id: '9',
    name: '实验室9',
    config: 'Windows 3.1',
    capacity: 110
  },
  {
    id: '10',
    name: '实验室10',
    config: 'Windows 1.0',
    capacity: 90
  }
])
const showLabs = ref<{ id: string; name: string; config: string; capacity: number }[]>(
  labs.value.filter(lab => lab.capacity >= props.course?.require_number)
)
watch(
  () => props.course,
  () => {
    showLabs.value = labs.value.filter(lab => lab.capacity >= props.course?.require_number)
  }
)

const confirmReservation = (lab: {
  id: string
  name: string
  config: string
  capacity: number
}) => {
  currentLab.value = lab
  dialogVisible.value = true
}
const handleCloseDialog = () => {
  dialogVisible.value = false
  props.closeDialog1()
}
</script>
<template>
  <div class="child-dialog-container">
    <!--正方形的实验室卡片-->
    <div>
      <p>课程信息:</p>
      <p>{{ props.course?.name }}</p>
      <p>实验要求：{{ props.course?.require_number }}人；{{ props.course?.require_config }}</p>
    </div>
    <br />
    <div class="card-container">
      <el-card v-for="lab in showLabs" :key="lab.id">
        <el-popover placement="top-start" title="实验室信息" :width="200" trigger="hover">
          <p>教室容量：{{ lab.capacity }}</p>
          {{ lab.config }}
          <template #reference>
            <div>
              <p>{{ lab.name }}</p>

              <el-button type="primary" @click="confirmReservation(lab)">预约</el-button>
            </div>
          </template>
        </el-popover>
      </el-card>
    </div>
    <div v-if="dialogVisible">
      <ChildDialog :course="props.course" :closeDialog2="handleCloseDialog" :lab="currentLab" />
    </div>
  </div>
</template>
<style scoped>
.child-dialog-container {
  width: 1200px; /* 设置固定宽度 */
  box-sizing: border-box; /* 确保边框、内边距等不额外撑大宽度 */
}
.card-container {
  display: flex;
  max-height: 300px;
  overflow-y: auto; /* 当内容在垂直方向溢出时显示滚动条 */
  flex-wrap: wrap;
  gap: 7px; /* 卡片之间的间距 */
}

.el-card {
  flex: 0 0 calc(15% - 7px);
}
</style>

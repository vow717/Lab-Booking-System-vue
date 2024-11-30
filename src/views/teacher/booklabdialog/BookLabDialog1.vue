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
  <div>
    <!--正方形的实验室卡片-->
    <div>
      <p>课程信息:</p>
      <p>{{ props.course?.name }}</p>
      <p>{{ props.course?.require_config }}</p>
    </div>
    <br />
    <div class="card-container">
      <el-card v-for="lab in showLabs" :key="lab.id">
        <div>
          <p>-实验室名称-：</p>
          <p>{{ lab.name }}</p>
          <p>-实验室配置-:</p>
          <p>{{ lab.config }}</p>
          <el-button @click="confirmReservation(lab)">预约</el-button>
        </div>
      </el-card>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="预约实验室"
      :close-on-click-modal="false"
      :destroy-on-close="true">
      <ChildDialog :course="props.course" :closeDialog2="handleCloseDialog" :lab="currentLab" />
    </el-dialog>
  </div>
</template>
<style scoped>
.card-container {
  display: flex;
  max-height: 400px;
  overflow-y: auto; /* 当内容在垂直方向溢出时显示滚动条 */

  flex-wrap: wrap;
  gap: 10px; /* 卡片之间的间距 */
}

.el-card {
  flex: 0 0 calc(20% - 10px);
}
</style>

<script setup lang="ts">
import type { DEF2Course } from '@/datasource/type'
import { ref } from 'vue'
import ChildDialog from './BookLabDialog2.vue'
// 接收父组件传递的课程信息
const props = defineProps<{
  course: DEF2Course | null
  closeDialog1: () => void
}>()

const dialogVisible = ref(false)
const currentLab = ref<{ id: string; name: string; required_config: string }>({})

const labs = ref([
  {
    id: '1',
    name: '实验室1',
    required_config: '100人,Windows 11'
  },
  {
    id: '2',
    name: '实验室2',
    required_config: '80人,Windows 10'
  },
  {
    id: '3',
    name: '实验室3',
    required_config: '60人,Windows 8'
  },
  {
    id: '4',
    name: '实验室4',
    required_config: '40人,Windows 7'
  },
  {
    id: '5',
    name: '实验室5',
    required_config: '20人,Windows 6'
  },
  {
    id: '6',
    name: '实验室6',
    required_config: '10人,Windows 5'
  },
  {
    id: '7',
    name: '实验室7',
    required_config: '5人,Windows 4'
  },
  {
    id: '8',
    name: '实验室8',
    required_config: '2人,Windows 3'
  },
  {
    id: '9',
    name: '实验室9',
    required_config: '1人,Windows 2'
  },
  {
    id: '10',
    name: '实验室10',
    required_config: '1人,Windows 1'
  },
  {
    id: '11',
    name: '实验室11',
    required_config: '1人,Windows 0'
  }
])
const confirmReservation = (lab: { id: string; name: string; required_config: string }) => {
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
      <el-card v-for="lab in labs" :key="lab.id">
        <div>
          <p>-实验室名称-：</p>
          <p>{{ lab.name }}</p>
          <p>-实验室配置-:</p>
          <p>{{ lab.required_config }}</p>
          <el-button @click="confirmReservation(lab)">预约</el-button>
        </div>
      </el-card>
    </div>
    <el-dialog v-model="dialogVisible" title="预约实验室">
      <ChildDialog :course="props.course" :closeDialog2="handleCloseDialog" :lab="currentLab" />
    </el-dialog>
  </div>
</template>
<style scoped>
.card-container {
  display: flex;
  max-height: 400px; /* 设置一个合适的最大高度值，可根据实际情况调整 */
  overflow-y: auto; /* 当内容在垂直方向溢出时显示滚动条 */

  flex-wrap: wrap;
  gap: 10px; /* 卡片之间的间距，可以根据需要调整 */
}

.el-card {
  flex: 0 0 calc(20% - 10px); /* 如果要一行显示3个卡片，每个卡片占据大约三分之一的宽度，减去间距 */
  /* 如果要一行显示4个卡片，则改为 flex: 0 0 calc(25% - 10px); */
}
</style>

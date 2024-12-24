<script setup lang="ts">
import type { DEF2Course, Lab } from '@/datasource/type'
import { TeacherService } from '@/services/TeacherService'
import { ref, watch } from 'vue'
import ChildDialog from './BookLabDialog2.vue'
// 接收父组件传递的课程信息
const props = defineProps<{
  course: DEF2Course | null
  closeDialog1: () => void
}>()

const dialogVisible = ref(false)
const currentChangeCourse = ref<DEF2Course>({ id: '0', name: '', require_number: 0 })
const currentLab = ref<{ id: string; name: string; config: string; capacity: number }>({})
//监听课程信息的变化,一变课表dialogVisible就变为false
watch(
  () => props.course,
  () => {
    dialogVisible.value = false
  }
)

const options = [
  {
    value: '补课',
    label: '补课'
  },
  {
    value: '考试',
    label: '考试'
  },
  {
    value: '讲题',
    label: '讲题'
  },
  {
    value: '其他',
    label: '其他'
  }
]
const labs = await TeacherService.listLabsService()
// const labs = ref([
//   {
//     id: '1',
//     name: '实验室1',
//     config: 'Windows 11',
//     capacity: 100
//   },
//   {
//     id: '2',
//     name: '实验室2',
//     config: 'Windows 10',
//     capacity: 80
//   },
//   {
//     id: '3',
//     name: '实验室3',
//     config: 'Windows 8',
//     capacity: 120
//   },
//   {
//     id: '4',
//     name: '实验室4',
//     config: 'Windows 7',
//     capacity: 40
//   },
//   {
//     id: '5',
//     name: '实验室5',
//     config: 'Windows XP',
//     capacity: 20
//   },
//   {
//     id: '6',
//     name: '实验室6',
//     config: 'Windows 2000',
//     capacity: 60
//   },
//   {
//     id: '7',
//     name: '实验室7',
//     config: 'Windows 98',
//     capacity: 130
//   },
//   {
//     id: '8',
//     name: '实验室8',
//     config: 'Windows 95',
//     capacity: 50
//   },
//   {
//     id: '9',
//     name: '实验室9',
//     config: 'Windows 3.1',
//     capacity: 110
//   },
//   {
//     id: '10',
//     name: '实验室10',
//     config: 'Windows 1.0',
//     capacity: 90
//   }
// ])

const showLabs = ref<Lab[]>(
  labs.value.filter(lab => lab => lab.capacity ?? 0 >= (props.course?.require_number ?? 0))
)
watch(
  () => props.course,
  () => {
    showLabs.value = labs.value.filter(
      lab => lab.capacity ?? 0 >= (props.course?.require_number ?? 0)
    )
    console.log(showLabs.value)
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
  currentChangeCourse.value = { id: '0', name: '', require_number: 0 }
  props.closeDialog1()
}
</script>
<template>
  <div class="child-dialog-container">
    <!--正方形的实验室卡片-->
    <div>
      <p>预约信息:</p>
      <template v-if="props.course?.id == '0'">
        <!--选择临时预约的事件，例如补课，考试，讲题，其他，如果是其他可以有个输入框由用户输入-->
        <el-select v-model="currentChangeCourse.name" placeholder="请选择课程" style="width: 20%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </template>
      <template v-else>
        <p>课程名称：{{ props.course?.name }}</p>
        <p>
          实验要求：{{ props.course?.require_number ?? 0 }}人；{{
            props.course?.require_config ?? '无'
          }}
        </p>
      </template>
    </div>
    <br />
    <div class="card-container" v-if="props.course?.id != '0' || currentChangeCourse.name != ''">
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
      <ChildDialog
        :course="props.course?.id == '0' ? currentChangeCourse : props.course"
        :lab="currentLab"
        :closeDialog2="handleCloseDialog" />
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

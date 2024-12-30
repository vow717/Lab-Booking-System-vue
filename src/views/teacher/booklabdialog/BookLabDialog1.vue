<script setup lang="ts">
import type { DEF2Course, Lab } from '@/datasource/type'
import { TeacherService } from '@/services/TeacherService'
import { ref, watch } from 'vue'
import ChildDialog from './BookLabDialog2.vue'
/*
4*7*18=504个预约记录每个实验室最多
我们界定个规定,
0-30是暂闲，颜色为白色
31-80是较闲，颜色为蓝色
81-130是较忙，颜色为黄色  
131-180繁忙，颜色为橙色
181-504是火爆，颜色为红色
颜色要淡一些

*/
const colorCount = (count: number) => {
  if (count <= 30) {
    return '#ffffff'
  } else if (count <= 80) {
    return '#87CEFA'
  } else if (count <= 130) {
    return '#FFD700'
  } else if (count <= 180) {
    return '#FFA500'
  } else {
    return '#FF0000'
  }
}

// 接收父组件传递的课程信息
const props = defineProps<{
  course: DEF2Course | null
  closeDialog1: () => void
}>()

const dialogVisible = ref(false)
const currentChangeCourse = ref<DEF2Course>({ id: '0', name: '', requireNumber: 0, total: 1000 })
const currentLab = ref<Lab>()
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
console.log(labs.value)
const showLabs = ref<Lab[]>(
  labs.value.filter(lab => (lab.capacity ?? 0) >= (props.course?.requireNumber ?? 0))
)
watch(
  () => props.course,
  () => {
    showLabs.value = labs.value.filter(
      lab => (lab.capacity ?? 0) >= (props.course?.requireNumber ?? 0)
    )
  }
)

const confirmReservation = (lab: Lab) => {
  currentLab.value = lab
  dialogVisible.value = true
}
const handleCloseDialog = () => {
  dialogVisible.value = false
  currentChangeCourse.value = { id: '0', name: '', requireNumber: 0 }
  props.closeDialog1()
  //重新加载页面
  location.reload()
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
          实验要求：{{ props.course?.requireNumber ?? 0 }}人；{{
            props.course?.requireConfig ?? '无'
          }}
        </p>
      </template>
    </div>
    <br />
    <div class="card-container" v-if="props.course?.id != '0' || currentChangeCourse.name != ''">
      <el-card
        v-for="lab in showLabs"
        :key="lab.id"
        :style="{ backgroundColor: colorCount(lab.count ?? 0), opacity: 0.5 }">
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

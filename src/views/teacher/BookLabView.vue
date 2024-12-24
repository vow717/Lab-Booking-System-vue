<script setup lang="ts">
import type { DEF2Course } from '@/datasource/type'
import { TeacherService } from '@/services/TeacherService'
import { computed, ref } from 'vue'
import ChildDialog from './booklabdialog/BookLabDialog1.vue'
//courses是会从数据库中获取的实验课课程
const courses = await TeacherService.listCoursesService()
// //这里虚拟创建一下
// const courses = ref<DEF2Course[]>([
//   {
//     id: '0',
//     name: '临时预约',
//     require_number: 0
//   },
//   {
//     id: '1',
//     name: 'web实验',
//     type: 'DEF2',
//     require_config: 'Windows 11',
//     require_number: 100,
//     total: 12
//   },
//   {
//     id: '2',
//     name: 'java实验',
//     type: 'DEF2',
//     require_config: 'Windows 10',
//     require_number: 80,
//     total: 8
//   },
//   {
//     id: '3',
//     name: 'c++实验',
//     type: 'DEF2',

//     require_config: 'Windows 8',
//     require_number: 120,
//     total: 10
//   },
//   {
//     id: '4',
//     name: 'python实验',
//     type: 'DEF2',
//     require_config: 'Windows 7',
//     require_number: 60,
//     total: 6
//   },
//   {
//     id: '5',
//     name: 'php实验',
//     type: 'DEF2',
//     require_config: 'Windows XP',
//     require_number: 40,
//     total: 4
//   },

//   {
//     id: '6',
//     name: 'go实验',
//     type: 'DEF2',
//     require_config: 'Windows 2000',
//     require_number: 20,
//     total: 2
//   },
//   {
//     id: '7',
//     name: 'C#实验',
//     type: 'DEF2',
//     require_config: 'Windows XP',
//     require_number: 80,
//     total: 4
//   }
// ])

// 控制实验室标签显示隐藏的变量
const tagVisible = ref(false)
// 当前点击课程的信息
const currentCourse = ref<DEF2Course | null>(null)
// 点击预约按钮的方法
const openDialog = (course: DEF2Course) => {
  currentCourse.value = course
  tagVisible.value = true
}
// 处理子组件发出的关闭模态框事件
const handleCloseDialog = () => {
  console.log('关闭模态框')
  tagVisible.value = false
}

// 选择高亮的课程
const isHighlighted = computed(() => {
  return (cId: string) => {
    if (!currentCourse.value) {
      return false
    }
    return cId === currentCourse.value.id
  }
})
</script>
<template>
  <div class="main-layout">
    <!--卡片用侧边栏的格式放在右边悬挂-->
    <div class="cardcontainer">
      <!--卡片形式，添加个临时预约的card{
     id: '0',
     name: '临时预约',
     require_number: 0
   },-->
      <el-card :class="{ highlight: isHighlighted('0') }">
        <div>
          <p>课程名称：临时预约</p>
          <el-button @click="openDialog({ id: '0', name: '临时预约', requireNumber: 0 })">
            选择
          </el-button>
        </div>
      </el-card>
      <!--用卡片形式摆列所有的课程courses-->
      <!--加个高光类，如果key(course.id)==current选的course,启动这个类-->
      <el-card
        v-for="course in courses"
        :key="course.id"
        :class="{ highlight: isHighlighted(course.id) }"
        v-if="courses?.length > 0">
        <div>
          <p>课程名称：{{ course.name }}</p>
          <el-button @click="openDialog(course)">选择</el-button>
        </div>
      </el-card>
    </div>

    <div v-if="tagVisible">
      <ChildDialog :course="currentCourse" :closeDialog1="handleCloseDialog" />
    </div>
  </div>
</template>

<style scoped>
/* 添加整体布局容器的样式 */
.main-layout {
  display: flex;
  width: 100%;
}
.cardcontainer {
  width: 25%; /* 设置课程卡片容器宽度占比25% */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 80vh;
  overflow-y: auto;
}
.highlight {
  background-color: #f0f0f0;
}
.el-card {
  width: 250px;
}
div[v-if='tagVisible'] {
  width: 70%;
}
</style>

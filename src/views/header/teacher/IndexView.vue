<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const menus = ref<{ name: string; path: string; children?: { name: string; path: string }[] }[]>([
  { name: '查看课表', path: '/teacher/schedule' },
  {
    name: '编辑课程',
    path: '/teacher/Course'
  },
  { name: '导入课表', path: '/teacher/importSchedule' },
  { name: '预约实验室', path: '/teacher/bookLab' },
  { name: '查看公告', path: '/teacher/notice' }
])

const route = useRoute()
const activeIndexR = ref('')

watch(
  route,
  () => {
    const p = menus.value.find(mn => mn.path == route.path)
    activeIndexR.value = p?.path ?? ''
  },
  { immediate: true }
)
</script>
<template>
  <div>
    <el-menu :default-active="activeIndexR" mode="horizontal" router>
      <template v-for="(menu, index) in menus" :key="index">
        <!-- 如果菜单有子菜单，则显示下拉菜单 -->
        <el-sub-menu v-if="menu.children" :index="menu.path" :key="index">
          <template #title>{{ menu.name }}</template>
          <template v-for="(subMenu, subIndex) in menu.children" :key="subIndex">
            <el-menu-item :index="subMenu.path">
              {{ subMenu.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        <!-- 如果菜单没有子菜单，则显示普通菜单项 -->
        <el-menu-item v-if="!menu.children" :index="menu.path">
          {{ menu.name }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

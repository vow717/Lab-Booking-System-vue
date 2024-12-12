<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const menus = [
  {
    name: '实验室管理',
    path: '/admin/lab'
  },
  {
    name: '用户管理',
    path: '/admin/user'
  },
  {
    name: '通告管理',
    path: '/admin/notice'
  },
  {
    name: '重置密码',
    path: '/admin/reset'
  }
]
const route = useRoute()
const activeIndexR = ref('')
watch(route, () => {
  const p = menus.find(mn => route.path.includes(mn.path))
  activeIndexR.value = p?.path ?? ''
})
</script>
<template>
  <el-menu 
    :default-active="activeIndexR"
    mode="horizontal"
    :ellipsis="false"
    class="el-menu-demo my-menu"
    router>
    <el-menu-item>
      <img style="width: 100px" src="#" alt="logo" />
    </el-menu-item>
    <template v-for="(menu, index) in menus" :key="index">
      <el-menu-item :index="menu.path">{{ menu.name }}</el-menu-item>
    </template>
  </el-menu>
</template>
<style scoped>
.my-menu{
  border-bottom:none
}
</style>

<script setup lang="ts">
import * as consty from '@/datasource/const'
import router from '@/router'
import { CommonService } from '@/services'
import { InfoFilled ,User,Tools} from '@element-plus/icons-vue'
import { defineAsyncComponent, type Component } from 'vue'
const role = CommonService.getRole()

let realComponent: Component
if (role == consty.ADMIN) {
  realComponent = defineAsyncComponent(() => import('@/views/header/admin/IndexView.vue'))
} else if (role == consty.TEACHER) {
  realComponent = defineAsyncComponent(() => import('@/views/header/teacher/IndexView.vue'))
}

const logoutF = () => {
  sessionStorage.clear()
  router.push('/login')
}
</script>
<template>
  <el-row class="my-row" style="padding: 3px" align="middle">
    <el-col :span="2" class="my-col"></el-col>
    <!-- 基于权限加载上功能栏 -->
    <el-col :span="14">
      <component :is="realComponent" />
    </el-col>
    <el-col :span="4"></el-col>
    <el-col :span="1" id="logout" color="blue" class="flex flex-wrap items-center mb-4">
      <el-popconfirm width="220" :icon="InfoFilled" icon-color="#626AEF" title="确定退出登录吗?">
        <template #reference>
          <el-button link class="my-button logout">
            <el-icon><User /></el-icon>
          </el-button>
        </template>
        <template #actions="{ cancel }">
          <el-button size="small" @click="cancel">No!</el-button>
          <el-button type="danger" size="small" @click="logoutF()">Yes?</el-button>
        </template>
      </el-popconfirm>
    </el-col>
    <el-col :span="1" class="flex flex-wrap items-center mb-4">
      <el-button link class="my-button setting" @click="$router.push('/settings')">
        <el-icon><Tools /></el-icon>
      </el-button>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>
<style scoped>
#logout :hover {
  cursor: pointer;
}
.my-button {
  font-size: 1.5rem;
}
.logout {
  color: #ff2020;
}
.my-row {  
  border-bottom: 1px solid var(--el-menu-border-color);
}
.setting {
  color: #3a92fe;
}
</style>
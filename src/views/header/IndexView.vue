<script setup lang="ts">
import * as consty from '@/datasource/const'
import router from '@/router'
import { CommonService } from '@/services'
import { InfoFilled ,User,Tools} from '@element-plus/icons-vue'
import { defineAsyncComponent, watch ,ref, type Component } from 'vue'
import { useRoute } from 'vue-router'
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
const route = useRoute()
watch(route, () => {
  })
const newF = () =>{
  router.push('/user/news')
}
const selfF = () =>{
  router.push('/user/self')

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
    <el-col :span="1" id="user" color="blue" class="flex flex-wrap items-center mb-4">
          <el-button link class="my-button user">
            <el-icon><User /></el-icon>
          </el-button>  
          <div id="info">
            <el-button class="info" @click="selfF">个人中心</el-button>
            <el-button class="info" @click="newF">消息中心</el-button>
            <el-button class="info" @click="logoutF">退出登录</el-button>
          </div>     
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
.test{
  width: 200px;
  height: 200px;
  display: none;
}
#user{
position: relative;
}
#info{
  display: none;
  position:absolute;
  z-index: 10;
  width: 100px;
  height: auto;
  background-color: #f7f5f5;
  border-radius: 4px;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
  padding-top: 10px;
}
#user:hover{
  cursor: pointer;
  #info{
    display: block;
    position: fixed;
    right: 200px;
    
  }
}
.info{
  margin: 8px 5px 8px 5px;
}
.my-button {
  display: block;
  font-size: 1.5rem;
  width:150px;
}
.user {
  color: #ff2020;
}
.my-row {  
  border-bottom: 1px solid var(--el-menu-border-color);
}
.setting {
  color: #3a92fe;
}
</style>
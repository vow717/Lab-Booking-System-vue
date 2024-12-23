<script setup lang="ts">
import {
  Apple,
  Check,
  ColdDrink,
  Food,
  Fries,
  Orange,
  Pear,
  Refresh,
  Sugar,
  SwitchButton,
  UserFilled,
  Watermelon
} from '@element-plus/icons-vue'

import type { User } from '@/datasource/type'
import { CommonService } from '@/services/index'
import { ref } from 'vue'

const userForm = ref({
  account: '',
  password: ''
})

const resetUser = () => {
  userForm.value.account = ''
  userForm.value.password = ''
}

const loginF = async () => {
  const user: User = {
    account: userForm.value.account,
    password: userForm.value.password
  }
  resetUser()
  await CommonService.loginGuardService(user)
}
</script>
<template>
  <div>
    <div class="d1">
      <div class="d2">
        <el-divider>
          <el-icon><Watermelon /></el-icon>
          <el-icon><Fries /></el-icon>
          <el-icon><Pear /></el-icon>
          <el-icon><Apple /></el-icon>
          <el-icon><Sugar /></el-icon>
          <el-icon><Food /></el-icon>
          <el-icon><ColdDrink /></el-icon>
          <el-icon><Orange /></el-icon>
          <el-icon><IceTea /></el-icon>
        </el-divider>
        老师账号密码:teacher，管理员账号密码:2046000000
        <el-form>
          <el-form-item>
            <el-input
              v-model="userForm.account"
              :prefix-icon="UserFilled"
              size="large"
              placeholder="请输入您的账号"
              :rules="[{ required: true, message: '账号不能为空', trigger: 'blur' }]" />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="userForm.password"
              type="password"
              size="large"
              :prefix-icon="SwitchButton"
              placeholder="请输入您的密码"
              :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]" />
          </el-form-item>

          <el-form-item>
            <div style="position: relative; left: 300px">
              <el-button
                type="primary"
                :icon="Check"
                @click="loginF"
                :disabled="!userForm.account || !userForm.password">
                登入
              </el-button>
              <el-button @click="resetUser()" :icon="Refresh">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style>
.d1 {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: #93b7dd;
}
.d2 {
  position: relative;
  height: 220px;
  width: 480px;
  border-radius: 15px;

  background-color: white;
  padding: 10px;
}
</style>

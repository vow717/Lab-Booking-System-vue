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

import dentify from '@/components/dentify.vue'
import type { User } from '@/datasource/type'
import { CommonService } from '@/services/index'
import { onMounted, ref } from 'vue'
const userForm = ref({
  account: '',
  password: ''
})

const resetUser = () => {
  userForm.value.account = ''
  userForm.value.password = ''
}

const loginF = async () => {
  if (formLogin.value.code !== identifyCode.value) {
    initCode()
    throw new Error('验证码错误')
  }
  const user: User = {
    account: userForm.value.account,
    password: userForm.value.password
  }
  resetUser()
  initCode()
  await CommonService.loginGuardService(user)
}
const identifyCodes = ref('1234567890abcdefjhijklinopqrsduvwxyz')
const identifyCode = ref('')
const formLogin = ref({
  code: ''
})
// 初始化验证码
const initCode = () => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
}
// 获取验证码的值
const makeCode = (o: string, l: number) => {
  for (let i = 0; i < l; i++) {
    // 通过循环获取字符串内随机几位
    identifyCode.value += o[randomNum(0, o.length)]
  }
}
// 随机数字：用于当角标拿字符串的值
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}
const refreshCode = () => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
}
onMounted(() => {
  initCode()
})
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
        吴可凡:2022，陈秋樾:2023，管理员账号密码:2046
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
            <el-row :gutter="10">
              <el-col :span="12">
                <el-input placeholder="请输入验证码" v-model="formLogin.code"></el-input>
              </el-col>

              <!--验证码右边到底部-->
              <el-col :span="8">
                <div class="login-code" width="100%" @click="refreshCode">
                  <!--验证码组件-->
                  <dentify :identifyCode="identifyCode"></dentify>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <div style="position: relative; left: 300px">
              <el-button
                type="primary"
                :icon="Check"
                @click="loginF"
                :disabled="!userForm.account || !userForm.password || !formLogin.code">
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
  height: 280px;
  width: 480px;
  border-radius: 15px;

  background-color: white;
  padding: 10px;
}
</style>

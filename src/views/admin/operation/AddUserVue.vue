<script setup lang="ts">
import { createMessageDialog } from '@/components/message/indexC'
import { locationItems, rolesItems, ADMIN, TEACHER } from '@/datasource/const'
import { AdminService } from '@/services/AdminService'
import type { User } from '@/datasource/type'
import { Check, Minus, Plus, CloseBold } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import { createNoticeBoard } from '@/components/Notice'

const userR = ref<User>({});
const dialogVisible = ref(false);
const selectedValue = ref('');
const phoneR = ref('');
const messageR = ref('姓名、账号、角色不可为空');
const message2R = ref('');
// 创建手机号输入框的引用
const phoneInputRef = ref<HTMLInputElement | null>(null);
watch(phoneR, (newValue, oldValue) => {
    const validValue = newValue.trim();
    if(!validValue) return
    else{
        const numValue = Number(validValue);
        if (!isNaN(numValue)) {
            // 判断转换为字符串后的长度是否为 11 位
            if (String(numValue).length === 11) {
                message2R.value = '';  // 位数正确，清空错误提示
                userR.value.phone = phoneR.value;
            } else {
                message2R.value = '手机号必须为 11 位';
            }
        } else {
            message2R.value = '请输入有效的数字作为电话号码';
        }
      }
    });


watch(selectedValue, () => {
    userR.value.role = selectedValue.value;
});


const addLabF = async () => {
    const nameValue = userR.value.name?.trim();
    const accountValue = userR.value.account?.trim();
    if (nameValue === '' || accountValue === '') {
        createMessageDialog('姓名、账号不能为空');
        return;
    }

    if (phoneR.value.length!== 11 && phoneR.value.length!== 0) {
        message2R.value = '手机号必须为 11 位';
        // 聚焦到手机号输入框
        if (phoneInputRef.value) {
            phoneInputRef.value.focus();
        }
        return;
    }
    try {
        userR.value.name = nameValue;
        userR.value.account = accountValue;
        if(phoneR.value){
          userR.value.phone = phoneR.value;
        }
        userR.value.role = selectedValue.value == "admin"? ADMIN : TEACHER;
        await AdminService.addUserService(userR.value);
        createNoticeBoard('用户添加成功', '');
        dialogVisible.value = false;
        userR.value = {};
    } catch (error) {
        createMessageDialog('用户添加失败，请稍后再试');
    }
};
</script>


<template>
  <el-button class="addUser" type="primary" @click="dialogVisible = true">
    <el-icon><Plus /></el-icon>
  </el-button>
  <el-dialog v-model="dialogVisible" title="Message" width="800">
    <div>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="6">
          <el-input class="myInput" v-model="userR.name" placeholder="姓名"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input class="myInput" v-model="userR.account" placeholder="账号"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select 
            v-model="selectedValue"
            size="defult"
            style="width: 240px">
            <el-option
              v-for="(li, index) in rolesItems"
              :key="index"
              :label="li"
              :value="li"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="10">
          <el-input v-model="phoneR" placeholder="手机号：" ref="phoneInputRef"></el-input>
        </el-col>
        <el-text style="color: red;">
         {{ message2R }}
        </el-text>
      </el-row>
   </div>
   <el-tooltip v-if="!(userR.name && userR.account && selectedValue)" :content="messageR" placement="bottom" effect="light">
      <el-button type="disabled" :icon="CloseBold" :disabled="!(userR.name && userR.account && selectedValue)"></el-button>
    </el-tooltip>
    <el-tooltip v-else content="提交" placement="bottom" effect="light">
      <el-button
          type="success"
          :icon="Check"
          @click="addLabF"
          :disabled="!(userR.name && userR.account && selectedValue)"
      ></el-button>
    </el-tooltip>
  <el-text>{{ userR }}</el-text>
  </el-dialog>
</template>


<style scoped>
.addUser{
  margin-bottom: 20px;
}
</style>
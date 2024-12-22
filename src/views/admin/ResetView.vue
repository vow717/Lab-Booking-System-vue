<script setup lang="ts">
import { AdminService } from '@/services/AdminService';
import type{ User } from '@/datasource/type';
import { ref, watch } from 'vue';
import { Check } from '@element-plus/icons-vue';
import { createNoticeBoard } from '@/components/Notice';

const inAccount = ref("")
const teacherR = ref<User>()
const viewInfoR = ref(false)
const message1 = ref("重置此账号的密码")
const message2 = ref('无此账号用户')
const allTeachers = await AdminService.listTeachersService()
console.log(allTeachers);

watch(inAccount,()=>{
    teacherR.value = allTeachers.value.find((t) =>t.account === inAccount.value)
    if(teacherR.value){
        viewInfoR.value = true
    }
    })
const resetF = async() =>{
await AdminService.resetService(inAccount.value)
createNoticeBoard('重置密码成功', '')
inAccount.value = ''
}

</script>
<template>
<div>
<el-row>
    <el-col :span="8"></el-col>
    <el-col  :span="8">
        <el-input placeholder="请输入要重置密码的账号：" class="my-input" v-model="inAccount"/>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="1">
        <el-tooltip
        class="box-item"
        effect="dark"
        :content="message1"
        placement="right-start"
      >
      <el-button type="success" :icon="Check" circle :disabled="!teacherR?.name"
      @click="resetF"/>
    </el-tooltip>

</el-col>
<el-col :span="6"></el-col>
</el-row>
<el-row>
    <el-col :span="8"></el-col>
    <el-text v-if="!teacherR">{{ message2 }}</el-text>
    <el-col v-if="viewInfoR" :span="8">
        <br>
           姓名：  {{ teacherR?.name }} <br>
           电话： {{ teacherR?.phone }}
    </el-col>
    <el-col :span="8"></el-col>
</el-row>



</div>
</template>
<style scoped>


</style>
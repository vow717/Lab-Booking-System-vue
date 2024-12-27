<script setup lang="ts">
import { ref, watch } from 'vue';
import type{ User } from '@/datasource/type';
import { ADMIN} from '@/datasource/const';
import { useUserStore } from '@/stores/UserStore';
import { AdminService } from '@/services/AdminService';
import { createNoticeBoard } from '@/components/Notice';
import { Check ,Close} from '@element-plus/icons-vue';


const userR = ref<User>()
const editR = ref(false)
const comm = ref(true)
const editUserR = ref<User>({})
userR.value = useUserStore().userS.value
editUserR.value = {...userR.value }
console.log(editUserR.value);
if(userR.value?.role){
userR.value.role = (userR.value as User).role === ADMIN ? "admin" :"teacher"
}


watch(editUserR.value,()=>{
    if(editUserR.value.phone?.length !== 11) {
        comm.value = false
    }else{comm.value = true}
})
const commitF = async() =>{    
    if(editUserR.value.name?.trim() === userR.value?.name!.trim() && 
    editUserR.value.account?.trim() === userR.value?.account!.trim()){
        alert("未修改信息")
        return
    }else{
        userR.value = {...editUserR.value }
        console.log(userR.value);
        
       await AdminService.editUserService(userR.value as User);
        createNoticeBoard('用户信息修改成功', '');
        editUserR.value = {};
    }
}

</script>
<template>
<div>
<el-row :gutter="10" style="margin-bottom: 10px" class="my-row" v-if="!editR">
<el-col class="my-col">用户名：{{ userR?.name }}</el-col>
<el-col  class="my-col">账号：{{ userR?.account }}</el-col>
<el-col  class="my-col">电话号：{{ userR?.phone }}</el-col>
<el-col  class="my-col">角色：{{ userR?.role}}</el-col>
<el-col><el-button @click="editR = true  ">修改信息</el-button></el-col>
</el-row>
<el-row :gutter="10" style="margin-bottom: 10px" class="my-row" v-if="editR">
<el-col :span="6" class="my-col w-150px mb-2" ><el-input v-model.trim="editUserR.name"   placeholder="用户名："></el-input ></el-col><el-col :span="18"></el-col>
<el-col :span="6" class="my-col w-150px mb-2" ><el-input v-model.trim="editUserR.account"   placeholder="账号："></el-input></el-col> <el-col :span="18"></el-col>
<el-col :span="6" class="my-col w-150px mb-2"><el-input  v-model.trim="editUserR.phone"   placeholder="手机号："></el-input></el-col>
 <el-col :span="16"class="my-col2">
    <el-icon v-if="comm" class="my-icon"  color="green"><Check /></el-icon>
    <el-icon v-else class="my-icon"  color="red"><close /></el-icon></el-col>
<el-col :span="18"></el-col>
<el-col><el-button :disabled="!(editUserR.name && editUserR.account && editUserR.phone && comm)" @click="commitF">提交信息</el-button></el-col>
{{ editUserR }}
</el-row>   
</div>
</template>
<style scoped>
.my-row{
    margin-left: 10px;
}
.my-col{
margin: 10px;
}
.my-col2{
    display: flex;
    align-items: center; /* 垂直居中 */

}
.my-icon{
    display: block;
}
</style>
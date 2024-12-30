<script setup lang="ts">
import type {Notice} from '@/datasource/type'
import {listNotices} from '@/datasource/datasourse'
import { ref,watch } from 'vue';
import type { ComponentSize } from 'element-plus'


const noticesR = ref<Notice[]>([])
const allNoticesIdR = ref<String[]>([])
noticesR.value = listNotices()


// //对通知排序 有待改善 数量多排序效率低
// noticesR.value.sort((a: Notice, b: Notice) => {
//   if (a.updateTime && b.updateTime) {
//     return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
//   }
//   return 0;
// });

noticesR.value.forEach((n)=>{
  allNoticesIdR.value.push(n.id as string)
})


//分页
const currentPage = ref(1)
const pageSize = ref(2)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
<template>
<div>
    <el-row>
        <el-col>
            <el-scrollbar>
        <el-table :data="noticesR">
            <el-table-column prop="updateTime" label="Date" width="150" >
                <template #default="scope">
                    {{ scope.row.updateTime?.substring(0, 10) }}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="title" width="280" />
            <el-table-column prop="content" label="content"  />
        </el-table>
    </el-scrollbar>
        </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="pagination-block">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper"
      :total="allNoticesIdR.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
      </el-col>
    </el-row>

</div>
</template>
<style scoped>
.pagination-block{
  margin: 10px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

</style>

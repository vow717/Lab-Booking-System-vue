<script setup lang="ts">
import type { Notice } from '@/datasource/type'
import router from '@/router'
import { CommonService } from '@/services'
import type { ComponentSize } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const noticesR = ref<{ count: number; notices: Notice[] }>({ count: 0, notices: [] })
const curPageNoticesIdR = ref<String[]>([])

//分页
const route = useRoute()
const pageNum = 8
const size = ref<ComponentSize>('small')
const background = ref(false)
const disabled = ref(false)
const paramPageR = ref<string>(route.params.page as string)
const currentPageR = ref(parseInt(paramPageR.value, 10))
currentPageR.value = computed(() => parseInt(paramPageR.value, 10)).value
//
const listNoticeF = async () => {
  await CommonService.listNoticeService(currentPageR.value).then(notices => {
    if (notices) {
      noticesR.value.notices = notices.value.notices
      noticesR.value.count = notices.value.count
    }
    getCurPageNoticesIdF()
  })
}
//
const getCurPageNoticesIdF = () => {
  noticesR.value.notices.forEach(n => {
    curPageNoticesIdR.value.push(n.id as string)
  })
}
listNoticeF()

//分页
watch(currentPageR, async newval => {
  await CommonService.listNoticeService(currentPageR.value).then(res => {
    noticesR.value = res.value
  })
  getCurPageNoticesIdF()
})

const handleCurrentChange = async (val: number) => {
  currentPageR.value = val
  router.push(`/teacher/notice/page/${currentPageR.value}`)
}
</script>
<template>
  <div>
    <el-row>
      <el-col>
        <el-scrollbar>
          <el-table :data="noticesR.notices">
            <el-table-column prop="updateTime" label="Date" width="300" style="margin: 2px">
              <template #default="scope">
                {{ scope.row.updateTime?.substring(0, 10) }}
              </template>
            </el-table-column>
            <el-table-column prop="title" label="title" width="300" />
            <el-table-column prop="content" label="content" width="730" />
          </el-table>
        </el-scrollbar>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="pagination-block">
          <el-pagination
            v-model:current-page="currentPageR"
            v-model:page-size="pageNum"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next, jumper"
            :total="noticesR.count"
            @current-change="handleCurrentChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.pagination-block {
  margin: 5px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.my-row {
  height: 2rem;
  display: flex;
}

.el-table {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
  font-size: 14px;
  width: 90%; /* 根据实际情况调整表格宽度，这里设置为页面宽度的90% */
  margin: 20px auto; /* 上下外边距20px，左右自动居中 */
}

.el-table th {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: bold;
  text-align: left;
  padding: 12px 8px; /* 表头单元格内边距 */
}

.el-table td {
  padding: 10px 8px; /* 表体单元格内边距 */
  border-bottom: 1px solid #ebeef5;
}

.el-table-column {
  white-space: normal; /* 允许单元格内容自动换行 */
}

.el-table-column.label {
  font-weight: bold;
}

.el-table--enable-row-hover.el-table__body tr:hover > td {
  background-color: #f5f7fa;
}
</style>

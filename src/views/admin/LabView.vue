<script setup lang="ts">
import { locationItems } from '@/datasource/const'
import type { Lab, LabName } from '@/datasource/type'
import { AdminService } from '@/services/AdminService'
import EditLabVue from '@/views/admin/OperationLabView.vue'
import { ref, watch } from 'vue'
import AddLabVue from './operation/AddLabVue.vue'
const allLabs = await AdminService.listLabsService()
const activeName = ref('0')
console.log(allLabs.value)

const locationName = ref<LabName>({
  DanQing: [],
  ChengDong: [],
  Zhu: [],
  LinKe: [],
  JiaJu: [],
  JiaoTong: []
})
//
const collectLS = (lS: Lab[]) => {
  lS.forEach(lab => {
    console.log(lab.name?.slice(0, 2))
    if (lab.name?.slice(0, 2) == '丹青') {
      locationName.value.DanQing?.push(lab)
    } else if (lab.name?.slice(0, 2) === '成栋') {
      locationName.value.ChengDong?.push(lab)
    } else if (lab.name?.slice(0, 2) === '主楼') {
      locationName.value.Zhu?.push(lab)
    } else if (lab.name?.slice(0, 2) === '林科') {
      locationName.value.LinKe?.push(lab)
    } else if (lab.name?.slice(0, 2) === '家具') {
      locationName.value.JiaJu?.push(lab)
    } else if (lab.name?.slice(0, 2) === '交通') {
      locationName.value.JiaoTong?.push(lab)
    }
  })

  // 对每个分类下的实验室进行排序，假设按name排序
  for (const key in locationName.value) {
    locationName.value[key as keyof LabName].sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
  }
}
collectLS(allLabs.value)

const locationMap: { [key: string]: Lab[] } = {
  DanQing: locationName.value.DanQing || [],
  ChengDong: locationName.value.ChengDong || [],
  Zhu: locationName.value.Zhu || [],
  LinKe: locationName.value.LinKe || [],
  JiaJu: locationName.value.JiaJu || [],
  JiaoTong: locationName.value.JiaoTong || []
}

const currentLocationF = (v: string) => locationMap[v]

watch(allLabs, () => {
  collectLS(allLabs.value)
})
</script>
<template>
  <div>
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col><AddLabVue /></el-col>
      <br />
      <el-col>
        <div class="demo-collapse">
          <el-collapse v-model="activeName" accordion>
            <template v-for="(l, index) of locationItems" :key="l.v" name="index">
              <el-collapse-item :title="l.name">
                <el-table :data="currentLocationF(l.v)">
                  <el-table-column type="index" label="#" />
                  <el-table-column label="实验室号" width="150">
                    <template #default="scope">
                      <el-text>
                        {{ scope.row.name }}
                      </el-text>
                    </template>
                  </el-table-column>
                  <el-table-column label="配置" width="400">
                    <template #default="scope">
                      {{ scope.row.config }}
                    </template>
                  </el-table-column>
                  <el-table-column label="状态" width="150">
                    <template #default="scope">
                      {{ scope.row.status }}
                    </template>
                  </el-table-column>
                  <el-table-column label="容纳人数" width="150">
                    <template #default="scope">
                      {{ scope.row.capacity }}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template #default="scope">
                      <EditLabVue :labs="scope.row" />
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </template>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { locationItems } from '@/datasource/const'
import type { Lab, LabName } from '@/datasource/type'
import { AdminService } from '@/services/AdminService'
import EditLabVue from '@/views/admin/OperationLabView.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import AddLabVue from './operation/AddLabVue.vue'

// 使用 ref 来存储 allLabs，使其具有响应性
const allLabs = ref<Lab[]>([])
const activeName = ref('0')

const locationName = ref<LabName>({
  DanQing: [],
  ChengDong: [],
  Zhu: [],
  LinKe: [],
  JiaJu: [],
  JiaoTong: []
})

// 收集实验室并分类存储
const collectLS = (lS: Lab[]) => {
  lS.forEach(lab => {
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

  // 对每个分类下的实验室进行排序，假设按 name 排序
  for (const key in locationName.value) {
    locationName.value[key as keyof LabName].sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
  }
}

// 将 locationMap 变成响应式对象
const locationMap = reactive({
  DanQing: locationName.value.DanQing || [],
  ChengDong: locationName.value.ChengDong || [],
  Zhu: locationName.value.Zhu || [],
  LinKe: locationName.value.LinKe || [],
  JiaJu: locationName.value.JiaJu || [],
  JiaoTong: locationName.value.JiaoTong || []
})

const currentLocationF = (v: string) => locationMap[v]

watch(allLabs, newval => {
  // 清空 locationName 中的数据
  locationName.value.DanQing = []
  locationName.value.ChengDong = []
  locationName.value.Zhu = []
  locationName.value.LinKe = []
  locationName.value.JiaJu = []
  locationName.value.JiaoTong = []
  // 重新调用 collectLS 对新数据进行分类和排序
  collectLS(newval)
  // 更新 locationMap 的属性
  locationMap.DanQing = locationName.value.DanQing
  locationMap.ChengDong = locationName.value.ChengDong
  locationMap.Zhu = locationName.value.Zhu
  locationMap.LinKe = locationName.value.LinKe
  locationMap.JiaJu = locationName.value.JiaJu
  locationMap.JiaoTong = locationName.value.JiaoTong
  console.log(locationMap)
})

// 在 onMounted 钩子中调用 listLabsService
onMounted(async () => {
  const res = await AdminService.listLabsService()
  allLabs.value = res.value
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

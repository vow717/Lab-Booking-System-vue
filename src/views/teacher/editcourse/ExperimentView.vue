<script setup lang="ts">
import type { DEF2Course } from '@/datasource/type'
import { ref } from 'vue'

//模拟课程数据:
const coursesData = [
  {
    id: '1',
    name: 'web实验',
    type: 'DEF2',
    require_config: 'Windows 11',
    require_number: 100,
    total: 12
  },
  {
    id: '2',
    name: 'java实验',
    type: 'DEF2',
    require_config: 'Windows 10',
    require_number: 80,
    total: 8
  },
  {
    id: '3',
    name: 'c++实验',
    type: 'DEF2',
    require_config: 'Windows 8',
    require_number: 120,
    total: 10
  },
  {
    id: '4',
    name: 'python实验',
    type: 'DEF2',
    require_config: 'Windows 7',
    require_number: 60,
    total: 6
  },
  {
    id: '5',
    name: 'php实验',
    type: 'DEF2',
    require_config: 'Windows XP',
    require_number: 40,
    total: 4
  },
  {
    id: '6',
    name: 'go实验',
    type: 'DEF2',
    require_config: 'Windows 2000',
    require_number: 20,
    total: 2
  },
  {
    id: '7',
    name: 'ruby实验',
    type: 'DEF2',
    require_config: 'Windows 98',
    require_number: 10,
    total: 1
  }
]
const allCourses = ref<DEF2Course[]>([])
allCourses.value = coursesData //后面是await请求
</script>
<template>
  <div></div>
</template>

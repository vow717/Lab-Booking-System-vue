import type { Lab, Reservation } from '@/datasource/type'
const labs: Lab[] = [
  {
    id: '1',
    name: '901',
    location: '丹青楼',
    capacity: 60,
    config: 'Window11;CPU:酷睿 i9 系列;内存:32GB;独立显卡:NVIDIA ',
    createTime: '2046-05-10T12:00'
  },
  {
    id: '2',
    name: '902',
    location: '丹青楼',
    capacity: 90,
    config: 'Window7;CPU:酷睿 i7 系列;内存:32GB;独立显卡:NVIDIA ',
    createTime: '2046-04-10T09:00'
  },
  {
    id: '3',
    name: '903',
    location: '丹青楼',
    capacity: 60,
    config: 'Window11;CPU:酷睿 i5 系列;内存:32GB;独立显卡:NVIDIA ',
    createTime: '2046-06-10T21:30'
  },
  {
    id: '4',
    name: '904',
    location: '丹青楼',
    capacity: 90,
    config: 'Window11;CPU:酷睿 i9 系列;内存:32GB;独立显卡:NVIDIA ',
    createTime: '2046-06-13T18:43'
  },
  { id: '5', name: '1001', location: '成栋楼', capacity: 60, createTime: '2046-05-10T12:00' },
  { id: '6', name: '1002', location: '成栋楼', capacity: 60, createTime: '2046-05-10T12:00' },
  { id: '7', name: '201', location: '主楼', capacity: 60, createTime: '2046-05-10T12:00' }
]

const myReservations: Reservation[] = [
  {
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 1
  },
  {
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 2
  },
  {
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 3
  },
  {
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 4
  },
  {
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 5
  },
  {
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 6
  },
  {
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 12
  },
  {
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 13
  },
  {
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 14
  },
  {
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 15
  },
  {
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 1
  },
  {
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 2
  },
  {
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 3
  },
  {
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 4
  },
  {
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 5
  },
  {
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 6
  },
  {
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 7
  },
  {
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 8
  },
  {
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 9
  },
  {
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 10
  },
  {
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 1
  },
  {
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 2
  },
  {
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 3
  },
  {
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 4
  },
  {
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 5
  },
  {
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 6
  },
  {
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 7
  },
  {
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 8
  },
  {
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 9
  },
  {
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 10
  },
  {
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 11
  },
  {
    laboratoryName: '丹青912',
    courseName: 'gosssss',
    period: 2,
    day: 2,
    week: 12
  },
  {
    laboratoryName: '丹青912',
    courseName: 'gosssss',
    period: 2,
    day: 2,
    week: 13
  },
  {
    laboratoryName: '丹青912',
    courseName: 'gosssss',
    period: 2,
    day: 2,
    week: 14
  },
  {
    laboratoryName: '丹青912',
    courseName: 'gosssss',
    period: 2,
    day: 2,
    week: 15
  },
  {
    laboratoryName: '丹青912',
    courseName: 'gosssss',
    period: 2,
    day: 2,
    week: 16
  }
]

export function listReservations() {
  return myReservations
}

export function listLabs() {
  return labs
}
export function listManagers() {
  return managers
}

import type { DEF2Course, Lab, Reservation ,User,notice} from '@/datasource/type'
const labs: Lab[] = [
  { id: "1", name: '丹青901',capacity:60,config:'Window11;CPU:酷睿 i9 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-05-10T12:00' },
  { id: "2", name: '丹青902',capacity:90,config:'Window7;CPU:酷睿 i7 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-04-10T09:00' },
  { id: "3", name: '丹青903',capacity:60,config:'Window11;CPU:酷睿 i5 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-06-10T21:30' },
  { id: "4", name: '丹青904',capacity:90,config:'Window11;CPU:酷睿 i9 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-06-13T18:43' },
  { id: "5", name: '成栋1001',capacity:60,createTime: '2046-05-10T12:00' },
  { id: "6", name: '成栋1002',capacity:60,createTime: '2046-05-10T12:00' },
  { id: "7", name: '主楼201',capacity:60,createTime: '2046-05-10T12:00' },
  ]
const myReservations: Reservation[] = [
  {
    id: '1',
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 1
  },
  {
    id: '2',
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 2
  },
  {
    id: '3',
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 3
  },
  {
    id: '4',
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 4
  },
  {
    id: '5',
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 5
  },
  {
    id: '6',
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 6
  },
  {
    id: '7',
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 12
  },
  {
    id: '8',
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 13
  },
  {
    id: '9',
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 14
  },
  {
    id: '10',
    laboratoryName: '丹青909',
    courseName: 'websssss',
    period: 1,
    day: 1,
    week: 15
  },
  {
    id: '11',
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 1
  },
  {
    id: '12',
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 2
  },
  {
    id: '13',
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 3
  },
  {
    id: '14',
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 4
  },
  {
    id: '15',
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 5
  },
  {
    id: '16',
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 6
  },
  {
    id: '17',
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 7
  },
  {
    id: '18',
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 8
  },
  {
    id: '19',
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 9
  },
  {
    id: '20',
    laboratoryName: '丹青919',
    courseName: 'javasssss',
    period: 3,
    day: 4,
    week: 10
  },
  {
    id: '21',
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 1
  },
  {
    id: '22',
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 2
  },
  {
    id: '23',
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 3
  },
  {
    id: '24',
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 4
  },
  {
    id: '25',
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 5
  },
  {
    id: '26',
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 6
  },
  {
    id: '27',
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 7
  },
  {
    id: '28',
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 8
  },
  {
    id: '29',
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 9
  },
  {
    id: '30',
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 10
  },
  {
    id: '31',
    laboratoryName: '丹青912',
    courseName: 'c++sssss',
    period: 2,
    day: 2,
    week: 11
  },
  {
    id: '32',
    laboratoryName: '丹青912',
    courseName: 'gosssss',
    period: 2,
    day: 2,
    week: 12
  },
  {
    id: '33',
    laboratoryName: '丹青912',
    courseName: 'gosssss',
    period: 2,
    day: 2,
    week: 13
  },
  {
    id: '34',
    laboratoryName: '丹青912',
    courseName: 'gosssss',
    period: 2,
    day: 2,
    week: 14
  },
  {
    id: '35',
    laboratoryName: '丹青912',
    courseName: 'gosssss',
    period: 2,
    day: 2,
    week: 15
  },
  {
    id: '36',
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
//   { id: "1", name: '901', location:'丹青楼',capacity:60,config:'Window11;CPU:酷睿 i9 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-05-10T12:00' },
//   { id: "2", name: '902', location:'丹青楼',capacity:90,config:'Window7;CPU:酷睿 i7 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-04-10T09:00' },
//   { id: "3", name: '903', location:'丹青楼',capacity:60,config:'Window11;CPU:酷睿 i5 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-06-10T21:30' },
//   { id: "4", name: '904', location:'丹青楼',capacity:90,config:'Window11;CPU:酷睿 i9 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-06-13T18:43' },
//   { id: "5", name: '1001', location:'成栋楼',capacity:60,createTime: '2046-05-10T12:00' },
//   { id: "6", name: '1002', location:'成栋楼',capacity:60,createTime: '2046-05-10T12:00' },
//   { id: "7", name: '201', location:'主楼',capacity:60,createTime: '2046-05-10T12:00' },
// ]

// export const ADMIN = 'R2md'
// export const TEACHER = 'kU4T'
//账号密码暂时不用约定的65位（难以模拟）
const teachers: User[] = [
  {
    id: '1',
    name: 'BO',
    account: '2024202401',
    password: '111111',
    role: 'kU4T',
    phone: '12345678910',
    createTime: '2046-05-10T12:00'
  },
  {
    id: '2',
    name: 'SUN',
    account: '2024202402',
    password: '22222',
    role: 'kU4T',
    phone: '12345678911',
    createTime: '2046-04-10T09:00'
  },
  {
    id: '3',
    name: 'YUE',
    account: '2024202501',
    password: '33333',
    role: 'R2md',
    phone: '12345678912',
    createTime: '2046-06-10T21:30'
  },
  {
    id: '4',
    name: 'CHEN',
    account: '2024202403',
    password: '44444',
    role: 'kU4T',
    phone: '12345678913',
    createTime: '2046-06-13T18:43'
  },
  {
    id: '5',
    name: 'WU',
    account: '2024202404',
    password: '5555',
    role: 'kU4T',
    phone: '12345678914',
    createTime: '2046-05-10T12:00'
  }
]
const courses: DEF2Course[] = [
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
    name: 'C#实验',
    type: 'DEF2',
    require_config: 'Windows XP',
    require_number: 80,
    total: 4
  }
]


const notices :notice [] = [
{
  id:'1',title:'升级丹青楼901系统为win11',content:'学校有钱啦！祝贺丹青901设备远超其他实验室设备等级~',
  publisher:'王波',createTime:'2046-05-10T12:00',updateTime:'2046-05-11T12:00'
},
{
  id:'2',title:'升级丹青楼902系统为win11',content:'学校有钱啦！祝贺丹青902设备远超其他实验室设备等级~',
  publisher:'王波',createTime:'2046-05-10T12:00',updateTime:'2046-05-07T12:00'
},
{
  id:'3',title:'升级成栋1001硬件全面换新',content:'学校有钱啦！祝贺成栋1001设备远超其他实验室设备等级~',
  publisher:'王波',createTime:'2046-05-10T12:00',updateTime:'2046-05-10T12:00'
},
{
  id:'4',title:'主楼201实验室暂停预约通知',content:'放假了不能预约了家人们，回家吧，回家吧孩子，别学了',
  publisher:'王波',createTime:'2046-05-10T12:00',updateTime:'2046-05-01T12:00'
},
]

export function listCourses() {
  return courses
}
export function listLabs() {
  return labs
}
export function listTeachers() {
  return teachers
}
export function listNotices() {
  return notices
}

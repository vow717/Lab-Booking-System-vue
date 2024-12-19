import type { Lab,User } from '@/datasource/type'
const labs: Lab[] = [
  { id: "1", name: '丹青901',capacity:60,config:'Window11;CPU:酷睿 i9 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-05-10T12:00' },
  { id: "2", name: '丹青902',capacity:90,config:'Window7;CPU:酷睿 i7 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-04-10T09:00' },
  { id: "3", name: '丹青903',capacity:60,config:'Window11;CPU:酷睿 i5 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-06-10T21:30' },
  { id: "4", name: '丹青904',capacity:90,config:'Window11;CPU:酷睿 i9 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-06-13T18:43' },
  { id: "5", name: '成栋1001',capacity:60,createTime: '2046-05-10T12:00' },
  { id: "6", name: '成栋1002',capacity:60,createTime: '2046-05-10T12:00' },
  { id: "7", name: '主楼201',capacity:60,createTime: '2046-05-10T12:00' },
]

// export const ADMIN = 'R2md'
// export const TEACHER = 'kU4T'
//账号密码暂时不用约定的65位（难以模拟）
const teachers: User[] = [
  { id: "1", name: 'BO', account:'2024202401',password:"111111",role:"kU4T",phone:"12345678910",createTime: '2046-05-10T12:00' },
  { id: "2", name: 'SUN', account:'2024202402',password:"22222",role:"kU4T",phone:"12345678911",createTime: '2046-04-10T09:00' },
  { id: "3", name: 'YUE', account:'2024202501',password:"33333",role:"R2md",phone:"12345678912",createTime: '2046-06-10T21:30' },
  { id: "4", name: 'CHEN', account:'2024202403',password:"44444",role:"kU4T",phone:"12345678913",createTime: '2046-06-13T18:43' },
  { id: "5", name: 'WU', account:'2024202404',password:"5555",role:"kU4T",phone:"12345678914",createTime: '2046-05-10T12:00' },
]



export function listLabs() {
  return labs
}
export function listTeachers() {
  return teachers
}
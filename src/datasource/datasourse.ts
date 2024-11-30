import type { Lab,User } from '@/datasource/type'
const labs: Lab[] = [
  { id: "1", name: '901', location:'丹青楼',capacity:60,config:'Window11;CPU:酷睿 i9 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-05-10T12:00' },
  { id: "2", name: '902', location:'丹青楼',capacity:90,config:'Window7;CPU:酷睿 i7 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-04-10T09:00' },
  { id: "3", name: '903', location:'丹青楼',capacity:60,config:'Window11;CPU:酷睿 i5 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-06-10T21:30' },
  { id: "4", name: '904', location:'丹青楼',capacity:90,config:'Window11;CPU:酷睿 i9 系列;内存:32GB;独立显卡:NVIDIA ',createTime: '2046-06-13T18:43' },
  { id: "5", name: '1001', location:'成栋楼',capacity:60,createTime: '2046-05-10T12:00' },
  { id: "6", name: '1002', location:'成栋楼',capacity:60,createTime: '2046-05-10T12:00' },
  { id: "7", name: '201', location:'主楼',capacity:60,createTime: '2046-05-10T12:00' },
]





export function listLabs() {
  return labs
}
export function listManagers() {
    return managers
  }
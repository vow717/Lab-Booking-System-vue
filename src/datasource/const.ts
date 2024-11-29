export const ADMIN = 'R2md'
export const TEACHER = 'kU4T'
import type { Lab,User } from '@/datasource/type'

const labs: Lab[] = [
  { id: "1", name: '901', createTime: '2046-05-10T12:00' },
  { id: "2", name: '902', createTime: '2046-04-10T09:00' },
  { id: "3", name: '903', createTime: '2046-06-10T21:30' },
  { id: "4", name: '904', createTime: '2046-06-13T18:43' }
]

const managers :User[] = [
{  id: "1",name: "徐瑞兵",account: 'xrb666',phone: "123456",createTime: '2046-05-10T12:00'},
{  id: "2",name: "何定贤",account: 'hdx666',phone: "234567",createTime: '2046-05-10T12:00'},

]
export function listLabs() {
  return labs
}
export function listManagers() {
    return managers
  }

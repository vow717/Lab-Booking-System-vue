import type { User } from '@/datasource/type'
import * as XLSX from 'xlsx'
import { ref } from 'vue'
import { ADMIN,TEACHER } from '@/datasource/const'

export function readUserForSelectionFile (file:Blob) {
    return new Promise<User[]>((resolve) => {
    const reader = new FileReader()
    const users: User[] = []
    reader.onload = (e:ProgressEvent<FileReader>) =>{
        const data = e.target?.result
        const wb = XLSX.read(data,{type:'binary'})
        const sheet = wb.Sheets[wb.SheetNames[0]]
        XLSX.utils.sheet_to_json(sheet).forEach((r: any) => {
            users.push({ account: r['账号'].toString(),
               name: r['姓名'].toString(),
               role: r['角色'] === "admin"? ADMIN : TEACHER,
               phone:r['电话号'].toString() })
          })   
    }
    reader.onloadend = () => {
        resolve(users)
      }
      reader.readAsArrayBuffer(file)
    })
}

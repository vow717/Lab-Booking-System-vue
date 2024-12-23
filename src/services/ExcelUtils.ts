import type { User } from '@/datasource/type'
import * as XLSX from 'xlsx'
import { ref } from 'vue'
export function readUserForSelectionFile (file:Blob) {
    return new Promise<User[]>((resolve) => {
    const reader = new FileReader()
    const users: User[] = []
    reader.onload = (e:ProgressEvent<FileReader>) =>{
        const data = e.target?.result
        const wb = XLSX.read(data,{type:'binary'})
        console.log(wb.Sheets);
        const sheet = wb.Sheets[wb.SheetNames[0]]
        console.log(sheet);
        XLSX.utils.sheet_to_json(sheet).forEach((r: any) => {
            users.push({ account: r['账号'], name: r['姓名'].toString(),role:r['身份'],phone:r['电话号'] })
          })   
    }
    reader.onloadend = () => {
        resolve(users)
      }
      reader.readAsArrayBuffer(file)
    })
}

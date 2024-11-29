export interface ResultVO<T> {
  code: number
  message?: string
  data?: T
}

export interface User {
  id?: string
  name?: string
  account?: string
  password?: string
  role?: string
  phone?: string // 数据库中允许为空
  createTime?: string
  updateTime?: string
}


export interface Lab {
  id?: string
  name?: string
  Location?:string
  manager?: User //实验室管理人
  config?:string
  capacity?:number //容纳人数
  createTime?: string
  updateTime?: string
}
export interface notice {
  id?: string
  title?: string
  content?:string
  createTime?: string
  updateTime?: string
}
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

//不用预约的理论课
export interface ABC1Course {
  id?: string
  name?: string
  type?: string
  teacherId?: string
  teacherName?: string
  total?: number
  theory?: [
    {
      day: number
      class: string
      week: string
      period: number
    }
  ]
}

//需要预约的实验课
export interface DEF2Course {
  id?: string
  name?: string
  type?: string
  teacherId?: string
  teacherName?: string
  total?: number
  reserved?: number
  require_config?: string
}

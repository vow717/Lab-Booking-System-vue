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
  require_number?: number
}

export interface Lab {
  id?: string
  name?: string
  manager?: User //实验室管理人
  config?: string
  capacity?: number //容纳人数
  createTime?: string
  updateTime?: string
}
export interface notice {
  id?: string
  title?: string
  content?: string
  createTime?: string
  updateTime?: string
}

//预约记录
export interface Reservation {
  id?: string
  laboratoryId?: string
  teacherId?: string
  laboratoryName?: string
  courseName?: string
  courseId?: string
  period?: number
  day?: number
  weeks?: string //,分割的周数，例如1,2,3,4,7,8,9
}

export interface LabNum{
  DanQing?:number,
  ChengDong?:number,
  Zhu?:number,
  LinKe?:number,
  JiaJu?:number,
  JiaoTong?:number
    
  }
  export interface LabName{
    DanQing?:Array<Lab>,
    ChengDong?:Array<Lab>,
    Zhu?:Array<Lab>,
    LinKe?:Array<Lab>,
    JiaJu?:Array<Lab>,
    JiaoTong?:Array<Lab>   
  }

export interface LabNum {
  DanQing?: number
  ChengDong?: number
  Zhu?: number
  LinKe?: number
  JiaJu?: number
  JiaoTong?: number
}
export interface LabName {
  DanQing?: Array<Lab>
  ChengDong?: Array<Lab>
  Zhu?: Array<Lab>
  LinKe?: Array<Lab>
  JiaJu?: Array<Lab>
  JiaoTong?: Array<Lab>
}


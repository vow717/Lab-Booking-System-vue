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

// //不用预约的理论课
// export interface ABC1Course {
//   id?: string
//   name?: string
//   type?: string
//   teacherId?: string
//   teacherName?: string
//   total?: number
//   theory?: [
//     {
//       day: number
//       class: string
//       week: string
//       period: number
//     }
//   ]
// }

//需要预约的实验课
export interface DEF2Course {
  id?: string
  name?: string
  type?: string
  teacherId?: string
  teacherName?: string
  total?: number //总课时
  requireConfig?: string //实验室要求
  requireNumber?: number //人数限制
}

export interface Manager {
  name: string
  phone: string
}
export interface Lab {
  id?: string
  name?: string
  status?: string //实验室状态,如'开放'等
  manager?: Manager //实验室管理人
  config?: string
  capacity?: number //容纳人数
  createTime?: string
  updateTime?: string
  count?: number //实验室的预约次数,用于前端判定火爆程度，只用作前端展示
}
export interface Notice {
  id?: string
  title?: string
  content?: string
  publisher?: string //发布人名字
  createTime?: string
  updateTime?: string
}
//预约记录
export interface Reservation {
  id?: string
  laboratoryId?: string
  teacherId?: string
  laboratoryName?: string
  teacherName?: string
  courseName?: string //如果是临时预约，courseName就是预约的事件
  courseId?: string //courseId=0的时候是临时预约
  period?: number //第几节课
  day?: number //星期几
  week?: number //周数
}
//前后端批量预约的数据结构,对应后端的DTO类
export interface ReservationOrder {
  id?: string
  laboratoryId?: string
  teacherId?: string
  teacherName?: string
  laboratoryName?: string
  courseName?: string
  courseId?: string
  period?: number //第几节课
  day?: number //星期几
  weeks?: number[] //周数
}

//实验室空闲时间的数据结构
export interface LabFree {
  laboratoryId?: string
  laboratoryName?: string
  freePeriods?: string //空闲时间段1,2,3,4这样的字符串
}

export interface LabName {
  DanQing?: Array<Lab>
  ChengDong?: Array<Lab>
  Zhu?: Array<Lab>
  LinKe?: Array<Lab>
  JiaJu?: Array<Lab>
  JiaoTong?: Array<Lab>
}

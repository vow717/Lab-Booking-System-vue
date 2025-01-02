import type { Lab,Notice } from '@/datasource/type'
import { defineAsyncComponent, h, render } from 'vue'
export const createEditProcessDialog = (lab: Lab,updateAllLabs:(labs:Lab[])=> void) => {
  const node = h(
    defineAsyncComponent(() => import('./EditLabVue.vue')),
    { lab,updateAllLabs}
  )
  render(node, document.body)
}
export const createEditNoticeDialog = (notice: Notice,page:number,updateAllNotices: (notices: { count: number, notices: Notice[] }) => void) => {
  const node = h(
    defineAsyncComponent(() => import('./EditNoticeVue.vue')),
    { notice,page,updateAllNotices }
  )
  render(node, document.body)
}

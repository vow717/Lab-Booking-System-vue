import type { Lab,Notice } from '@/datasource/type'
import { defineAsyncComponent, h, render } from 'vue'
export const createEditProcessDialog = (lab: Lab) => {
  const node = h(
    defineAsyncComponent(() => import('./EditLabVue.vue')),
    { lab}
  )
  render(node, document.body)
}
export const createEditNoticeDialog = (notice: Notice,page:number) => {
  const node = h(
    defineAsyncComponent(() => import('./EditNoticeVue.vue')),
    { notice,page }
  )
  render(node, document.body)
}

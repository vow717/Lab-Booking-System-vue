import type { Lab,Notice } from '@/datasource/type'
import { defineAsyncComponent, h, render } from 'vue'
export const createEditProcessDialog = (lab: Lab) => {
  const node = h(
    defineAsyncComponent(() => import('./EditLabVue.vue')),
    { lab }
  )
  render(node, document.body)
}
export const createEditNoticeDialog = (notice: Notice) => {
  const node = h(
    defineAsyncComponent(() => import('./EditNoticeVue.vue')),
    { notice }
  )
  render(node, document.body)
}

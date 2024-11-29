import type { Lab } from '@/datasource/type'
import { defineAsyncComponent, h, render } from 'vue'
export const createEditProcessDialog = (lab: Lab) => {
  const node = h(
    defineAsyncComponent(() => import('./EditLabVue.vue')),
    { lab }
  )
  render(node, document.body)
}

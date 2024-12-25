import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createMessageDialog } from './components/message/indexC'
import router from './router'
//import('@/mock/Index') //这里是引入mockjs的文件，这个文件里面定义了一些模拟数据
// npm install element-plus和miragejs
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
// 全局未捕获异常处理
// 统一弹出错误信息模态框
app.config.errorHandler = err => {
  const message = err as string
  createMessageDialog(message)
}

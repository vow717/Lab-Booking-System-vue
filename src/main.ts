import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import('@/mock/Index') //这里是引入mockjs的文件，这个文件里面定义了一些模拟数据
// npm install 了element-plus和miragejs
const app = createApp(App)
app.use(ElementPlus)
app.use(router)

app.mount('#app')

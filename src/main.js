import { createApp } from 'vue'
import App from './App.vue'
import store from './store' // 导入 store
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(store) // 挂载 store
app.mount('#app')

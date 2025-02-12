import { createApp } from 'vue'
import App from './App.vue'
import store from './store' // 导入 store

const app = createApp(App)
app.use(store) // 挂载 store
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入封装
import getVant from './plugins'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'
const app = createApp(App)
// 使用封装
getVant(app)
app.use(store)
app.use(scroll)
app.use(ElementPlus, { locale })
app.use(router).mount('#app')

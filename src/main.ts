import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'
import './assets/scss/style.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhTW from 'element-plus/es/locale/lang/zh-tw'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.use(ElementPlus, { locale: zhTW })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
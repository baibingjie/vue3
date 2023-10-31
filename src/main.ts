import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import App from './App'
import router from './router'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.warnHandler = () => null

app.use(ElementPlus)
app.use(Antd)
app.use(createPinia())
app.use(router)

app.mount('#app')
app.provide('message', 'hello')

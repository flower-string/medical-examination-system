import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// import('./modes/index.js')

import 'element-plus/theme-chalk/dark/css-vars.css'
// import './styles/element/index.scss'
createApp(App)
.use(router)
.use(createPinia())
.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import direactives from '@renderer/utils/directives'
// import('./modes/index.js')

import 'element-plus/theme-chalk/dark/css-vars.css'
// import './styles/element/index.scss'
createApp(App)
.use(direactives)
.use(router)
.use(createPinia())
.mount('#app')

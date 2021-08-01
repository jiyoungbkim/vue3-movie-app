import { createApp } from 'vue'
import App from './App.vue'
// index.js 생략 가능
// import router from './routes/index.js'
import router from './routes'
import store from './store'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
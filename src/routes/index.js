import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'

export default createRouter({
  // Hash, History
  // hash mode : https://google.com/#/search
  // history mode : need setting
  history: createWebHashHistory(),
  // pages
  routes:[
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ]
})
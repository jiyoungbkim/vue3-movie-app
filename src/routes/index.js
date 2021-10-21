import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'

export default createRouter({
  // Hash, History
  // hash mode : https://google.com/#/search 
  // hash mode : #를  붙여서 페이지  새로고침시  페이지를  찾을  수  없다는  메시지  방지
  // history mode : need setting
  history: createWebHashHistory(),
  // pages
  routes:[
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie',
      component: Movie
    },
    {
      path: '/about',
      component: About
    }
  ]
})
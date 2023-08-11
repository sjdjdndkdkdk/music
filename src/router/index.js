import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if(store.state.isLogin){
        next();
      }else{
        next('/login')
      }
    }
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    component: () => import('../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 底部组件是否显示
router.beforeEach((to,from)=>{
  if(to.path=='/login'){
    store.state.isFooterMusic=false
  }else{
    store.state.isFooterMusic=true
  }
  if(to.path=='/register'){
    store.state.isFooterMusic=false
  }
})
export default router

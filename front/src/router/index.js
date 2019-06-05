import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Login from '@/pages/view/Login'
import Register from '@/pages/view/Register'
import Back from '@/pages/back/Back'
import Backhome from '@/pages/back/Backhome'
import Backinfo from '@/pages/back/Backinfo'
import Articlelist from '@/pages/back/Articlelist'
import Addarticle from '@/pages/back/Addarticle'
import ShowArticle from '@/pages/home/Showarticle'
import Userinfo from '@/pages/home/Userinfo'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/back',
      name: 'Back',
      component: Back,
      children: [
        {path: '', component: Backhome},
        {path: '/backhome', name: 'Backhome', component: Backhome},
        {path: '/backinfo', name: 'Backinfo', component: Backinfo},
        {path: '/articlelist', name: 'Articlelist', component: Articlelist},
        {path: '/addarticle', name: 'Addarticle', component: Addarticle}
      ]
    },
    {
      path: '/showarticle',
      name: 'ShowArticle',
      component: ShowArticle
    },
    {
      path: '/userinfo',
      name: 'Userinfo',
      component: Userinfo
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.Token ? true : false;
  if (to.path == '/' || to.path == '/login' || to.path == '/register' || to.path == '/showarticle') {
    next ();
  } else {
    isLogin ? next () :  next ('/')
  }
})

export default router;

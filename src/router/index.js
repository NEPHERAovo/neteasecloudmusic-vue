import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import $store from '@/store/index.js'
import store from '@/store/index.js';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/playlist',
    name: 'playlist',
    components: {
      default: () => import('../components/playlist/playlist_top.vue'),
      playlist_songs: () => import('../components/playlist/playlist_songs.vue')
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../components/search/main_search.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/user/login.vue')
  },
  {
    path: '/user',
    name: 'user',
    beforeEnter: (to, from, next) => {
      if ($store.state.is_login == 'true') {
        next();
      } else {
        next('/login');
      }
    }
  }
  // {
  //   path: '/playlist',
  //   name: 'playlist',
  //   component: () => import('../components/playlist/playlist_top.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from) => {
  if (to.path == '/login') {
    $store.state.show_footer = false;
  } else {
    $store.state.show_footer = true;
  }
})

export default router

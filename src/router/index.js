import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '../views/Register.vue'),
  },
  {
    path: '/admin',
    name: 'List',
    exact: true,
    component: () => import(/* webpackChunkName: "list" */ '../views/List.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/edit/:slug',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "create" */ '../views/Edit.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router

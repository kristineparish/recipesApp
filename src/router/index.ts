import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Breakfast from '../views/Breakfast.vue'
import Dinner from '../views/Dinner.vue'
import Dessert from '../views/Dessert.vue'
import Create from '../views/Create.vue'
import Edit from '../views/Edit.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/breakfast',
    name: 'breakfast',
    component: Breakfast
  },
  {
    path: '/dinner',
    name: 'dinner',
    component: Dinner
  },
  {
    path: '/dessert',
    name: 'dessert',
    component: Dessert
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: Create,
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

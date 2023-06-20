//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'provinces',
        component: () => import( /* webpackChunkName: "home" */ '../views/provinces/index.vue')
    },
    {
        path: '/provinces',
        name: 'provinces.index',
        component: () => import( /* webpackChunkName: "index" */ '../views/provinces/index.vue')
    },
    {
        path: '/province/create',
        name: 'provinces.create',
        component: () => import( /* webpackChunkName: "create" */ '../views/provinces/create.vue')
    },
    {
        path: '/province/edit/:id',
        name: 'provinces.edit',
        component: () => import( /* webpackChunkName: "edit" */ '../views/provinces/edit.vue')
    },
    {
        path: '/citys',
        name: 'citys.index',
        component: () => import( /* webpackChunkName: "index" */ '../views/citys/index.vue')
    },
    {
        path: '/city/create',
        name: 'citys.create',
        component: () => import( /* webpackChunkName: "create" */ '../views/citys/create.vue')
    },
    {
        path: '/city/edit/:id',
        name: 'citys.edit',
        component: () => import( /* webpackChunkName: "edit" */ '../views/citys/edit.vue')
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router
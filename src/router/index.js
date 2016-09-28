import Vue from 'vue'
import VueRouter from 'vue-router'
import ls from 'store2'
import cookies from 'js-cookie'

import index from '../components/index.jsx'
import adminEdit from '../components/edit.jsx'
import adminList from '../components/list.jsx'
import adminPost from '../components/post.jsx'
import article from '../components/article.jsx'

Vue.use(VueRouter)

const scrollBehavior = to => {
    const position = {}
    if (to.hash) {
        position.selector = to.hash
    }
    if (to.matched.some(mm => mm.meta.scrollToTop)) {
        position.x = 0
        position.y = 0
    }
    return position
}

const guardRoute = (route, redirect, next) => {
    var token = ls.get('token') && cookies.get('user')
    if (!token) {
        redirect('/')
    } else {
        next()
    }
}

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior,
    routes: [
        { name:'index', path: '/', component: index },
        { name:'index', path: '/category/:id(\\d+)', component: index },
        { name:'index', path: '/search/:qs', component: index },
        { name:'article', path: '/article/:id', component: article, meta: { scrollToTop: true } },
        { path: '/list/:page(\\d+)', component: adminList, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { path: '/post', component: adminPost, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { path: '/edit/:id/:page', component: adminEdit, meta: { scrollToTop: true }, beforeEnter: guardRoute }
    ]
})



export default router

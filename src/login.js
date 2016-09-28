import Vue from 'vue'
import Login from './LoginApp.jsx'
import store from './store'

const app = new Vue({
    store,
    ...Login
})

app.$mount('#app')

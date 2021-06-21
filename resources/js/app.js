require('./bootstrap');

import Vue from 'vue';
window.Vue = require('vue').default;

import VueRouter from 'vue-router';
import axios from 'axios';
import {route} from './route';
import navbar from './navbar.vue';

Vue.use(VueRouter);
Vue.prototype.axios=axios;

const router = new VueRouter({
    mode : "history",
    routes : route
})

const navbars = new Vue({
    el : '#navbar',
    router : router,
    render: h => h(navbar)
})
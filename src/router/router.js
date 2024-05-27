import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../pages/MainPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/CreateOrg',
        component: () => {
            return import('../pages/CreateOrg.vue');
        },
    },
];

export default new VueRouter({
    mode: 'history',
    // base: '/Vue2-Elros/',
    routes,
});

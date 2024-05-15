import Vue from 'vue';
import { createPinia } from 'pinia';
import Meta from 'vue-meta';
import App from './App.vue';
import router from './router/router';
import './assets/main.css';

const pinia = createPinia();

Vue.use(pinia);
Vue.use(Meta);

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');

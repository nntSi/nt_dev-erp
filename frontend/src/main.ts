import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'flowbite';
import store from './store'
import router from './router';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App).use(router).use(store).component('Datepicker', Datepicker).mount('#app')

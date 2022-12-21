import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'flowbite';
import store from './store'
import router from './router';

createApp(App).use(router).use(store).mount('#app')

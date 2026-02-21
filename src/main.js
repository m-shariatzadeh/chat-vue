import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router";
import { api } from "./api.js";

import "./assets/chats/fontawesome.js";
import './style.css'
import 'animate.css'
import '@tailwindplus/elements'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')

window.api = api;
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from "./router";
import { api } from "./api.js";
import { pusherConfig } from "./pusher.js";


import "./assets/chats/fontawesome.js";
import './style.css'
import 'animate.css'
import '@tailwindplus/elements'


const pinia = createPinia().use(piniaPluginPersistedstate);

// console.log(router.currentRoute)
createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')

window.api = api;

pusherConfig();
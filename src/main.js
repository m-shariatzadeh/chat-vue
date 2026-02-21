import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

import "./assets/chats/fontawesome.js";
import './style.css'
import 'animate.css'
import '@tailwindplus/elements'

createApp(App)
    .use(router)
    .mount('#app')

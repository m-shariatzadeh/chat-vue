import { createApp } from 'vue'
import './style.css'
import 'animate.css'
import '@tailwindplus/elements'
import App from './App.vue'
import router from "./router";

createApp(App)
    .use(router)
    .mount('#app')

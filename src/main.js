import {createApp, nextTick} from 'vue'
import {createPinia} from 'pinia'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from "./router";
import {api} from "./api.js";

import "./assets/chats/fontawesome.js";
import './style.css'
import 'animate.css'
import '@tailwindplus/elements'
import {useUserStore} from "./stores/user.js";
import {useAdminStore} from "./stores/admin.js";

const pinia = createPinia().use(piniaPluginPersistedstate);

// console.log(router.currentRoute)
createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')

window.api = api;

const user = useUserStore();
const admin = useAdminStore();

let headers = '';
let url = '';
if (user.session_token || admin.token){
    if (admin.isAuth){
        api.defaults.headers.common['Authorization'] = 'Bearer ' + admin.token;
        headers = {
            "Authorization": 'Bearer ' + admin.token,
            "Accept": "application/json",
        }

        url = "api/broadcasting/auth-admin";
    }else{
        headers = {
            "X-Session-Token": user.session_token,
            "Accept": "application/json",
        }

        url = "api/broadcasting/auth";
    }
    // console.log(user.session_token)
    // console.log(user.session_token ? 'user: '+ user.session_token : 'admin: '+ admin.token)
    // Pusher.logToConsole = true;
    const pusher = new Pusher("appkey", {
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        wsHost: import.meta.env.VITE_PUSHER_SOCKET_URL,
        wsPort: import.meta.env.VITE_PUSHER_SOCKET_PORT,
        forceTLS: false,
        enabledTransports: ["ws"],
        authEndpoint: import.meta.env.VITE_API_URL + url,
        auth: {headers: headers},
    });
    pusher.connection.bind("connected", () => {
        // console.log(pusher.connection.socket_id);
    });

    pusher.connection.bind("error", (err) => {
        // console.log(err)
    });

    window.pusher = pusher;
}
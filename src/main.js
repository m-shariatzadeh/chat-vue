import {createApp, nextTick} from 'vue'
import { createPinia } from 'pinia'
import Pusher from 'pusher-js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from "./router";
import { api } from "./api.js";

import "./assets/chats/fontawesome.js";
import './style.css'
import 'animate.css'
import '@tailwindplus/elements'
import {useUserStore} from "./stores/user.js";
import {useChatStore} from "./stores/chat.js";

const pinia = createPinia().use(piniaPluginPersistedstate);


createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')

window.api = api;

const user = useUserStore();
const chat = useChatStore();

if (user.session_token){
    // Pusher.logToConsole = true;
    const pusher = new Pusher("appkey", {
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        wsHost: import.meta.env.VITE_PUSHER_SOCKET_URL,
        wsPort: import.meta.env.VITE_PUSHER_SOCKET_PORT,
        forceTLS: false,
        enabledTransports: ["ws"],
        authEndpoint: import.meta.env.VITE_API_URL + "api/broadcasting/auth",
        auth: {
            headers: {
                "X-Session-Token": user.session_token,
                "Accept": "application/json",
            },
        },
    });
    pusher.connection.bind("connected", () => {
        // console.log(pusher.connection.socket_id);
    });

    pusher.connection.bind("error", (err) => {
        console.log(err)
    });

    const channel = pusher.subscribe(`private-conversation.${user.conversation_id}`);

    channel.bind("message.sent", (payload) => {
        chat.messages.push(payload);
        // console.log(payload)
    });
}

import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import UserChat from "../components/UserChat.vue";
import AdminPanel from "../components/AdminPanel.vue";

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/user',
        name: 'UserChat',
        component: UserChat
    },
    {
        path: '/admin',
        name: 'AdminPanel',
        component: AdminPanel
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

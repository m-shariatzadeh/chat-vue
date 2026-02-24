import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import UserChat from "../components/UserChat.vue";
import AdminPanel from "../components/AdminPanel.vue";
import UserLayout from "../components/layouts/UserLayout.vue";
import AdminLayout from "../components/layouts/AdminLayout.vue";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/user',
        component: UserLayout,
        children: [
            {
                path: '',
                name: 'UserChat',
                component: UserChat
            }
        ]
    },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            {
                path: '',
                name: 'AdminPanel',
                component: AdminPanel
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
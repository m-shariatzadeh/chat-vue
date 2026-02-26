import { ref } from "vue";
import { defineStore } from "pinia";

export const useAdminStore = defineStore('admin', () => {
    // states
    const id = ref();
    const email = ref();
    const name = ref();
    const token = ref();
    const isAuth = ref();
    const conversationId = ref();

    return {
        id,
        name,
        email,
        token,
        isAuth,
        conversationId
    }
},{
    persist: {
        storage: sessionStorage,
        omit: ['conversationId'], // ignore it
    },
});
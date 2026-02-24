import { ref } from "vue";
import { defineStore } from "pinia";

export const useAdminStore = defineStore('admin', () => {
    // states
    const id = ref();
    const email = ref();
    const name = ref();
    const token = ref();
    const isAuth = ref();

    return {
        id,
        name,
        email,
        token,
        isAuth
    }
},{
    persist: {
        storage: sessionStorage,
    },
});
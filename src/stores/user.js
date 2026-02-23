import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user',() => {
    // using Setup Stores

    // states
    const session_id = ref();
    const session_token = ref();
    const visitor_id = ref();

    // ------------------------------------ //
    // getter


    // ----------------------------------- //
    // action

    return {
        session_id,
        session_token,
        visitor_id,
    }
}, {
    persist: true
})
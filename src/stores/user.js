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
    async function create() {
        try {
            if (session_token.value === undefined){
                // create visitor session
                const data = { name: 'Guest' }
                const res = await api.post('api/visitor/session', data);
                session_id.value = res.data.session_id;
                session_token.value = res.data.session_token;
                visitor_id.value = res.data.visitor_id;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return {
        session_id,
        session_token,
        visitor_id,
        create
    }
}, {
    persist: true
})
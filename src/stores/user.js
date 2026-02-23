import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user',() => {
    // using Setup Stores

    // states
    const session_id = ref();
    const session_token = ref();
    const visitor_id = ref();
    const conversation_id = ref();

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

                // create conversation
                const data2 = {
                    "visitor_id": visitor_id.value,
                    "session_id": session_id.value,
                    "subject": "Test Chat"
                };
                const res2 = await api.post('api/conversations', data);
                conversation_id.value = res2.data.id;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return {
        session_id,
        session_token,
        visitor_id,
        conversation_id,
        create
    }
}, {
    persist: true
})
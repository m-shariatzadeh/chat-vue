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
                const data = { phone: '09399701760' }
                const res = await api.post('api/visitor/session', data);
                session_id.value = res.data.session_id;
                session_token.value = res.data.session_token;
                visitor_id.value = res.data.visitor_id;

                api.defaults.headers.common['X-Session-Token'] = session_token.value;
            }else{
                api.defaults.headers.common['X-Session-Token'] = session_token.value;
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
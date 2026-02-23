import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore('chat',() => {
    // using Setup Stores

    // states
    const text = ref('');
    const oldText = ref('');
    const editMode = ref(false);
    const doUpdate = ref(false);
    const messageId = ref(Number); // used for edit and reply
    const messages = ref([]);

    // ------------------------------------ //
    // getter


    // ----------------------------------- //
    // action
    async function getMessages(){
        try {
            const res = await api.get('api/conversations/1/messages');
            messages.value = res.data;
            // console.log(res.data)
        } catch (error) {
            console.error(error);
        }
    }

    function disableEditMode() {
        editMode.value = false;
        text.value = '';
        oldText.value = '';
    }

    return {
        text,
        oldText,
        editMode,
        messages,
        messageId,
        doUpdate,
        getMessages,
        disableEditMode,
    }
})
import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore('chat',() => {
    // using Setup Stores

    // states
    const text = ref('');
    const oldText = ref('');
    const editMode = ref(false);
    const replyMode = ref(false);
    const doUpdate = ref(false);
    const messageId = ref();
    const messages = ref([]);

    // ------------------------------------ //
    // getter


    // ----------------------------------- //
    // action

    function disableEditMode() {
        editMode.value = false;
        text.value = '';
        oldText.value = '';
    }

    function disableReplyMode() {
        replyMode.value = false;
        text.value = '';
        oldText.value = '';
    }

    return {
        text,
        oldText,
        editMode,
        replyMode,
        messages,
        messageId,
        doUpdate,
        disableEditMode,
        disableReplyMode
    }
})
import { defineStore } from "pinia";
import {computed, reactive, ref} from "vue";

export const useChatStore = defineStore('chat',() => {
    // using Setup Stores

    // states
    const text = ref('');
    const oldText = ref('');
    const editMode = ref(false);
    const doUpdate = ref(false);
    const messageId = ref(Number); // used for edit and reply
    const messages = reactive([
        {
            id: 1,
            user: 'مصطفی',
            user_type: 'user',
            text: 'سلام وقت بخیر',
            time: '10:20 Am'
        },{
            id: 2,
            user: 'پشتیبانی',
            user_type: 'support',
            text: 'سلام بفرمایید',
            time: '10:30 Am'
        },{
            id: 3,
            user: 'مصطفی',
            user_type: 'user',
            text: 'این یک جواب تستی استاین یک جواب تستی استاین یک جواب تستی استاین یک جواب تستی استاین یک جواب تستی استاین یک جواب تستی استاین یک جواب تستی استاین یک جواب تستی استاین یک جواب تستی است',
            time: '10:45 Am'
        },{
            id: 4,
            user: 'پشتیبانی',
            user_type: 'support',
            text: 'این یک جواب تستی استاین یک',
            time: '11:10 Am'
        }]);

    // ------------------------------------ //
    // getter


    // ----------------------------------- //
    // action
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
        disableEditMode
    }
})
import {defineStore} from "pinia";
import {computed, nextTick, ref} from "vue";
import {useAdminStore} from "./admin.js";
import {useUserStore} from "./user.js";

export const useChatStore = defineStore('chat',() => {
    // using Setup Stores

    // states
    const admin = useAdminStore();
    const user = useUserStore();
    const text = ref('');
    const oldText = ref('');
    const editMode = ref(false);
    const replyMode = ref(false);
    const messageId = ref();
    const messages = ref([]);
    const loading = ref(false);


    // ------------------------------------ //
    // getter
    const base_api_url = computed(() => {
        if (admin.isAuth){
            return 'api/admin';
        }else{
            return 'api';
        }
    })

    const sender = computed(() => {
        if (admin.isAuth){
            return {
                key: 'admin_id',
                value: admin.id
            };
        }else{
            return {
                key: 'sender_id',
                value: user.visitor_id
            };
        }
    })

    // ----------------------------------- //
    // action
    async function getMessages(conversationId){
        try {
            const res = await api.get(`${base_api_url.value}/conversations/${conversationId}/messages`);
            messages.value = res.data;
            // console.log(res.data)
        } catch (error) {
            console.error(error);
        }
    }

    async function sendMessage(conversationId) {
        if (text.value.toString().trim() === ''){
            return;
        }

        loading.value = true;
        try {
            const data = {
                [sender.value.key]: sender.value.value,
                body: text.value,
                reply_to: replyMode.value ? messageId.value ?? null : null
            }
            const res = await api.post(`${base_api_url.value}/conversations/${conversationId}/messages`,data);
            messages.value.push(res.data);
            messageId.value = res.data.id;
            text.value = ''
            loading.value = false;
            replyMode.value = false;
            await nextTick();
            scrollToMessage();
        } catch (error) {
            console.error(error);
        }
    }

    async function updateMessage() {
        if (text.value.toString().trim() === '') return;

        loading.value = true;

        try {
            const data = { body: text.value };
            const res = await api.patch(`${base_api_url.value}/messages/${messageId.value}/update`, data);
            messages.value.find(message => message.id === res.data.id).body = res.data.body;
            loading.value = false;
            disableEditMode();
        } catch (error) {
            console.error(error);
        }
    }

    async function destroy(msgId) {
        try {
            await api.delete(`${base_api_url.value}/messages/${msgId}/delete`);
        } catch (error) {
            console.error(error);
        }
    }

    function scrollToMessage(e, elementId = null) {
        if (elementId != null){
            const element = document.getElementById(elementId);
            element.scrollIntoView({ behavior: "smooth" });
            element.classList.add('bg-lime-100')
            setTimeout(() => {
                element.classList.remove('bg-lime-100')
            }, 1000)
        }else{
            if (messageId.value === undefined) {
                return;
            }
            const element = document.getElementById(`message_${messageId.value}`);
            // console.log(messageId.value)
            // remove animation
            element.classList.remove('animate__animated');
            element.classList.remove('animate__fadeInRight');

            element.scrollIntoView({ behavior: "smooth" });
            element.classList.add('bg-lime-100')
            setTimeout(() => {
                element.classList.remove('bg-lime-100')
            }, 1000)
        }
    }

    function updateMessageId() {
        if (messages.value.length > 0) {
            const last_message = messages.value[messages.value.length - 1];
            messageId.value = last_message.id;
        }
    }

    function enableEditMode(msgId) {
        editMode.value = true;
        messageId.value = msgId;
        const messageText = messages.value.find(message => message.id === msgId).body;
        // console.log(messageText);
        text.value = messageText;

        // old text limit to show
        oldText.value = messageText.length > 20
            ? messageText.slice(0, 20) + '...'
            : messageText;
    }

    function disableEditMode() {
        editMode.value = false;
        text.value = '';
        oldText.value = '';
    }

    function enableReplyMode(msgId) {
        messageId.value = msgId;
        replyMode.value = true;
        const messageText = messages.value.find(message => message.id === msgId).body;

        // old text limit to show
        oldText.value = messageText.length > 20
            ? messageText.slice(0, 20) + '...'
            : messageText;
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
        loading,
        enableEditMode,
        disableEditMode,
        enableReplyMode,
        disableReplyMode,
        getMessages,
        sendMessage,
        updateMessage,
        destroy,
        scrollToMessage,
        updateMessageId,
    }
})
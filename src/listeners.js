import { useUserStore } from "./stores/user.js";
import { useChatStore } from "./stores/chat.js";
import { useAdminStore } from "./stores/admin.js";

export function bindUserMessageListeners() {
    const user = useUserStore();
    const chat = useChatStore();

    const channel = pusher.subscribe(`private-conversation.${user.conversation_id}`);

    // message sent
    channel.bind("message.sent", (payload) => {
        if (payload.sender_id !== user.visitor_id){
            chat.messages.push(payload);
        }
    });

    // message update
    channel.bind("message.update", (payload) => {
        if (payload.sender_id !== user.visitor_id){
            const msg = chat.messages.find(m => m.id === payload.id);
            if (msg) msg.body = payload.body;
        }
    });

    // message delete
    channel.bind("message.delete", (payload) => {
        chat.messages = chat.messages.filter(m => m.id !== payload.id);
    });
}

export function bindAdminMessageListeners() {
    const admin = useAdminStore();
    const chat = useChatStore();

    const channel = pusher.subscribe(`private-conversation.${admin.conversationId}`);

    // message sent
    channel.bind("message.sent", (payload) => {
        // console.log(payload)
        if (admin.id !== payload.sender_id) {
            chat.messages.push(payload);
        }
    });

    // message update
    channel.bind("message.update", (payload) => {
        // console.log(payload)
        if (admin.id !== payload.sender_id){
            chat.messages.find(message => message.id === payload.id).body = payload.body;
        }
    });

    // message delete
    channel.bind("message.delete", (payload) => {
        // console.log(payload)
        chat.messages = chat.messages.filter(message => message.id !== payload.id);
    });
}
<script setup>
import LoginForm from "./admin/LoginForm.vue";
import { useAdminStore } from "../stores/admin.js";
import {nextTick, onMounted, ref, watch} from "vue";
import Message from "./admin/Message.vue";
import {useChatStore} from "../stores/chat.js";
import {storeToRefs} from "pinia";

const admin = useAdminStore();
const conversations = ref([]);
const conversationId = ref();
const loading = ref(false);
const chatExist = ref(false);
const chat = useChatStore();
const { text, oldText, editMode, messageId, doUpdate, messages} = storeToRefs(chat);
const disableEditMode = chat.disableEditMode;

function showConversation(oldConversationId) {
  if (oldConversationId){
    pusher.unsubscribe(`private-conversation.${oldConversationId}`);
  }

  chatExist.value = true;

  // listen to send messages
  if (conversationId.value){
    const channel = pusher.subscribe(`private-conversation.${conversationId.value}`);
    channel.bind("message.sent", (payload) => {
      if (admin.id !== payload.sender_id) {
        messages.value.push(payload);
      }
    });
  }
}

async function getMessages() {
  try {
    const res = await api.get(`api/admin/conversations/${conversationId.value}/messages`);
    messages.value = res.data;
    // console.log(res.data)
  } catch (error) {
    console.error(error);
  }
}

async function sendMessage() {
  if (text.value.toString().trim() === ''){
    return;
  }

  loading.value = true;
  try {
    const data = {
      admin_id: admin.id,
      body: text.value
    }
    const res = await api.post(`/api/admin/conversations/${conversationId.value}/messages`,data);
    messages.value.push(res.data);
    messageId.value = res.data.id;
    text.value = ''
    loading.value = false;
    await nextTick();
    scrollToMessage();
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

onMounted(async () => {
  // get Conversations
  if (admin.isAuth){
    try{
      const res = await api.get('api/admin/conversations');
      conversations.value = res.data.data;
      // console.log(res.data)

    }catch (e){
      console.error(e.response.data.message);
    }
  }
})

watch(conversationId,async (newValue, oldValue) => {
  showConversation(oldValue);
  await getMessages();
  await nextTick();

  if (messages.value.length > 0) {
    const last_message = messages.value[messages.value.length - 1];
    messageId.value = last_message.id;
  }

  scrollToMessage(event,'endOfMessages');
})

watch(() => messages,async () => {
  // get last message id
  if (messages.value.length > 0) {
    const last_message = messages.value[messages.value.length - 1];
    if (messageId.value === last_message.id){
      messageId.value = last_message.id;
    }
  }

  await nextTick();
  scrollToMessage();
},{
  deep: true
})
</script>

<template>
  <div class="w-full container mx-auto mt-52" dir="rtl">
    <!-- Login Form -->
    <LoginForm v-if="!admin.isAuth"/>

    <div v-else>
      <!-- Conversation List -->
      <div class="relative overflow-x-auto float-right w-1/2">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              #
            </th>
            <th scope="col" class="px-6 py-3">
              عنوان
            </th>
            <th scope="col" class="px-6 py-3">
              موضوع
            </th>
            <th scope="col" class="px-6 py-3">
              عملیات
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(conversation, index) in conversations" :key="conversation.id" :class="conversationId === conversation.id ? 'bg-green-500' : ''" class="border-b border-gray-200">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ ++index }}
            </th>
            <td class="px-6 py-4">
              {{ conversation.subject }}
            </td>
            <td class="px-6 py-4">
              {{ conversation.status }}
            </td>
            <td class="px-6 py-4">
              <button @click="conversationId = conversation.id" class="text-blue-800 hover:text-blue-600">مشاهده</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!--  Chat Layout  -->
      <div class="float-left" dir="ltr">
        <section class="bg-gray-100 w-96 h-[50rem] flex flex-col">
          <!-- Chat Header -->
<!--          <Header @closeChatModal="openChatModal = false"/>-->

          <div class="flex-1 overflow-y-auto p-4 chat-container overflow-x-hidden">
            <!-- Chat Messages -->
            <section>
              <Message v-for="message in messages" :key="message.id" :message="message" />
            </section>
            <div id="endOfMessages"></div>
          </div>

          <!-- Editable Text -->
          <div class="bg-slate-200 py-2" v-if="editMode">
            <button @click="disableEditMode" class="float-right mr-3">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div v-text="oldText" class="cursor-pointer text-center" @click="scrollToMessage"></div>
          </div>
          <!-- Chat Input -->
          <div class="bg-white border-t p-4" v-if="chatExist">
            <div class="max-w-4xl mx-auto flex items-center space-x-4">
              <button class="p-2 text-gray-500 hover:text-gray-700 transition">
                <i class="fa-solid fa-paperclip"></i>
              </button>
              <input @keyup.enter="sendMessage" type="text" v-model="text" placeholder="Type your message..." class="flex-1 p-2 border rounded-full focus:outline-none focus:border-green-500">
              <div v-if="editMode" class="flex">
                <button @click="doUpdate = true" class="p-1 text-white bg-green-600 rounded-full size-11 hover:bg-green-700 transition">
                  <i class="fa-solid fa-check"></i>
                </button>
              </div>
              <div v-else>
                <button @click="sendMessage" class="p-2 text-white bg-green-600 rounded-full size-11 hover:bg-green-700 transition disabled:bg-green-500" :disabled="loading">
                  <i class="fa-solid fa-paper-plane" v-if="!loading"></i>
                  <svg v-else aria-hidden="true" role="status" class="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  </div>
</template>
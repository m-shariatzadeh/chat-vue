<script setup>

import { onMounted, ref } from "vue";
import Header from "./chats/Header.vue";
import Message from "./chats/Message.vue";
import StartChat from "./chats/StartChat.vue";
import { storeToRefs } from "pinia";
import { useChatStore } from "../stores/chat.js";
import { useUserStore } from "../stores/user.js";

const user = useUserStore();
const openChatModal = ref(false);
const chatExist = ref(true);
const loading = ref(false);
const chat = useChatStore();
const { text, oldText, editMode, messageId, doUpdate, messages} = storeToRefs(chat);
const disableEditMode = chat.disableEditMode;

async function sendMessage() {
  if (text.value.toString().trim() === ''){
    return;
  }

  loading.value = true;
  try {
    const data = {
      sender_id: 3,
      body: text.value
    }
    const res = await api.post('/api/conversations/1/messages',data);
    messages.value.push(res.data);
    text.value = ''
    loading.value = false;
    // console.log(res.data)
  } catch (error) {
    console.error(error);
  }
}

function scrollToMessage() {
  const element = document.getElementById(`message_${messageId.value}`);
  element.scrollIntoView({ behavior: "smooth" });
  element.classList.add('bg-lime-100')
  setTimeout(() => {
    element.classList.remove('bg-lime-100')
  }, 1000)
}

async function getUser(){
  try {
    if (user.session_token === undefined){
      // create visitor session
      const data = { name: 'Guest' }
      const res = await api.post('api/visitor/session', data);
      user.session_id = res.data.session_id;
      user.session_token = res.data.session_token;
      user.visitor_id = res.data.visitor_id;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getMessages(){
  try {
    const res = await api.get('api/conversations/1/messages');
    messages.value = res.data;
    // console.log(res.data)
  } catch (error) {
    console.error(error);
  }
}

onMounted( () => {
  getUser();
  getMessages();
})

</script>

<template>
  <div>
    <!--  modal button  -->
    <div class="fixed bottom-4 right-4" v-show="!openChatModal">
      <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 size-14 rounded-full shadow-lg" @click="openChatModal = !openChatModal">
        <i class="fa-regular fa-comment-dots"></i>
      </button>
    </div>

    <!--  Chat Layout  -->
    <section class="bg-gray-100 w-96 h-[50rem] flex flex-col animate__animated animate__fadeInUp" v-show="openChatModal">
      <!-- Chat Header -->
      <Header @closeChatModal="openChatModal = false"/>

      <div class="flex-1 overflow-y-auto p-4 chat-container overflow-x-hidden">
        <!-- Chat Messages -->
        <section v-if="chatExist">
          <Message v-for="message in messages" :key="message.id" :message="message" />
        </section>

        <!-- Start Chat -->
        <section v-else>
          <StartChat @chatExist="chatExist = true" />
        </section>
      </div>

      <!-- Editable Text -->
      <div class="bg-slate-200 py-2" v-if="editMode">
        <button @click="disableEditMode" class="float-right mr-3">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div v-text="oldText" class="cursor-pointer" @click="scrollToMessage"></div>
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
</template>

<style scoped>
  @import "/src/assets/chats/style.css";
</style>
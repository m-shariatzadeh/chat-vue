<script setup>

import {onMounted, reactive, ref} from "vue";
import Header from "./chats/Header.vue";
import Message from "./chats/Message.vue";
import StartChat from "./chats/StartChat.vue";

const openChatModal = ref(false);
const oldText = ref('');
const text = ref('');
const chatExist = ref(true);
const editMode = ref(false);
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

function sendMessage() {

if (text.value.toString().trim() === ''){
  return;
}

  // Post Request to store message
  // after storing data we need to message response then add to messages array
  // messages.value.push(message.value);

  // test send
  const now = new Date()
  const message = ref({
    id: 5,
    user: 'مصطفی',
    user_type: 'user',
    text: text.value,
    time: now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }),
  })

  messages.push(message.value);
  text.value = ''
}

function enableEditMode(msgId) {
  editMode.value = true;
  messageId.value = msgId;
  const messageText = messages.find(message => message.id === msgId).text;
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

function updateMessage() {
  if (text.value.toString().trim() === ''){
    return;
  }

  messages.find(message => message.id === messageId.value).text = text.value;
  disableEditMode();
}

function scrollToMessage() {
  const element = document.getElementById(`message_${messageId.value}`);
  element.scrollIntoView({ behavior: "smooth" });
  element.classList.add('bg-lime-100')
  setTimeout(() => {
    element.classList.remove('bg-lime-100')
  }, 1000)
}

function getMessages() {
  // call api get messages
}

onMounted(() => {
  getMessages()
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
          <Message v-for="message in messages" :key="message.id" :message="message" @edit="enableEditMode"/>
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
            <button @click="updateMessage" class="p-1 text-white bg-green-600 rounded-full size-11 hover:bg-green-700 transition">
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
          <div v-else>
            <button @click="sendMessage" class="p-2 text-white bg-green-600 rounded-full size-11 hover:bg-green-700 transition">
              <i class="fa-solid fa-paper-plane"></i>
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
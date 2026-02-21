<script setup>

import {onMounted, reactive, ref} from "vue";
import Header from "./chats/Header.vue";
import Message from "./chats/Message.vue";
import StartChat from "./chats/StartChat.vue";

const openChatModal = ref(false);
const text = ref('');
const chatExist = ref(true);

const messages = reactive([{
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
    text: 'این یک پیام تستی است',
    time: '10:45 Am'
  },{
    id: 4,
    user: 'پشتیبانی',
    user_type: 'support',
    text: 'این یک جواب تستی است...',
    time: '11:10 Am'
}]);

// const messages = reactive([]);

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

onMounted(() => {
  console.log('this is test')
})

</script>

<template>
  <div>
    <!--  modal button  -->
    <div class="fixed bottom-4 right-4" v-show="!openChatModal">
      <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 size-14 rounded-full shadow-lg" @click="openChatModal = !openChatModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      </button>
    </div>

    <!--  Chat Layout  -->
    <section class="bg-gray-100 w-96 h-[50rem] flex flex-col animate__animated animate__fadeInUp" v-show="openChatModal">
      <!-- Chat Header -->
      <Header @closeChatModal="openChatModal = false"/>

      <div class="flex-1 overflow-y-auto p-4 chat-container" >
        <!-- Chat Messages -->
        <section v-if="chatExist">
          <Message v-for="message in messages" :key="message.id" :message="message"/>
        </section>

        <!-- Start Chat -->
        <section v-else>
          <StartChat @chatExist="chatExist = true" />
        </section>
      </div>

      <!-- Chat Input -->
      <div class="bg-white border-t p-4" v-if="chatExist">
        <div class="max-w-4xl mx-auto flex items-center space-x-4">
          <button class="p-2 text-gray-500 hover:text-gray-700 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
            </svg>
          </button>
          <input @keyup.enter="sendMessage" type="text" v-model="text" placeholder="Type your message..." class="flex-1 p-2 border rounded-full focus:outline-none focus:border-green-500">
          <button @click="sendMessage" class="p-2 text-white bg-green-600 rounded-full hover:bg-green-700 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  @import "/src/assets/chats/style.css";
</style>
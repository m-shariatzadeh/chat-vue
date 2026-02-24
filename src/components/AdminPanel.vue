<script setup>
import LoginForm from "./admin/LoginForm.vue";
import { useAdminStore } from "../stores/admin.js";
import { onMounted, ref } from "vue";
import Message from "./admin/Message.vue";

const admin = useAdminStore();
const conversations = ref([]);
const conversationId = ref();
const messages = ref([]);

function showConversation(conversation_Id) {
  conversationId.value = conversation_Id;
  console.log(conversation_Id);
  // listen to send messages
  if (conversationId.value){
    const channel = pusher.subscribe(`private-conversation.${conversationId.value}`);
    channel.bind("message.sent", (payload) => {
      // messages.value.push(payload);
      console.log(payload)
    });
  }
}

onMounted(async () => {
  // get Conversations
  if (admin.isAuth){
    api.defaults.headers.common['Authorization'] = 'Bearer ' + admin.token;
    try{
      const res = await api.get('api/admin/conversations');
      conversations.value = res.data.data;
      console.log(res.data)

    }catch (e){
      console.error(e.response.data.message);
    }
  }
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
          <tr v-for="(conversation, index) in conversations" :key="conversation.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
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
              <button @click="showConversation(conversation.id)" class="text-blue-800 hover:text-blue-600">مشاهده</button>
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
              <Message />
            </section>
            <div id="endOfMessages"></div>
          </div>
        </section>
      </div>

    </div>
  </div>
</template>
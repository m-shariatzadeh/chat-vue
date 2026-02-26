<script setup>

import {useChatStore} from "../../stores/chat.js";
import {storeToRefs} from "pinia";
import {watch} from "vue";

const props = defineProps({
  message: Object|Array,
  // doUpdate: Boolean,
})

const chat = useChatStore();
const { text, oldText, editMode, messageId, doUpdate, messages} = storeToRefs(chat);
const disableEditMode = chat.disableEditMode;

async function destroy(msgId) {
  try {
    await api.delete(`api/admin/messages/${msgId}/delete`);
  } catch (error) {
    console.error(error);
  }
}

function enableEditMode() {
  editMode.value = true;
  messageId.value = props.message.id;
  const messageText = messages.value.find(message => message.id === props.message.id).body;
  // console.log(messageText);
  text.value = messageText;

  // old text limit to show
  oldText.value = messageText.length > 20
      ? messageText.slice(0, 20) + '...'
      : messageText;
}

function updateMessage() {
  if (text.value.toString().trim() === ''){
    return;
  }

  messages.value.find(message => message.id === messageId.value).text = text.value;
  disableEditMode();
  doUpdate.value = false;
}

watch(doUpdate, () => {
  updateMessage();
});

function reply(){
  console.log(props.message.id)
}
</script>
<template>
    <div class="max-w-4xl mx-auto space-y-4">
      <!-- Receiver Message -->
      <div class="flex items-start space-x-2 message_sec animate__animated animate__fadeInLeft" v-if="message.sender_type === 'visitor'" :id="`message_${message.id}`">
        <img src="https://placehold.co/600x400/000000/fff" alt="Abhiraj" class="w-8 h-8 rounded-full object-cover">
        <div>
          <div class="bg-white rounded-lg rounded-tl-none p-3 shadow-md max-w-md">
            <span class="text-slate-400 flex justify-end text-sm">{{ message.user }}</span>
            <p>{{ message.body }}</p>
          </div>
          <div class="text-gray-500 text-xs message-time flex justify-end pt-2 pb-4">
            <span>{{ message.time }}</span>
            <i class="fa-solid fa-check"></i>
          </div>
        </div>

        <!--    Action Button    -->
        <el-dropdown class="inline-block">
          <button class="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold text-gray-900 bg-none p-0">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <el-menu anchor="bottom end" popover class="m-0 w-56 origin-top-right rounded-md bg-white p-0 shadow-lg outline outline-1 outline-black/5 transition [--anchor-gap:theme(spacing.2)] [transition-behavior:allow-discrete] data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in w-fit">
            <div class="py-1">
              <a @click="" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none" >
                پاسخ
                <i class="fa-solid fa-reply text-xs"></i>
              </a>
            </div>
          </el-menu>
        </el-dropdown>
      </div>

      <!-- Sender Message -->
      <div class="flex items-start justify-end space-x-2 message_sec animate__animated animate__fadeInRight" v-if="message.sender_type === 'agent'" :id="`message_${message.id}`">
        <!--    Action Button    -->
        <el-dropdown class="inline-block">
          <button class="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold text-gray-900 bg-none p-0">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>

          <el-menu anchor="bottom end" popover class="m-0 w-56 origin-top-right rounded-md bg-white p-0 shadow-lg outline outline-1 outline-black/5 transition [--anchor-gap:theme(spacing.2)] [transition-behavior:allow-discrete] data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in w-fit">
            <div class="py-1">
              <button @click="enableEditMode" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                ویرایش
                <i class="fa-solid fa-pen text-xs"></i>
              </button>
              <a @click="" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none" >
                پاسخ
                <i class="fa-solid fa-reply text-xs"></i>
              </a>
              <button @click="destroy(message.id)" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none" >
                حذف
                <i class="fa-solid fa-trash text-xs"></i>
              </button>
            </div>
          </el-menu>
        </el-dropdown>

        <div class="flex flex-col items-end">
          <div class="bg-green-600 text-white rounded-lg rounded-tr-none p-3 shadow-md max-w-md">
            <span class="text-slate-200 flex justify-end text-sm">{{ message.user }}</span>
            <p>{{ message.body }}</p>
          </div>
          <div class="text-gray-500 text-xs message-time flex justify-end pt-2 pb-4">
            <span>{{ message.time }}</span>
            <i class="fa-solid fa-check"></i>
          </div>
        </div>
        <img src="https://placehold.co/600x400/000000/fff" alt="User" class="w-8 h-8 rounded-full object-cover">
      </div>

      <!-- Typing Indicator -->
      <!--          <div class="flex items-start space-x-2">-->
      <!--            <img src="https://placehold.co/600x400/000000/fff" alt="" class="w-8 h-8 rounded-full object-cover">-->
      <!--            <div class="bg-white rounded-lg rounded-tl-none p-3 shadow-md">-->
      <!--              <div class="typing-indicator">-->
      <!--                <span>•</span>-->
      <!--                <span>•</span>-->
      <!--                <span>•</span>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
    </div>
</template>
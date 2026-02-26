<script setup>

import { useChatStore } from "../../stores/chat.js";
import { storeToRefs } from "pinia";

const props = defineProps({
  message: Object|Array,
})

const chat = useChatStore();
const { messages } = storeToRefs(chat);
const enableEditMode = chat.enableEditMode;
const enableReplyMode = chat.enableReplyMode;
const destroy = chat.destroy;
</script>
<template>
    <div class="max-w-4xl mx-auto space-y-4">
      <!-- Receiver Message -->
      <div class="flex items-start space-x-2 message_sec animate__animated animate__fadeInLeft" v-if="message.sender_type === 'agent'" :id="`message_${message.id}`">
        <img src="https://placehold.co/600x400/000000/fff" alt="Abhiraj" class="w-8 h-8 rounded-full object-cover"/>
        <div>
          <div class="bg-white rounded-lg rounded-tl-none p-3 shadow-md max-w-md">
            <!-- Reply Section -->
            <div v-if="message.reply_to !== null & messages.find(m => m.id === message.reply_to) !== undefined" class="mb-2 border-l-4 border-blue-500 bg-blue-50 rounded-md p-2">
              <p class="text-xs text-blue-600 font-semibold">{{ messages.find(m => m.id === message.reply_to).body }}</p>
            </div>
            <!-- Sender -->
            <span class="text-slate-400 flex justify-end text-sm">{{ message.user }}</span>
            <!-- Message Body -->
            <p>
              {{ message.body }}
            </p>
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
              <button @click="enableReplyMode(message.id)" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none" >
                پاسخ
                <i class="fa-solid fa-reply text-xs"></i>
              </button>
            </div>
          </el-menu>
        </el-dropdown>
      </div>

      <!-- Sender Message -->
      <div class="flex items-start justify-end space-x-2 message_sec animate__animated animate__fadeInRight" v-if="message.sender_type === 'visitor'" :id="`message_${message.id}`">
        <!-- Action Button -->
        <el-dropdown class="inline-block">
          <button class="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold text-gray-900 bg-none p-0">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>

          <el-menu anchor="bottom end" popover class="m-0 w-56 origin-top-right rounded-md bg-white p-0 shadow-lg outline outline-1 outline-black/5 transition [--anchor-gap:theme(spacing.2)] [transition-behavior:allow-discrete] data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in w-fit">
            <div class="py-1">
              <button @click="enableEditMode(message.id)" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                ویرایش
                <i class="fa-solid fa-pen text-xs"></i>
              </button>
              <button @click="enableReplyMode(message.id)" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                پاسخ
                <i class="fa-solid fa-reply text-xs"></i>
              </button>
              <button @click="destroy(message.id)" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
                حذف
                <i class="fa-solid fa-trash text-xs"></i>
              </button>
            </div>
          </el-menu>
        </el-dropdown>

        <div class="flex flex-col items-end">
          <!-- Main Message -->
          <div class="bg-green-600 text-white rounded-lg rounded-tr-none p-3 shadow-md max-w-md">
            <!-- Reply Section -->
            <div v-if="message.reply_to !== null & messages.find(m => m.id === message.reply_to) !== undefined" class="mb-2 border-l-4 border-blue-500 bg-blue-50 rounded-md p-2 max-w-md">
              <p class="text-xs text-blue-600 font-semibold">{{ messages.find(m => m.id === message.reply_to).body }}</p>
            </div>
            <span class="text-slate-200 flex justify-end text-sm">{{ message.user }}</span>
            <p>{{ message.body }}</p>
          </div>

          <!-- Message Time -->
          <div class="text-gray-500 text-xs message-time flex justify-end pt-2 pb-4">
            <span>{{ message.time }}</span>
            <i class="fa-solid fa-check"></i>
          </div>
        </div>

        <!-- User Image -->
        <img src="https://placehold.co/600x400/000000/fff" alt="User" class="w-8 h-8 rounded-full object-cover"/>
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
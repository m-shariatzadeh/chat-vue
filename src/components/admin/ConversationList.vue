<script setup>
import { useAdminStore } from "../../stores/admin.js";
import {storeToRefs} from "pinia";

const admin = useAdminStore();
const { conversationId } = storeToRefs(admin);

const props = defineProps({
  conversations: Array|Object,
})
</script>

<template>
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
</template>

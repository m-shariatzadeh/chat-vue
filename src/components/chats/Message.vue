<script setup>

const props = defineProps({
  message: Array|Object,
})

</script>
<template>
    <div class="max-w-4xl mx-auto space-y-4">
      <!-- Receiver Message -->
      <div class="flex items-start space-x-2 animate__animated animate__fadeInLeft" v-if="message.user_type === 'support'">
        <img src="https://placehold.co/600x400/000000/fff" alt="Abhiraj" class="w-8 h-8 rounded-full object-cover">
        <div>
          <div class="bg-white rounded-lg rounded-tl-none p-3 shadow-md max-w-md">
            <span class="text-slate-400 flex justify-end text-sm">{{ message.user }}</span>
            <p>{{ message.text }}</p>
          </div>
          <span class="text-gray-500 text-xs message-time">{{ message.time }}</span>
        </div>
      </div>

      <!-- Sender Message -->
      <div class="flex items-start justify-end space-x-2 animate__animated animate__fadeInRight" v-if="message.user_type === 'user'">
        <div class="flex flex-col items-end">
          <div class="bg-green-600 text-white rounded-lg rounded-tr-none p-3 shadow-md max-w-md">
            <span class="text-slate-200 flex justify-end text-sm">{{ message.user }}</span>
            <p>{{ message.text }}</p>
          </div>
          <span class="text-gray-500 text-xs message-time">{{ message.time }}</span>
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
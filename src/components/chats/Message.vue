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

        <!--    Action Button    -->
        <el-dropdown class="inline-block">
          <button class="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold text-gray-900 bg-none p-0">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 52 52" xml:space="preserve">
             <path d="M20,44c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S20,47.3,20,44z M20,26c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6 S20,29.3,20,26z M20,8c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S20,11.3,20,8z"/>
            </svg>
          </button>

          <el-menu anchor="bottom end" popover class="m-0 w-56 origin-top-right rounded-md bg-white p-0 shadow-lg outline outline-1 outline-black/5 transition [--anchor-gap:theme(spacing.2)] [transition-behavior:allow-discrete] data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in w-fit">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">ویرایش</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">حذف</a>
            </div>
          </el-menu>
        </el-dropdown>
      </div>

      <!-- Sender Message -->
      <div class="flex items-start justify-end space-x-2 animate__animated animate__fadeInRight" v-if="message.user_type === 'user'">
        <!--    Action Button    -->
        <el-dropdown class="inline-block">
          <button class="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold text-gray-900 bg-none p-0">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 52 52" xml:space="preserve">
             <path d="M20,44c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S20,47.3,20,44z M20,26c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6 S20,29.3,20,26z M20,8c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S20,11.3,20,8z"/>
            </svg>
          </button>

          <el-menu anchor="bottom end" popover class="m-0 w-56 origin-top-right rounded-md bg-white p-0 shadow-lg outline outline-1 outline-black/5 transition [--anchor-gap:theme(spacing.2)] [transition-behavior:allow-discrete] data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in w-fit">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">ویرایش</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">حذف</a>
            </div>
          </el-menu>
        </el-dropdown>

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
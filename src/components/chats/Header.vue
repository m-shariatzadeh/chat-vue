<script setup>
// import {useCounterStore} from "../../stores/counter.js";
//
// const counter = useCounterStore();
// counter.increment()
// console.log(counter.count);
</script>

<template>
  <div class="bg-green-600 text-white p-4  shadow-lg">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <div class="flex justify-between space-x-4 w-full">
        <div>
          <h1 class="font-bold">Chat</h1>
        </div>
        <button @click="$emit('closeChatModal')" class="bg-green-800 hover:bg-green-700 text-slate-100 rounded-full size-10 flex justify-center">
          <i class="fa-solid fa-xmark pt-3"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";

const validated = ref(true);
const phone_number = ref('')
const emit = defineEmits(['chatExist']);

function start(){
  // Regex
  const pattern = /^09\d{9}$/g;
  validated.value = pattern.test(phone_number.value);

  if (validated.value){
    emit('chatExist');
  }
}
</script>
<template>
  <div>
    <input type="text" class="w-full p-2 rounded-lg border-2 focus:outline-none border-green-500" v-model="phone_number" placeholder="شماره تماس">
  </div>
  <div class="mt-3">
    <button @click="start" class="w-full hover:bg-green-800 bg-green-700 text-white mb-3">شروع گفتگو</button>
    <span class="text-red-600" v-show="!validated">فرمت شماره تماس صحیح نیست</span>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useAdminStore } from "../../stores/admin.js";

const admin = useAdminStore();
const email = ref('');
const password = ref('');
const error = ref('');

async function login() {
  try{
    const data = {
      'email': email.value,
      'password': password.value
    }
    const res = await api.post('api/admin/login', data);

    admin.id = res.data.agent.id;
    admin.name = res.data.agent.name;
    admin.email = res.data.agent.email;
    admin.token = res.data.token;
    admin.isAuth = true;

  }catch (e){
    error.value = e.response.data.message;
    // console.error(e.response.data.message);
  }
}

</script>

<template>
    <div>
      <form class="max-w-sm mx-auto" @submit.prevent="login">
        <div class="text-red-600 text-center mb-3">{{ error }}</div>
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ایمیل</label>
          <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="name@flowbite.com" required />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">رمز عبور</label>
          <input v-model="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
        </div>
        <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">ورود</button>
      </form>
    </div>
</template>
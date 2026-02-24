<template>
  <div class="main-page flex justify-center mt-20">
    <RouterLink
        to="/user"
        class="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      User Chat
    </RouterLink>

    <span class="mx-4"></span>

    <RouterLink
        to="/admin"
        class="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
    >
      Admin Panel
    </RouterLink>
  </div>
</template>

<style scoped>
/* فقط برای Main.vue */
.main-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
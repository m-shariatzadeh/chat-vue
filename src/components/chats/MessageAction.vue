<script setup>
const props = defineProps({
  messageId: Number
})

function destroy() {
  console.log(props.messageId)
}

function edit(){
  console.log(props.messageId)
}

function reply(){
  console.log(props.messageId)
}
</script>
<template>
  <el-dropdown class="inline-block">
    <button class="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold text-gray-900 bg-none p-0">
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </button>

    <el-menu anchor="bottom end" popover class="m-0 w-56 origin-top-right rounded-md bg-white p-0 shadow-lg outline outline-1 outline-black/5 transition [--anchor-gap:theme(spacing.2)] [transition-behavior:allow-discrete] data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in w-fit">
      <div class="py-1">
        <a @click="edit" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
          ویرایش
          <i class="fa-solid fa-pen text-xs"></i>
        </a>
        <a @click="reply" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none" >
          پاسخ
          <i class="fa-solid fa-reply text-xs"></i>
        </a>
        <a @click="destroy" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none" >
          حذف
          <i class="fa-solid fa-trash text-xs"></i>
        </a>
      </div>
    </el-menu>
  </el-dropdown>
</template>
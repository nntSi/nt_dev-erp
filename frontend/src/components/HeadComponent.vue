<template>
  <div>
    <div class="w-full flex flex-row items-center p-4 bg-white border rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
      <button class="rounded-full mb-0 mr-2">
        <img class="w-10 h-10 border rounded-full" src="../assets/img/prf.jpg">
      </button>
      <b class="mr-1">คุณ</b> {{ store.getters.getUserState.fullname }} {{ store.getters.getUserState.lastname }} <b class="ml-2 mr-2">ตำแหน่ง</b>
      <span class="bg-slate-600 text-sm text-white font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">admin</span>
      <button class="ml-auto mr-4 hover:underline" v-on:click="logout">ออกจากระบบ</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore()

const logout = () => {
  store.dispatch({
    type: 'logout'
  })
}
</script>
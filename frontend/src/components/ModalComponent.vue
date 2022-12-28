<template>
  <!-- <button @click="open = true">Open Modal</button> -->
  <div class="fixed z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center w-full bg-opacity-75 bg-black">
    <div class="relative w-full h-full max-w-2xl md:h-auto">
      <div class="relative bg-white rounded-md block shadow dark:bg-gray-700 ">
        <div class="p-6">
          <!-- <h3 class="mb-0 text-lg font-normal font-bold text-slate-800 dark:text-gray-400">
            การจัดการแผนก
          </h3> -->
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup(props,  {emit}) {
    return {
 
    }
  },
})
</script>
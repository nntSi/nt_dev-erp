<template>
<div>
  <ul class="flex">
    <li>
      <button @click="gotoPage(1)" class="py-1.5 px-3 text-slate-600 rounded-l-md border text-sm mt-2 font-semibold">หน้าแรก</button>
    </li>
    <li>
      <button v-if="(initial.page - 1) != 0" @click="gotoPage(initial.page - 1)" class="py-1.5 px-3 text-slate-600 border-y border-r text-sm mt-2 font-medium hover:bg-gray-50">{{ initial.page - 1 }}</button>
    </li>
    <li>
      <button v-if="true" @click="gotoPage(initial.page)" class="py-1.5 px-3 bg-gray-100 text-slate-600 border-y border-r text-sm mt-2 font-medium hover:bg-gray-50">{{ initial.page }}</button>
    </li>
    <li>
      <button v-if="Math.ceil( count/limit ) > initial.page" @click="gotoPage(initial.page + 1)" class="py-1.5 px-3 text-slate-600 border-y border-r text-sm mt-2 font-medium hover:bg-gray-50">{{ initial.page + 1 }}</button>
    </li>
    <li>
      <button @click="gotoPage(Math.ceil( count/limit ))" class="py-1.5 px-3 text-slate-600 rounded-r-md border-y border-r text-sm mt-2 font-semibold">หน้าสุดท้าย</button>
    </li>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  emits: ["offset"],
  props: ["count", "limit"],
  setup(props, {emit}) {
    const initial = reactive({
      x: false,
      y: false,
      z: false,
      page: 1
    });
    const gotoPage = (page:number) => {
      initial.page = page;
      emit("offset", (page - 1)*props.limit);
    };
    return {
      initial,
      gotoPage
    }
  },
})
</script>
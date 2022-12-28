<template>
  <div class="relative inline-block text-left">
    <div>
      <button @click="toggleShow" type="button" class="inline-flex w-full justify-center rounded-md w-40 border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
        {{ initial.name }}
        <!-- Heroicon name: mini/chevron-down -->
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div v-if="initial.isShow" class="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <button @click="selected(item['id'], item['position_name'])" v-for="(item, index) in initial.data" :key="index" class="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabindex="-1">{{ item["position_name"] }}</button>
      </div>
    </div>
  </div>
  
  </template>
  
<script lang="ts">
import axios from "axios";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { apiUrl } from "../services/constant";
  export default defineComponent({
    emits: ["returnDP"],
    props: ["nameDP", "path"],
    setup(props, { emit }) {
      const initial = reactive({
        isShow: false,
        data: [],
        name: "ตำแหน่ง"
      });
      onMounted(() => {
        axios.get(apiUrl + props.path).then(response => {
          initial.data = response.data.body;
        });
      });
      const toggleShow = () => {
        initial.isShow = !initial.isShow
      };
      const selected = (id:number, name:string) => {
        initial.isShow = !initial.isShow
        /* console.log(id) */
        initial.name = name;
        emit("returnDP", id);
      }
      return {
        initial,
        toggleShow,
        selected
      }
    },
  });
</script>
<template>
  <label for="simple-search" class="sr-only">Search</label>
  <div class="relative w-full">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5 text-gray-500 dark:text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <input
      @input="search"
      v-model="inintial.search"
      type="text"
      id="simple-search"
      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
      placeholder="ค้นหาสิทธิการใช้งาน"
    />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { apiUrl } from "../services/constant";

export default defineComponent({
  emits: ["returnDataSearch"],
  props: ["pathgetall", "pathgetsearch"],
  setup(props, { emit }) {
    const inintial = reactive(
      {
        data:[],
        search: ""
      }
    );
    const search_data = ref("");
    // create
    onMounted(() => {
      axios.get(apiUrl + props.pathgetall).then(response => {
        inintial.data = response.data.body
        emit("returnDataSearch", inintial.data);
      });
    });
    //search onchange functiuon
    const search = () => {
      if (inintial.search == "") {
        axios.get(apiUrl + props.pathgetall ).then(response => {
          inintial.data = response.data.body
          emit("returnDataSearch", inintial.data);
        });
      }else{
        axios.get(apiUrl + props.pathgetsearch + "/" + inintial.search).then(response => {
          inintial.data = response.data.body
          console.log(inintial.data)
          emit("returnDataSearch", inintial.data);
        });
      }
    }
    return {
      search,
      inintial
    };
  },
});
</script>

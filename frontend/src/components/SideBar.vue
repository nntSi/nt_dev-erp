<template>
  <aside class="w-80 h-full" aria-label="Sidebar">
      <div class="overflow-y-auto py-4 px-8 bg-white rounded-xl border dark:bg-gray-800 shadow-lg h-screen">
        <h1 class="text-4xl font-extrabold text-center mt-4 text-slate-700">SURVEY<br>HUB</h1>
        <p class="text-xs text-center mt-1">ระบบจัดการเคลมเวอร์ชั่น 2</p>
        <button type="button" class="flex text-gray-400 mt-3 shadow-sm text-left bg-white border font-medium border-gray-300 focus:outline-none hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 rounded-md text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full">
          <i class="bi bi-search text-gray-400 mr-2"></i>
          <p class="lg:block hidden">Quick search...</p>
        </button>
        <ul class="space-y-2">
          <li v-for="item in inintail.menu" v-bind:key="item['main']['id']">
            <button v-on:click="gotopage(item['main']['route'], 'main' + item['main']['id'])" type="button" :class="crrtcolorM('main' + item['main']['id'])">
            <!-- <button v-on:click="gotopage(item['main']['route'], 'main' + item['main']['id'])" type="button" :aria-controls="item['main']['id']" :data-collapse-toggle="item['main']['id']" :class="crrtcolorM('main' + item['main']['id'])"> -->
              <i :class="item['main']['icon'] + ' mr-3'"></i>
              {{item['main']['menu_name']}}
            </button>
            <ul :id="item['main']['id']" v-if="checkHaveSub(item['sub'])" :class="hiddenSub">
            <!-- <ul :id="item['main']['id']" v-if="checkHaveSub(item['sub'])" class="hidden py-1 space-y-1 bg-gray-50"> -->
              <li v-for="submenu in item['sub']" v-bind:key="submenu['id']">
                  <button v-on:click="gotopageSub(submenu['route'],'sub' + submenu['id'])" :class="crrtcolorS('sub' + submenu['id'])">
                    - &nbsp; {{submenu['menu_name']}}
                  </button>
              </li>
            </ul>
          </li>
        </ul>
          <!-- <button v-on:click="logout" class="border">logout</button> -->
      </div>
    </aside>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import router from '../router';
import { useStore } from 'vuex';
import axios from 'axios';
import { apiUrl, server } from '../services/constant';
import { useRoute, useRouter } from 'vue-router';

const store = useStore()
const route = useRoute()
const currentBtn = ref("main1");
const currentBtnSub = ref ("");
// when app component create
onMounted(() => {
  axios.get(apiUrl + "/getmenu/" + localStorage.getItem(server.PRIVI)).then(response => {
    inintail.menu = response.data.menuget
  });
});

// menu initial
const inintail = reactive({
  menu:[]
})

// checkHaveSub
const checkHaveSub = (sub:any) => {
  if (sub.length == 0){
    return false
  }else{
    return true
  }
}
// gotopage
const hiddenSub = ref("hidden py-1 space-y-1 bg-gray-50");
const toggleSub = ref(false);
const gotopage = (routeStr:any, id:any) => {
  currentBtnSub.value = ""
  if (routeStr != null){
    router.push(routeStr);
  }else{
    toggleSub.value = !toggleSub.value
    /* console.log(id); */
    if(toggleSub.value == true){
      hiddenSub.value = "py-1 space-y-1 bg-gray-50";
    }else{
      hiddenSub.value = "hidden py-1 space-y-1 bg-gray-50";
    }
  }
  currentBtn.value = id;
}
const gotopageSub = (routeStr:any, id:any) => {
  if (routeStr != null){
    router.push(routeStr);
  }else{
    console.log(id);
  }
  currentBtnSub.value = id;
}
// current path color
const crrtcolorM = (id:string) => {
  if (id == currentBtn.value){
    return "flex items-center text-white bg-slate-800 hover:text-white hover:bg-slate-800 focus:ring-1 focus:text-white focus:outline-none focus:ring-gray-300 focus:bg-slate-800 font-medium rounded-md text-sm px-5 py-2.5 w-full text-left mr-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
  } else {
    return "flex items-center text-gray-500 bg-slate-50 hover:text-white hover:bg-slate-800 focus:ring-1 focus:text-white focus:outline-none focus:ring-gray-300 focus:bg-slate-800 font-medium rounded-md text-sm px-5 py-2.5 w-full text-left mr-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
  }
}
const crrtcolorS = (id:string) => {
  if (id == currentBtnSub.value){
    return "flex items-center p-2 pl-11 text-sm w-full font-normal bg-gray-100 text-gray-900 transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
  } else {
    return "flex items-center p-2 pl-11 text-sm w-full font-normal bg-gray-50 text-gray-900 transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
  }
}
// logout
const logout = () => {
  store.dispatch({
    type: 'logout'
  })
}
</script>
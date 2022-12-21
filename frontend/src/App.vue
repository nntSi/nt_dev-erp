<template>
  <div class="h-full flex">
    <!-- sidebar -->
    <SideBarVue v-if="store.getters.isLoginState"/>
    <!-- content -->
    <div class="px-5 py-3 w-full">
      <HeadComponent v-if="store.getters.isLoginState" class="mb-3"/>
    <!-- {{ store.getters.getMenu }} -->
      <RouterView/>
    </div>
  </div>
</template>

<script setup lang="ts">
// import
import SideBarVue from './components/SideBar.vue';
import HeadComponent from './components/HeadComponent.vue'
import { useStore } from 'vuex';
import { onMounted } from 'vue';
// setup
const store = useStore();
// hook app create
onMounted(() => {
  store.dispatch({
    type : 'restoreLogin',
  });
})
</script>
<style>

</style>


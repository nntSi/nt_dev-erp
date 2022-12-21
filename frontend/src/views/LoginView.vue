<template>
  <div class="w-full h-full flex items-center justify-center">
    <div
      class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form class="space-y-6" v-on:submit.prevent="login">
        <div>
          <h1 class="text-4xl font-extrabold text-center text-slate-800 mb-0 dark:text-white">
          SURVEYHUB
        </h1>
        <p class="text-center ">เคลมของ <b>ฉัน</b> นั้นไวกว่า <b>แสง</b></p><P></P>
        </div>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >ชื่อผู้ใช้งาน</label
          >
          <input
            type="text"
            v-model="login_form.username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >รหัสผ่าน</label
          >
          <input
            type="password"
            v-model="login_form.password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-slate-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >จดจำฉันในระบบ</label
            >
          </div>
          <a
            href="#"
            class="ml-auto text-sm text-slate-700 hover:underline dark:text-slate-500"
            >ลืมรหัสผ่าน ?</a
          >
        </div>
        <button
          type="submit"
          class="w-full text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เข้าสู่ระบบ
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          ยังไม่ได้ลงทะเบียน ?
          <a href="#" class="text-slate -700 hover:underline dark:text-slate-500"
            >สร้างบัญชี</a
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
// import
import { onMounted, reactive } from 'vue';
import { useStore, mapState } from 'vuex';
import router from '../router';
// setup
const store = useStore()
const login_form = reactive({
  username: "",
  password: ""
});
// function login
const login = () => {
  store.dispatch({
    type: 'login',
    login_form
  });
}
onMounted(() => {
  if(store.getters.isLoginState == true){
    router.push('/dashboard');
  }
});

</script>

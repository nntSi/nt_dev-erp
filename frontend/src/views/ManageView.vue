<template>
  <div class="grid lg:grid-cols-2 grid-cols-1">
    <div
      class="w-full p-6 bg-white border lg:mb-0 mb-2 border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          สร้างสิทธิการใช้งานเมนูต่าง ๆ
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        สารมารถสร้างตำแหน่ง เพื่อกำหนดสิทธิในการเข้าใช้งานเมนูต่างๆ
        ได้ตามต้องการ
      </p>
      <label
        class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
        >ชื่อตำแหน่ง</label
      >
      <input
        v-model="data_for_sent.position_name"
        type="text"
        class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="ผู้จัดการ, หัวหน้าฝ่ายขาย, ผู้ดูแลระบบ"
        required
      />
      <label
        class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
        >ชื่อแผนก</label
      >
      <input
        v-model="data_for_sent.department"
        type="text"
        class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="แผนก IT, แผนกการเงิน, ฝ่ายขาย"
        required
      />
      <label
        class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
        >เมนูที่สามารถเข้าถึงได้</label
      >
      <div class="grid grid-cols-2 mb-3 gap-4">
        <div
          v-for="(item, index) in initial_data.menu"
          :key="index"
          class="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700"
        >
          <input
            id="bordered-checkbox-1"
            v-model="CheckBoxRam[index]"
            @change="stupMenu(item['id'])"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
            >{{ item["menu_name"] }}</label
          >
        </div>
      </div>
      <!-- show-confirm -->
      <button
        @click="showconfirm"
        type="button"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        บันทึกสิทธิการเข้าใช้งาน
      </button>
    </div>
    <div class="lg:ml-3 h-full">
      <div
        class="w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            สิทธิการใช้งานทั้งหมด
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            class="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
    <!-- confirm save acs -->
    <confirmComponent v-if="confirmmodal.showConfirm" @returnConfirm="ConfirmModalReturn" :showSubmitBtn="confirmmodal.showSubmitBtn" :message="confirmmodal.message"/>
    <!-- {{ data_for_sent }} -->
    <!-- {{ CheckBoxRam }} -->
  </div>
</template>

<script setup lang="ts">
// import
import axios from "axios";
import { onMounted, reactive, ref, toRaw } from "vue";
import { apiUrl } from "../services/constant";
import confirmComponent  from "../components/ConfirmComponent.vue";
//
const initial_data = reactive({
  menu: [],
});
// when app create
onMounted(() => {
  axios.get(apiUrl + "/getmenu").then((response) => {
    initial_data.menu = response.data.mainmenu;
  });
});

// menu privi setup
const selected_array: any[] = [];
const CheckBoxRam = ref([]); // check box value
const stupMenu = (menu_id: number) => {
  let checkComplex = false;
  if (selected_array.length == 0) {
    selected_array.push({ id: menu_id, value: CheckBoxRam.value[menu_id - 1] });
  } else {
    for (let item of selected_array) {
      if (item.id != menu_id) {
        checkComplex = false;
      } else {
        checkComplex = true;
        break;
      }
    }
    if (checkComplex) {
      selected_array[menu_id - 1].value = CheckBoxRam.value[menu_id - 1];
    } else {
      selected_array.push({
        id: menu_id,
        value: CheckBoxRam.value[menu_id - 1],
      });
    }
  }
  /* console.log(selected_array); */
};
// save data acs
const data_for_sent = reactive({
  position_name: "",
  menu_privi: "",
  department: "",
});
// about confirm modal
const confirmmodal = reactive ({
  showConfirm: false,
  showSubmitBtn: false,
  message: ""
});
// show confirm modal
const showconfirm = () => {
  let loop = 0
  const lenghtArr = selected_array.length
  /* console.log(lenghtArr) */
  for (let item of selected_array){
    loop += 1
    /* console.log(loop) */
    if (item.value == true){
      if (loop != lenghtArr){
        data_for_sent.menu_privi = data_for_sent.menu_privi + item.id + ","
      }else{
        data_for_sent.menu_privi = data_for_sent.menu_privi + item.id
      }
    }
  }
  if (data_for_sent.position_name != "" && data_for_sent.department != "" && data_for_sent.menu_privi != ""){
    confirmmodal.showConfirm = true;
    confirmmodal.showSubmitBtn = true;
    confirmmodal.message = "ทำการบันทึกสิทธิการเข้าใช้งาน"
  } else {
    confirmmodal.showConfirm = true;
    confirmmodal.showSubmitBtn = false;
    confirmmodal.message = "กรุณากรอกข้อมูลให้ครบด้วยครับ"
  }
  /* confirmmodal.showConfirm = true; */
}
// create permission
const ConfirmModalReturn = (event:boolean) => {
  if(event == false){
    confirmmodal.showConfirm = false
    data_for_sent.menu_privi = ""
  }else{
    axios.post(apiUrl + "/acs/create", data_for_sent).then(response => {
      confirmmodal.message = response.data.message;
      setTimeout(function(){
        confirmmodal.showConfirm = false
        data_for_sent.position_name = ""
        data_for_sent.menu_privi = ""
        data_for_sent.department = ""
        CheckBoxRam.value = []
      },1000)
    })
  }
}
</script>

<template>
  <div class="grid lg:grid-cols-2 grid-cols-1">
    <div
      class="w-full p-6 bg-white border lg:mb-0 mb-2 border-gray-200 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700"
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
        class="bg-white border mb-3 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="ผู้จัดการ, หัวหน้าฝ่ายขาย, ผู้ดูแลระบบ"
        required
      />
      <div class="mb-2 flex items-center">
        <label class="block text-md font-medium mr-2 text-gray-900 dark:text-white">แผนก</label>
        <button type="button" class="text-xs"><i class="bi bi-plus-circle-dotted" @click="initial_data.showDepartment = !initial_data.showDepartment"></i></button>
      </div>
      <select class="mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" v-model="data_for_sent.departmentID">
        <option v-for="(item, index) in initial_data.departmentSelect" :key="index" :value="item['id']">{{ item['department_name'] }}</option>
        <!-- <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option> -->
      </select>
      <!-- <input
        v-model="data_for_sent.department"
        type="text"
        class="bg-white border mb-3 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="แผนก IT, แผนกการเงิน, ฝ่ายขาย"
        required
      /> -->
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
            >{{item["id"] + ". " + item["menu_name"] }}</label
          >
        </div>
      </div>
      <!-- show-confirm -->
      <button
        @click="showconfirm"
        type="button"
        class="inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-slate-700 rounded-md hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        บันทึกสิทธิการเข้าใช้งาน
      </button>
    </div>
    <div class="lg:ml-4 h-full">
      <div
        class="w-full h-full p-6 bg-white border border-gray-200 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            สิทธิการใช้งานทั้งหมด
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          ตารางแสดงสิทธิการใช้งานทั้งหมด
        </p>
        <SearchComponent v-if="isShowSaerch" @returnDataSearch="getDataFromSearchComponent" :pathgetall="initial_data.path_getall" :pathgetsearch="initial_data.path_getSearch"/>
        <div class="overflow-x-auto relative border sm:rounded-md mb-6 mt-3">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-md border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  ชื่อตำแหน่ง
                </th>
                <th scope="col" class="py-3 px-6">
                  <div class="flex items-center">
                    ชื่อแผนก
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                  </div>
                </th>
                <th scope="col" class="py-3 px-6">
                  <div class="flex items-center">
                    เมนูที่สามารถเข้าถึงได้
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                  </div>
                </th>
                <th scope="col" class="py-3 px-6">
                  <span class="sr-only">Edit</span>
                </th>
                </tr>
            </thead>
              <tbody>
                <tr v-for="(item, index) in initial_data.acs_table" :key="index" class="bg-white dark:bg-gray-800 dark:border-gray-700 border-b">
                  <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item['position_name'] }}</th>
                  <td class="py-4 px-6">{{ item['Department']['department_name'] }}</td>
                  <td class="py-4 px-6">{{ item['menu_privi'] }}</td>
                  <td class="py-4 px-6 text-right">
                    <a href="#" class="font-medium text-slate-600 dark:text-slate-500 hover:underline" data-modal-toggle="editPermission" @click="ShowUpdateAcs(item['id'])">แก้ไข</a>
                    /
                    <a href="#" class="font-medium text-slate-600 dark:text-slate-500 hover:underline">ลบ</a>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
    <!-- confirm save acs -->
    <confirmComponent v-if="confirmmodal.showConfirm" @returnConfirm="ConfirmModalReturn" :showSubmitBtn="confirmmodal.showSubmitBtn" :message="confirmmodal.message"/>
    <!-- {{ data_for_sent }} -->
    <!-- {{ CheckBoxRam }} -->
    <!-- edit acs modal -->
    <div id="editPermission" tabindex="-1" v-if="statusAcsEditModal.isShow" class="fixed top-0 left-0 right-0 z-50 bg-opacity-75 bg-black flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
      <div class="relative w-full h-full max-w-2xl md:h-auto">
          <!-- Modal content -->
        <div class="relative bg-white rounded-md shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl mr-2 font-semibold text-gray-900 dark:text-white">
                แก้ไขสิทธิการใช้งาน :
            </h3>
            <h3 class="font-semibold text-xl text-slate-600">{{ dataEdit.position_name }}</h3>
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="statusAcsEditModal.isShow = false">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
            </button>
          </div>
            <!-- Modal body -->
          <div class="p-6">
            <label
              class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >ชื่อตำแหน่ง</label
            >
            <input
              v-model="dataEdit.position_name"
              type="text"
              class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="ผู้จัดการ, หัวหน้าฝ่ายขาย, ผู้ดูแลระบบ"
              required
            />
            <label
              class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >ชื่อแผนก</label
            >
            <select v-model="dataEdit.departmentID" id="countries" class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full px-2.5 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
              <option v-for="(item, index) in initial_data.departmentSelect" :key="index" :value="item['id']">{{ item['department_name'] }}</option>
            </select>
            <label
              class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >เมนูที่สามารถเข้าถึงได้</label
            >
            <input
              v-model="dataEdit.menu_privi"
              type="text"
              class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="1,2,3, .. ,"
              required
            />
          </div>
            <!-- Modal footer -->
          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button type="button" class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="UpdateAcs">ยืนยันการแก้ไข</button>
            <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" @click="statusAcsEditModal.isShow = false">ยกเลิก</button>
          </div>
        </div>
      </div>
    </div>
    <SuccessModal v-if="initial_data.showSuccess"/>
    <ModalComponentVue v-if="initial_data.showDepartment">
      <h2 class="mb-2 text-lg text-center font-normal font-bold text-slate-700 dark:text-gray-400">
        การจัดการแผนก
      </h2>
      <label class="block mb-2 text-md font-medium text-gray-900 dark:text-white">ชื่อแผนก</label>
      <div class="flex items-center mb-3">
        <input
        v-model="departmentData.department_name"
        type="text"
        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-4/5 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="ฝ่ายขาย, การตลาด, IT"
        required
        />
        <button class="items-center border text-white ml-auto py-2 px-7 rounded-md bg-slate-700 hover:bg-slate-800" @click="addNewDepartment">เพิ่ม</button>
      </div>
      <div class="overflow-x-auto relative border rounded-md mb-3">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
            <tr>
              <th scope="col" class="py-3 px-6">
                ID
              </th>
              <th scope="col" class="py-3 px-6">
                ชื่อแผนก
              </th>
              <th scope="col" class="py-3 px-6">
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(item, index) in initial_data.departmentData" class="bg-white dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" class="py-4 px-7 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ item["id"] }}
                  </th>
                  <td class="py-4 px-6 hover">
                    {{ item["department_name"] }}
                  </td>
                  <td class="py-4 px-6">
                    <button class="mr-0 hover:underline" @click="">แก้ไข</button>
                    /
                    <button class="hover:hover:underline" @click="deleteDepartment(item['id'])">ลบ</button>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full flex">
        <button class="ml-auto py-2 px-5 border rounded-md bg-gray-50 hover:bg-gray-100" @click="initial_data.showDepartment = false">ปิด</button>
      </div>
    </ModalComponentVue>
  </div>
</template>

<script setup lang="ts">
// import
import axios from "axios";
import { onMounted, reactive, ref, toRaw } from "vue";
import { apiUrl } from "../services/constant";
import confirmComponent  from "../components/ConfirmComponent.vue";
import SearchComponent from "../components/SearchComponent.vue";
import SuccessModal from "../components/SuccessModal.vue";
import ModalComponentVue from "../components/ModalComponent.vue";
//
const initial_data = reactive({
  menu: [],
  acs_table: [],
  path_getall: "/acs/getAllAcs",
  path_getSearch: "/acs/get",
  showSuccess: false,
  departmentData: [],
  departmentSelect: [],
  showDepartment: false,
});
// when app create
onMounted(() => {
  axios.get(apiUrl + "/getmenu").then((response) => {
    initial_data.menu = response.data.mainmenu;
  });
  axios.get(apiUrl + "/acs/department").then(response => {
    initial_data.departmentSelect = response.data.body;
    initial_data.departmentData = response.data.body;
    /* console.log(initial_data.departmentData); */
  });
  axios.get(apiUrl + "/acs/getAllAcs").then(response => {
    initial_data.acs_table = response.data.body
  })
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
  departmentID: 1
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
  };
  if (data_for_sent.position_name != "" && data_for_sent.menu_privi != ""){
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
        initial_data.showSuccess = true;
      },1000)
      setTimeout(function(){
        initial_data.showSuccess = false;
      },3500);
    })
  }
}
// search component
const getDataFromSearchComponent = (data:any) => {
  initial_data.acs_table = data
}
const isShowSaerch = ref(true);
// edit acs
const statusAcsEditModal = reactive({
  isShow: false
});
const dataEdit = reactive({
  id: 0,
  position_name: "", 
  department: "",
  menu_privi: "",
  departmentID: 0
});
const ShowUpdateAcs = (id:number) => {
  axios.get(apiUrl + "/acs/get/" + id).then(response => {
    dataEdit.id = id;
    dataEdit.position_name = response.data.body[0].position_name;
    dataEdit.department = response.data.body[0].department;
    dataEdit.menu_privi = response.data.body[0].menu_privi;
    dataEdit.departmentID = response.data.body[0].departmentID;
    statusAcsEditModal.isShow = true
    /* console.log(dataEdit.departmentID) */
  });
};
const UpdateAcs = () => {
  axios.patch(apiUrl + "/acs/patch/" + dataEdit.id, dataEdit).then(response => {
    isShowSaerch.value = false;
    setTimeout(function(){
      isShowSaerch.value = true;
      statusAcsEditModal.isShow = false;
      initial_data.showSuccess = true;
    },500);
    setTimeout(function(){
      initial_data.showSuccess = false;
    },3500);
  });
};
// department
const departmentData = reactive({
  department_name: ""
});
const addNewDepartment = () => {
  axios.post(apiUrl + "/acs/department/create", departmentData).then(response => {
    if ( response.data.status == true){
      axios.get(apiUrl + "/acs/department").then(response => {
        initial_data.departmentData = response.data.body;
      });
    }
  });
};
const deleteDepartment = (ID:any) => {
  if (confirm("คุณต้องการลบข้อมูล?") == true){
    axios.delete(apiUrl + "/acs/department/delete/" + ID).then(response => {
      axios.get(apiUrl + "/acs/department").then(response => {
        initial_data.departmentData = response.data.body;
      });
    });
  }else{
    return;
  }
}
</script>
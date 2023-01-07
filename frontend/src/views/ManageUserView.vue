<template>
  <div>
    <div class="bg-white p-6 shadow-md sm:rounded-md border">
      <a href="#">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          การจัดการผู้ใช้
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        คุณสามารถเพิ่มผู้ใช้งาน แก้ไขและลบรายชื่อ
      </p>
      <div class="flex items-center w-full">
        <div class="w-72 mr-3">
          <SearchGobalVue @returnSearch="SearchFilter" placeholder-text="ค้นหารายชื่อผู้ใช้"/>
        </div>
        <DropDownVue :nameDP="'เลือกแผนก'" :path="'/acs/department'" class="mr-3" @returnDP="DepartmentFilterSeleted"/>
        <DropDownPositionVue :nameDP="'ตำแหน่ง'" :path="'/acs/getAllAcs'" @returnDP="PositionFilterSeleted"/>
        <button class="border bg-slate-700 text-white shadow-sm px-5 py-2.5 ml-auto rounded-md text-sm hover:bg-slate-800" @click="initial.isShowAddUserModal = true">
          <i class="bi bi-plus"></i>
          เพิ่มรายชื่อผู้ใช้
        </button>
      </div>
      <div class="overflow-x-auto border-gray-200 relative border mt-3 mb-1 sm:rounded-md">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                User
              </th>
              <th scope="col" class="py-3 px-6">
                Fullname
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  Position
                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  Department
                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  Mobile No.
                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(item, index) in initial.dataTable" :key="index">
              <th v-if="item['Accessmng']" scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <button type="button" class="hover:underline font-semibold text-slate-700">{{ item['username'] }}</button>
              </th>
              <td v-if="item['Accessmng']" class="py-4 px-6">
                {{ item['title'] }}{{ item['fullname'] }} {{ item['lastname'] }}
              </td>
              <td v-if="item['Accessmng']" class="py-4 px-6" >
                {{ item['Accessmng']['position_name'] }}
              </td>
              <td v-if="item['Accessmng']" class="py-4 px-6">
                {{ item['Accessmng']['Department']['department_name'] }}
              </td>
              <td v-if="item['Accessmng']" class="py-4 px-6">
                {{ item['mobile'] }}
              </td>
              <td v-if="item['Accessmng']" class="py-4 px-6 text-right">
                <a href="#" @click="showEditModal(item['id'])" class="font-medium text-slate-600 dark:text-slate-500 hover:underline">แก้ไข</a>
                /
                <a href="#" @click="showConfirmDeleteModal(item['username'], item['id'])" class="font-medium text-slate-600 dark:text-slate-500 hover:underline">ลบ</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationComponent :count="initial.coutTable" :limit="initial.limitTable" @offset="offsetReturn"/>
    </div>
    <ModalComponentVue v-if="initial.isShowAddUserModal">
      <div class="flex items-center pb-2 border-b mb-5">
        <h3 class="flex items-center font-bold text-slate-800 text-lg">เพิ่มผู้ใช้งาน</h3>
        <button type="button" class="ml-auto py-2 px-3 rounded-md hover:bg-gray-100 " @click="cancelAddModal"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="grid grid-cols-4 mb-3">
        <div class="col-span-2 pl-0">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">ชื่อจริง</label>
          <input v-model="newUser.fullname" type="text" class="py-2 w-full bg-gray-50 text-sm border rounded-md border-gray-300 focus:ring-slate-500 focus:border-slate-500" placeholder="วรพจ" autocomplete="off">
        </div>
        <div class="col-span-2 pl-3">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">นามสกุล</label>
          <input v-model="newUser.lastname" type="text" class="py-2 w-full bg-gray-50 text-sm border rounded-md border-gray-300 focus:ring-slate-500 focus:border-slate-500" placeholder="โมสภา" autocomplete="off">
        </div>
      </div>
      <div class="grid grid-cols-4 mb-3">
        <div class="col-span-2">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">เบอร์ติดต่อ</label>
          <input v-model="newUser.mobile" type="text" class="py-2 w-full bg-gray-50 text-sm border rounded-md border-gray-300 focus:ring-slate-500 focus:border-slate-500" placeholder="08765xxxx" autocomplete="off">
        </div>
        <div class="col-span-2 pl-3">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">ยูสเซอร์เนม</label>
          <input v-model="newUser.username" type="text" class="py-2 w-full bg-gray-50 text-sm border rounded-md border-gray-300 focus:ring-slate-500 focus:border-slate-500" placeholder="aikkiw23" autocomplete="off">
        </div>
      </div>
      <div class="grid grid-cols-4 mb-3">
        <div class="col-span-4">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
          <input v-model="newUser.password" type="password" class="py-2 w-full bg-gray-50 text-sm border rounded-md border-gray-300 focus:ring-slate-500 focus:border-slate-500" placeholder="···········" autocomplete="off">
        </div>
        <!-- <div class="col-span-2 pl-3">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">ยืนยันรหัสผ่าน</label>
          <input v-mode="rePwd" type="password" class="py-2 w-full bg-gray-50 text-sm border rounded-md border-gray-300 focus:ring-slate-500 focus:border-slate-500" placeholder="···········" autocomplete="off">
        </div> -->
      </div>
      <div class="mb-5">
        <label for="countries" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">เลือกตำแหน่ง</label>
        <select v-model="prePrivi" @change="extractPriviAndDepart" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
          <option value="0">เลือกตำแหน่ง</option>
          <option v-for="(item, index) in initial.priviData" :key="index" :value="item['id'] + ',' + item['Department']['id']">{{ item['position_name'] }} <b>แผนก</b> {{ item['Department']['department_name'] }}</option>
        </select>
      </div>
      <label for="countries" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">อัพโหลดรูป</label>
      <div class="flex items-center justify-center w-full mb-3">
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>
      <div class="flex">
        <button @click="createNewUser" type="button" class="ml-auto mr-2 py-2 px-5 border rounded-md bg-slate-700 text-white hover:bg-slate-800 text-sm"><i class="bi bi-plus"></i> เพิ่มผู้ใช้งาน</button>
        <button type="button" class="py-2 px-5 border rounded-md bg-white text-gray-600 hover:bg-gray-100 text-sm" @click="cancelAddModal">ยกเลิก</button>
      </div>
    </ModalComponentVue>
    <ModalComponentVue v-if="initial.showUpdateModal">
      <div class="flex items-center pb-2 border-b mb-5">
        <h3 class="flex items-center font-bold text-slate-800 text-lg">เพิ่มผู้ใช้งาน</h3>
        <button type="button" class="ml-auto py-2 px-3 rounded-md hover:bg-gray-100 " @click="closeUpdate"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="grid grid-cols-4 mb-3">
        <div class="col-span-2 pl-0">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">ชื่อจริง</label>
          <input v-model="newUser.fullname" type="text" class="py-2 w-full bg-gray-50 text-sm border rounded-md border-gray-300 focus:ring-slate-500 focus:border-slate-500" placeholder="วรพจ" autocomplete="off">
        </div>
        <div class="col-span-2 pl-3">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">นามสกุล</label>
          <input v-model="newUser.lastname" type="text" class="py-2 w-full bg-gray-50 text-sm border rounded-md border-gray-300 focus:ring-slate-500 focus:border-slate-500" placeholder="โมสภา" autocomplete="off">
        </div>
      </div>
      <div class="grid grid-cols-4 mb-3">
        <div class="col-span-2">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">เบอร์ติดต่อ</label>
          <input v-model="newUser.mobile" type="text" class="py-2 w-full bg-gray-50 text-sm border rounded-md border-gray-300 focus:ring-slate-500 focus:border-slate-500" placeholder="08765xxxx" autocomplete="off">
        </div>
        <div class="col-span-2 pl-3">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">ยูสเซอร์เนม</label>
          <input v-model="newUser.username" type="text" class="py-2 w-full bg-gray-50 text-sm border rounded-md border-gray-300 focus:ring-slate-500 focus:border-slate-500" placeholder="aikkiw23" autocomplete="off">
        </div>
      </div>
      <div class="grid grid-cols-4 mb-3">
        <div class="col-span-4">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
          <input v-model="newUser.password" type="password" class="py-2 w-full bg-gray-50 text-sm border rounded-md border-gray-300 focus:ring-slate-500 focus:border-slate-500" placeholder="···········" autocomplete="off">
        </div>
      </div>
      <div class="mb-5">
        <label for="countries" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">เลือกตำแหน่ง</label>
        <select v-model="prePrivi" @change="extractPriviAndDepart" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
          <option value="0">เลือกตำแหน่ง</option>
          <option v-for="(item, index) in initial.priviData" :key="index" :value="item['id'] + ',' + item['Department']['id']">{{ item['position_name'] }} <b>แผนก</b> {{ item['Department']['department_name'] }}</option>
        </select>
      </div>
      <label for="countries" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">อัพโหลดรูป</label>
      <div class="flex items-center justify-center w-full mb-3">
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>
      <div class="flex">
        <button @click="updateUser" type="button" class="ml-auto mr-2 py-2 px-5 border rounded-md bg-slate-700 text-white hover:bg-slate-800 text-sm">บันทึก</button>
        <button type="button" class="py-2 px-5 border rounded-md bg-white text-gray-600 hover:bg-gray-100 text-sm" @click="closeUpdate">ยกเลิก</button>
      </div>
    </ModalComponentVue>
    <ModalMd v-if="initial.checkFormAdd">
      <h2 class="text-center text-lg font-semibold mt-5 mb-6 text-slate3-600">กรุณากรอกข้อมูลให้ครบด้วยครับ</h2>
      <div class="w-full flex justify-center mb-0">
        <button class="px-4 border bg-white rounded-md py-2.5 hover:bg-gray-100" @click="initial.checkFormAdd = false">ปิด</button>
      </div>
    </ModalMd>
    <SuccessModalVue v-if="initial.successAddNewModal"/>
    <ConfirmComponentVue v-if="initial.showConfirm" @returnConfirm="ConfirmModalReturn" :showSubmitBtn="true" :message="initial.messageConfirm"/>
    <ConfirmComponentVue v-if="initial.showDeleteConfirm" @returnConfirm="confirmDeleteReturn" :show-submit-btn="true" :message="initial.messageConfirm"/>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue"
import DropDownVue from "../components/DropDown.vue";
import SearchGobalVue from "../components/SearchGobal.vue";
import PaginationComponent from "../components/PaginationComponent.vue"
import axios from "axios";
import { apiUrl } from "../services/constant";
import ModalComponentVue from "../components/ModalComponent.vue";
import SuccessModalVue from "../components/SuccessModal.vue";
import ModalMd from "../components/ModalMd.vue";
import ConfirmComponentVue from "../components/ConfirmComponent.vue";
import DropDownPositionVue from "../components/DropDownPosition.vue";

const initial = reactive({
  dataTable: [],
  isShowAddUserModal: false,
  priviData: [],
  successAddNewModal: false,
  checkFormAdd: false,
  showConfirm: false,
  messageConfirm: "",
  showDeleteConfirm: false,
  showUpdateModal: false,
  coutTable: 0,
  limitTable: 10,
  offset: 0,
  pathTable: apiUrl + "/user/10/"
});

onMounted(() => {
  axios.get(initial.pathTable + 0).then(response => {
    initial.dataTable = response.data.body
    initial.coutTable = response.data.count
    console.log(initial.dataTable)
  });
  axios.get(apiUrl + "/acs/getAllAcs").then(response => {
    initial.priviData = response.data.body
  });
});

const isShow = ref(false)
// add new user
const rePwd = ref("");
const prePrivi = ref("0");
const extractPriviAndDepart = () => {
  let extract = prePrivi.value.split(",");
  newUser.privi = Number(extract[0]);
  newUser.department = Number(extract[1]);
}
const newUser = reactive({
  username: "",
  password: "",
  title: "คุณ",
  fullname: "",
  lastname: "",
  nickname: "",
  mobile: "",
  privi: 0,
  email: "no",
  token: "",
  image: "",
  department: 0
});
// set new default
const setNewUsrDefualt = () => {
  newUser.username = "";
  newUser.password = "";
  newUser.fullname = "";
  newUser.lastname = "";
  newUser.mobile = "";
  newUser.privi = 0;
  newUser.image = "";
  newUser.department = 0;
  prePrivi.value = ""
};
// cancel add new user modal
const cancelAddModal = () => {
  initial.isShowAddUserModal = false;
  setNewUsrDefualt();
};
// create user
const createNewUser = () => {
  if( newUser.username == "" || newUser.password == "" || newUser.fullname == "" || newUser.lastname == "" || newUser.mobile == "" || newUser.privi == 0){
    /* initial.isShowAddUserModal = false; */
    initial.checkFormAdd = true;
  }else{
    initial.messageConfirm = "ยืนยันการเพิ่มผู้ใช้"
    initial.showConfirm = true;
  }
};
const ConfirmModalReturn = (event:boolean) => {
  if(event){
    axios.post(apiUrl + "/user/create", newUser).then(response => {
      if (response.data.status == true){
        axios.get(initial.pathTable + 0).then(response => {
          initial.dataTable = response.data.body;
        });
        setTimeout(function(){
          initial.showConfirm = false;
          initial.isShowAddUserModal = false;
          initial.successAddNewModal = true;
        },1000);
        setTimeout(function(){
          initial.successAddNewModal = false;
          setNewUsrDefualt()
        },2300);
      }
    });
  }if(event == false){
    /* console.log("tan") */
    initial.showConfirm = false;
  }
}
const userID = ref(0);
const showConfirmDeleteModal = (username:string, ID:number) => {
  initial.messageConfirm = "คุณต้องการลบ " + username + " ใช่หรือไม่"
  userID.value = ID
  initial.showDeleteConfirm = true
};
const confirmDeleteReturn = (event:boolean) => {
  if(event){
    initial.showDeleteConfirm = false
    axios.delete(apiUrl + "/user/delete/" + userID.value).then(response => {
      if( response.data.status == true){
        axios.get(apiUrl + "/user/" + initial.limitTable + "/" + "0").then(response => {
          initial.dataTable = response.data.body
        });
        initial.successAddNewModal = true;
        setTimeout(function(){
          initial.successAddNewModal = false;
        },2300);
      };
    });
  }else{
    initial.showDeleteConfirm = false
  }
};
// edit modal
const showEditModal = (id:number) => {
  userID.value = id
  axios.get(apiUrl + "/user/" + id).then(response => {
    newUser.username = response.data.body.username;
    newUser.password = response.data.body.password;
    newUser.fullname = response.data.body.fullname;
    newUser.lastname = response.data.body.lastname;
    newUser.mobile = response.data.body.mobile;
    newUser.privi = response.data.body.privi;
    newUser.image = "";
    prePrivi.value = response.data.body.privi + "," + response.data.body.department
  });
  initial.showUpdateModal = true;
};
const closeUpdate = () => {
  setNewUsrDefualt();
  initial.showUpdateModal = false
};
const updateUser = () => {
  axios.patch(apiUrl + "/user/update/" + userID.value, newUser).then(response => {
    if(response.data.status == true){
      initial.successAddNewModal = true;
      initial.showUpdateModal = false;
        setTimeout(function(){
          initial.successAddNewModal = false;
          setNewUsrDefualt();
        },2300);
    }else{
      return;
    }
  });
};
// pagination 
const offsetReturn = (event:number) => {
  initial.offset = event;
  axios.get(initial.pathTable + event).then(response => {
    initial.dataTable = response.data.body
    initial.coutTable = response.data.count
  })
};
// filter by department
const DepartmentFilterSeleted = (event:number) => {
  /* console.log(event) */
  initial.offset = 0
  initial.pathTable = apiUrl + "/user/department/" + event + "/0/" + initial.limitTable + "/0" + '/';
  axios.get(initial.pathTable + initial.offset).then(response => {
    console.log(response.data.count)
    initial.dataTable = response.data.body
    initial.coutTable = response.data.count
  });
};
// filter by position
const PositionFilterSeleted = (event:number) => {
  initial.offset = 0
  initial.pathTable = apiUrl + "/user/department/" + "0/" + event + "/" + initial.limitTable + "/0" + "/";
  axios.get(initial.pathTable + initial.offset).then(response => {
    initial.dataTable = response.data.body
    initial.coutTable = response.data.count
  });
};
const SearchFilter = (event:string) => {
  if (event == "" || null){
    initial.offset = 0
    initial.pathTable = apiUrl + "/user/10/";
    axios.get(initial.pathTable + initial.offset).then(response => {
      initial.dataTable = response.data.body
      initial.coutTable = response.data.count
    });
    return;
  }
  initial.offset = 0
  initial.pathTable = apiUrl + "/user/department/" + "0/" + "0" + "/" + initial.limitTable + "/" + event + "/";
  axios.get(initial.pathTable + initial.offset).then(response => {
    initial.dataTable = response.data.body
    initial.coutTable = response.data.count
  });
};
</script>
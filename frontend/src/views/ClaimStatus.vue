<template>
  <div>
    <div class="bg-white p-6 shadow-md sm:rounded-md border">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ติดตามข้อมูลสถานะ</h5>
      <p class="mb-5 font-normal text-gray-700 dark:text-gray-400">สร้างรหัสเคลมตาม บันทึกและแก้ไขข้อมูล</p>
      <div>
        <div class="flex items-center mb-3">
          <div class="w-96 mr-3">
            <SearchGobalVue placeholderText="ค้นหารหัสเคลม, วันที่, บริษัทประกันภัย, พนักงานรับแจ้ง" @returnSearch="Returnsearch"/>
          </div>
          <DropdownCompany nameDP="เลือกบริษัท" path="/company" @returnDP="ReturnDroupdown"/>
          <!-- <DatePickerComponentVue class="ml-auto"/> -->
          <!-- <button class="py-2 px-4 border ml-auto border-gray-300 rounded-md text-white bg-slate-600 hover:bg-slate-700" @click="gotoPage">+ ออกเลขการทำเคลม</button> -->
        </div>
        <div class="relative overflow-x-auto rounded-md overflow-hidden border">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-md text-gray-700 border-b uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">หมายเลขเซอเวย์</th>
                <th scope="col" class="px-6 py-3">บริษัทประกันภัย</th>
                <th scope="col" class="px-6 py-3">พนักงานรับแจ้ง</th>
                <th scope="col" class="px-6 py-3">เจ้าหน้าที่ตรวจสอบอุบัติเหตุ</th>
                <th scope="col" class="px-6 py-3">วันที่ (ปี-เดือน-วัน)</th>
                <th scope="col" class="px-6 py-3">เวลารับเรื่อง</th>
                <th scope="col" class="px-6 py-3">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in initial.dataTable" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <button @click="ResultModal(item['svh_code'])" class="font-semibold hover:underline text-slate-600">{{ item['svh_code'] }}</button>
                </th>
                <td class="px-6 py-4">
                  {{ item['company'] }}
                </td>
                <td class="px-6 py-4">
                  {{ item['employee'] }}
                </td>
                <td class="px-6 py-4">
                  {{ item['Inspector'] }}
                </td>
                <td class="px-6 py-4">
                  {{ item['date'] }}
                </td>
                <td class="px-6 py-4">
                  {{ item['time'] }}
                </td>
                <td class="px-6 py-4">
                  <button @click="ShowEditModal(item['svh_code'])" class="hover:underline">แก้ไข</button> /
                  <button @click="ShowSubModal(item['svh_code'])" class="hover:underline">เคลมตาม</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PaginationComponentVue :count="initial.countData" :limit="initial.limit" @offset="returnPagination" />
      </div>
    </div>
    <ModalResultClaimVue v-if="initial.modalResult.isShow" :svh_code="initial.modalResult.svh_code" @isShow="ControlResultModal"/>
    <ModalSubclaimVue :svh_code="initial.SubClaim.svh_code" v-if="initial.SubClaim.isShow" @is-show="ControlSubModal"/>
    <ModalClaimEditVue v-if="initial.EditModal.isShow" :svh_code="initial.EditModal.svh_code" @is-show="ControlEditModal"/>
  </div>
</template>

<script setup lang="ts">
// import component
import ModalClaimEditVue from '../components/modal/ModalClaimEdit.vue';
import SearchGobalVue from '../components/SearchGobal.vue';
import DropdownCompany from '../components/dropdown/DropdownCompany.vue';
import PaginationComponentVue from '../components/PaginationComponent.vue';
import ModalResultClaimVue from '../components/modal/ModalResultClaim.vue';
import ModalSubclaimVue from '../components/modal/ModalSubclaim.vue';
// import other
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { apiUrl } from '../services/constant';
const initial = reactive({
 dataTable: [],
 offset: 0,
 countData: 0,
 currentPath: "",
 limit: 10,
 filter: {
    search: "",
    dateSelected: "",
    companySelected: ""
  },
  modalResult:{
    isShow: false,
    svh_code: ""
  },
  SubClaim:{
    isShow: false,
    svh_code: ""
  },
  EditModal:{
    isShow: false,
    svh_code: ""
  }
});
const getFirstDataTable = () => {
  initial.currentPath = apiUrl + '/claim/';
  axios.get(initial.currentPath + initial.offset).then(response => {
    initial.dataTable = response.data.body.rows;
    initial.countData = response.data.body.count;
  });
};
onMounted(() => {
  getFirstDataTable();
});
// pagination return
const returnPagination = (event:number) => {
  axios.get(initial.currentPath + event).then(response => {
    initial.dataTable = response.data.body.rows;
    initial.countData = response.data.body.count;
  });
};
// filter methond
const filter = () => {
  initial.currentPath = apiUrl + '/claim/filter/';
  axios.post(initial.currentPath + initial.offset, initial.filter).then(response =>{
    initial.dataTable = response.data.body.rows;
    initial.countData = response.data.body.count;
  });
};
// Return search
let timeout:any = null
const Returnsearch = (event:string) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    initial.filter.search = event;
    initial.offset = 0;
    filter();
  }, 1000);
};
// Return DP
const ReturnDroupdown = (event:string) => {
  initial.filter.companySelected = event;
  filter();
}
// Show result modal
const ResultModal = (svhcode:string) => {
  initial.modalResult.svh_code = svhcode;
  initial.modalResult.isShow = true;
};
const ControlResultModal = (event:boolean) => {
  getFirstDataTable();
  initial.modalResult.isShow = event;
};
const ControlSubModal = (event:boolean) => {
  getFirstDataTable();
  initial.SubClaim.isShow = event;
};
const ControlEditModal = (event:boolean) => {
  getFirstDataTable();
  initial.EditModal.isShow = event;
}
const ShowSubModal = (svhcode:string) => {
  initial.SubClaim.isShow = true,
  initial.SubClaim.svh_code = svhcode
};
const ShowEditModal = (svhcode:string) => {
  initial.EditModal.isShow = true,
  initial.EditModal.svh_code = svhcode
};
</script>
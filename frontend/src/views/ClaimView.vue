<template>
  <div>
    <div class="bg-white p-6 shadow-md sm:rounded-md border">
      <h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">ออกเลขการทำเคลม</h5>
      <p class="mb-5 font-normal text-gray-700 dark:text-gray-400">สร้างรหัสเคลม และบันทึกข้อมูล</p>
      <div class="p-6 border rounded-md mb-3">
        <div class="grid lg:grid-cols-2 mb-2 grid-cols-1 gap-4">
          <div>
            <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">วันที่รับแจ้ง</label>
            <DatePickerComponent @returnDate="setDate" />
          </div>
          <div>
            <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">เวลารับแจ้ง</label>
            <input v-model="initial.claimModel.time" type="text" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="10:10">
          </div>
        </div>
        <div class="grid gird-cols-1 mb-2">
          <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">บริษัทประกันภัย</label>
          <select v-model="initial.claimModel.company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
            <option value="">เลือกบริษัทประกันภัย</option>
            <option v-for="(item, index) in initial.company" :key="index" :value="item['company_name']" >{{ item['company_name'] }}</option>
          </select>
        </div>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-2">
          <div>
            <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">ประเภทเคลม</label>
            <select v-model="initial.claimModel.type" @change="checkShowDrt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
              <option value="">เลือกประเถทการเคลม</option>
              <option value="เคลมสด">เคลมสด</option>
              <option value="เคลมแห้ง">เคลมแห้ง</option>
              <option value="ติดตามผลคดี">ติดตามผลคดี</option>
            </select>
          </div>
          <div>
            <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">จ่ายงานโดย</label>
            <input v-model="initial.claimModel.source_employee" type="text" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="คุณ...">
          </div>
        </div>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-2" v-if="initial.showDry">
          <div>
            <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">วันนัดหมาย</label>
            <input v-model="initial.claimModel.date_dry" type="text" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="วันที่ 10 มกราคม 2565">
          </div>
          <div>
            <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">เวลา</label>
            <input v-model="initial.claimModel.time_dry" type="text" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="10:10 น.">
          </div>
        </div>
        <div class="grid grid-cols-1 mb-2">
          <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">สถานที่เกิดเหตุ</label>
          <input v-model="initial.claimModel.location" type="text" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="อ.เมือง จ.เชียงใหม่">
        </div>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-2">
          <div>
            <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">ลักษณะอุบัติเหตุ</label>
            <input v-model="initial.claimModel.accident" type="text" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="ประกัน...">
          </div>
          <div>
            <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">พนักงานรับแจ้ง</label>
            <select v-model="initial.employeePre" @change="setEmployee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
              <option value="">เลือกพนักงาน</option>
              <option v-for="(item, index) in initial.employeeData" :key="index" :value="item['fullname'] + '/' + item['id']">{{ item['fullname'] }}</option>
            </select>
          </div>
        </div>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-2">
          <div>
            <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">เจ้าหน้าที่ตรวจสอบอุบัติเหตุ</label>
            <select v-model="initial.inspectorPre" @change="setInspector" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
              <option value="">เลือกเจ้าหน้าที่</option>
              <option v-for="(item, index) in initial.inspectorData" :key="index" :value="`${item['id']}/${item['mobile']}/${item['title']}${item['fullname']} ${item['lastname']}`">{{ item['title'] + item['fullname'] }} {{ item['lastname'] }}</option>
            </select>
          </div>
          <div>
            <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white">เบอร์ติดต่อ</label>
            <input v-model="initial.claimModel.inspector_mobile" type="text" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" readonly>
          </div>
        </div>
      </div>
      <div class="flex">
        <button @click="checkForm" class="ml-auto border px-6 py-2.5 rounded-md mr-3 bg-slate-600 text-white hover:bg-slate-700">ออกเลขการทำเคลม</button>
        <button @click="setClaimDefault" class="border px-6 py-2.5 rounded-md shadow-sm hover:bg-gray-50">รีเซ็ตค่า</button>
      </div>
    </div>
  </div>
  <!-- {{ initial.claimModel }} -->
  <ModalConfirmVue :message="initial.modalConfirm.message" v-if="initial.modalConfirm.isShow" @isShow="controlConfirmModal" @submitState="confirmState"/>
  <ModalMessageVue message="กรุณากรอกข้อมูลให้ครบด้วยนะครับ" v-if="initial.modalMessage.isShow" @isShow="controlMessageModal" />
  <ModalResultClaim v-if="initial.modalResult.isShow" :svh_code="initial.claimModel.svh_code" @isShow="controlResultModal" />
  <!-- <ModalResultClaim svh_code="SVH01473"/> -->
</template>

<script setup lang="ts">
import axios from 'axios';
import { reactive, ref, onMounted } from 'vue';
import DatePickerComponent from '../components/DatePickerComponent.vue';
import { apiUrl } from '../services/constant';
import ModalMessageVue from "../components/modal/ModalMessage.vue";
import ModalConfirmVue from "../components/modal/ModalConfirm.vue";
import ModalResultClaim from "../components/modal/ModalResultClaim.vue";
import ModalSubclaimVue from '../components/modal/ModalSubclaim.vue';

onMounted(() => {
  runTime();
  setInterval(runTime, 60000);
  axios.get(apiUrl + "/company").then(response => {
    initial.company = response.data.body;
  });
  axios.get(apiUrl + "/user/filter/privi/8").then(response => {
    initial.employeeData = response.data.body;
  });
  axios.get(apiUrl + "/user/filter/privi/9").then(response => {
    initial.inspectorData = response.data.body;
  });
});

const initial = reactive({
  claimModel: {
    date:"",
    time:"",
    company:"",
    type:"",
    source_employee:"",
    location:"",
    accident:"",
    employee:"",
    employee_id: 0,
    Inspector:"",
    inspector_id: 0,
    inspector_mobile:"",
    svh_code:"",
    time_dry:"",
    date_dry:"", 
    province:0,
    district:0,
    brand_car:"",
    customer_claim_mobile:"",
    customer_claim_name:"",
    license_plate:"",
    claim_code: "",
    insurance_code: ""
  },
  // modal message
  modalMessage: {
    isShow: false,
    message: ""
  },
  // modal confirm
  modalConfirm: {
    isShow: false,
    btnSubmit: false,
    message: "ยืนยันการทำรายการ"
  },
  // modal result
  modalResult:{
    isShow: false
  },
  // load selected employee
  employeeData: [],
  inspectorData: [],
  province: [],
  district: [],
  company: [],
  showDry: false,
  inspectorPre: "",
  employeePre: "",
});
//
// set claim model to default
const setClaimDefault = () => {
  initial.claimModel.company = "";
  initial.claimModel.type = "";
  initial.claimModel.source_employee = "";
  initial.claimModel.location = "";
  initial.claimModel.accident = "";
  initial.claimModel.employee = "";
  initial.claimModel.employee_id = 0;
  initial.claimModel.Inspector = "";
  initial.claimModel.inspector_id = 0;
  initial.claimModel.inspector_mobile = "";
  initial.claimModel.svh_code = "";
  initial.claimModel.time_dry = "";
  initial.claimModel.date_dry = "";
  initial.claimModel.province = 0;
  initial.claimModel.district = 0;
  initial.claimModel.brand_car = "";
  initial.claimModel.customer_claim_mobile = "";
  initial.claimModel.customer_claim_name = "";
  initial.claimModel.license_plate = "";
};
// set Date
const setDate = (event:string) => {
  initial.claimModel.date = event;
  /* console.log(initial.claimModel.date) */
}
// set time update
const runTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let hourSend = "" + hour;
  let minSend = "" + min;
  if (hourSend.length <= 1){
    hourSend = "0" + hourSend;
  };
  if (minSend.length <= 1){
    minSend = "0" + minSend;
  };
  initial.claimModel.time = `${hourSend}:${minSend}`;
};
// check show dry
const checkShowDrt = () => {
  if(initial.claimModel.type == "เคลมสด" || initial.claimModel.type == ""){
    initial.showDry = false;
  }else{
    initial.showDry = true;
  }
};
// set employee data send
const setEmployee = () => {
  const splitData = initial.employeePre.split("/");
  initial.claimModel.employee = splitData[0]
  initial.claimModel.employee_id = Number(splitData[1])
};
// set inspector data send
const setInspector = () => {
  const splitdata = initial.inspectorPre.split("/");
  initial.claimModel.Inspector = splitdata[2];
  initial.claimModel.inspector_id = Number(splitdata[0]);
  initial.claimModel.inspector_mobile = splitdata[1];
};
// checkForm
const checkForm = () => {
  if(initial.claimModel.company == "" || 
  initial.claimModel.type == "" || 
  initial.claimModel.location == "" || 
  initial.claimModel.accident == "" || 
  initial.claimModel.employee == "" || 
  initial.claimModel.Inspector == "" ||
  initial.claimModel.inspector_id == 0 ||
  initial.claimModel.inspector_mobile == ""){
    initial.modalMessage.isShow = true;
    initial.modalMessage.message = "กรุณากรอกข้อมูลให้ครบด้วยครับ";
  }else{
    initial.modalConfirm.isShow = true;
    initial.modalConfirm.btnSubmit = true;
    initial.modalConfirm.message = "คุณต้องการที่จะออกเลขเคลมใช่หรือไม่?";
  };
};
// close modal
const controlMessageModal = (event:boolean) => {
  initial.modalMessage.isShow = event;
};

const controlConfirmModal = (event:boolean) => {
  initial.modalConfirm.isShow = event;
};

const controlResultModal = (event:boolean) => {
  initial.modalResult.isShow = event;
  setClaimDefault();
};

const confirmState = (event:boolean) => {
  if(event){
    axios.post(apiUrl + "/claim/create", initial.claimModel).then(response => {
      if(response.data.status == true){
        initial.modalConfirm.isShow = false;
        initial.modalResult.isShow = true;
        initial.claimModel.svh_code = response.data.svh_code;
        /* alert(response.data.message); */
      }else{
        initial.modalConfirm.message = response.data.message;
        /* alert(response.data.message); */
        setTimeout(() => {
          setClaimDefault();
          initial.modalConfirm.isShow = false
        },2000)
      }
    });
  }
};

</script>
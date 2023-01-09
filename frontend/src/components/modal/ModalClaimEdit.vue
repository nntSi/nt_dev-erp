<template>
  <!-- <button @click="open = true">Open Modal</button> -->
  <div class="fixed p-4 overflow-x-hidden z-50 overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center w-full bg-opacity-75 bg-black">
    <div class="relative w-full h-full max-w-6xl md:h-auto">
      <div class="relative bg-white rounded-md block shadow dark:bg-gray-700 overflow-hidden">
        <div class="flex items-center border-b bg-gray-50 py-3 px-6">
          <h5 class="text-xl font-bold tracking-tight mr-2 text-slate-700 dark:text-white">แก้ไขข้อมูลเคลม : {{ initial.claimModel.svh_code }}</h5>
          <button @click="closeBtn" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-slate-700 rounded-lg text-sm p-1.5 ml-auto dark:hover:bg-gray-800 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="px-8 pb-6 pt-5">
          <div class="grid lg:grid-cols-12 grid-cols-1 gap-4 mb-2">
            <div class="lg:col-span-2 col-span-5">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">เลขเซอเวย์</label>
              <input v-model="initial.claimModel.svh_code" type="text" class="border bg-gray-50 border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="SVHXXXX">
            </div>
            <div class="col-span-5">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">วันที่รับแจ้ง (ปี-เดือน-วัน)</label>
              <input v-model="initial.claimModel.date" type="text" class="border bg-gray-50 border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="2566-00-00">
            </div>
            <div class="col-span-5">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">เวลา</label>
              <input v-model="initial.claimModel.time" type="text" class="border bg-gray-50 border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="00:00">
            </div>
          </div>
          <div class="grid lg:grid-cols-12 grid-cols-1 gap-4 mb-2">
            <div class="lg:col-span-2 col-span-5">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">พนักงานรับแจ้ง</label>
              <select v-model="initial.employeePre" @change="setEmployee" class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
                <option value="">เลือกพนักงาน</option>
                <option v-for="(item, index) in initial.employeeData" :key="index" :value="item['fullname'] + '/' + item['id']">{{ item['fullname'] }}</option>
              </select>
            </div>
            <div class="col-span-5">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">เจ้าหน้าที่ตรวจสอบอุบัติเหตุ</label>
              <select select v-model="initial.inspectorPre" @change="setInspector" class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
                <option value="">เลือกเจ้าหน้าที่</option>
                <option v-for="(item, index) in initial.inspectorData" :key="index" :value="`${item['id']}/${item['mobile']}/${item['title']}${item['fullname']} ${item['lastname']}`">{{ item['title'] + item['fullname'] }} {{ item['lastname'] }}</option>
              </select>
            </div>
            <div class="col-span-5">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">เบอร์ติดต่อ</label>
              <input v-model="initial.claimModel.inspector_mobile" type="text" class="border bg-gray-50 border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" readonly>
            </div>
          </div>
          <div class="grid lg:grid-cols-12 grid-cols-1 gap-4 mb-2">
            <div class="col-span-4">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">บริษัทประกันภัย</label>
              <select v-model="initial.claimModel.company" class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
                <option value="">เลือกบริษัทประกันภัย</option>
                <option v-for="(item, index) in initial.company" :key="index" :value="item['company_name']" >{{ item['company_name'] }}</option>
              </select>              
            </div>
            <div class="col-span-3">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">จ่ายงานโดย</label>
              <input v-model="initial.claimModel.source_employee" type="text" class="border bg-gray-50 border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="คุณ...">
            </div>
            <div class="col-span-5">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">ประเภทเคลม</label>
              <select v-model="initial.claimModel.type" class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
                <option value="">เลือกประเถทการเคลม</option>
                <option value="เคลมสด">เคลมสด</option>
                <option value="เคลมแห้ง">เคลมแห้ง</option>
                <option value="ติดตามผลคดี">ติดตามผลคดี</option>
                <option value="เคลมนัดหมาย">เคลมนัดหมาย</option>
              </select>
            </div>
          </div>
          <div class="grid lg:grid-cols-12 grid-cols-1 gap-4 mb-0">
            <div class="col-span-7">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">สถานที่เกิดเหตุ</label>
              <input v-model="initial.claimModel.location" type="text" class="border bg-gray-50 border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="อ.เมือง จ.เชียงใหม่">
            </div>
            <div class="col-span-2">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">จังหวัด</label>
              <select v-model="initial.claimModel.province" @change="showDistrict" class="bg-gray-50 border border-gray-300 text-slate-700 mb-2 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
                <option value="0">เลือกจังหวัด</option>
                <option v-for="item in initial.province" :value="item['id']">{{ item['province_name'] }}</option>
              </select>
            </div>
            <div class="col-span-3">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">อำเภอ</label>
              <select v-model="initial.claimModel.district" class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
                <option value="0">เลือกอำเภอ</option>
                <option v-for="item in initial.district" :value="item['id']">{{ item['district_name'] }}</option>
              </select>
            </div>
          </div>
          <div class="grid lg:grid-cols-12 grid-cols-1 gap-4">
            <div class="col-span-4">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">วันนัดหมาย</label>
              <input v-model="initial.claimModel.date_dry" type="text" class="border bg-gray-50 border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="วันที่ 10 มกราคม 2565">
            </div>
            <div class="col-span-2">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">เวลา</label>
              <input v-model="initial.claimModel.time_dry" type="text" class="border bg-gray-50 border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="00:00">
            </div>
            <div class="col-span-3">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">ชื่อผู้เอาประกัน</label>
              <input v-model="initial.claimModel.customer_claim_name" type="text" class="border mb-2 bg-gray-50 border-gray-300 text-slate-700 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="คุณ...">
            </div>
            <div class="col-span-3">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">เบอร์ติดต่อผู้เอาประกัน หรือผู้ขับขี่</label>
              <input v-model="initial.claimModel.customer_claim_mobile" type="text" class="border mb-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="097xxx">
            </div>
          </div>
          <div class="grid lg:grid-cols-12 grid-cols-1 gap-4 mb-2">
            <div class="col-span-6">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">ยี่ห้อรถ</label>
              <input v-model="initial.claimModel.brand_car" type="text" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="">
            </div>
            <div class="col-span-6">
              <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">ทะเบียนรถ</label>
              <input v-model="initial.claimModel.license_plate" type="text" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="">
            </div>
          </div>
          <div class="grid lg:grid-cols-12 grid-cols-1 gap-4 mb-5">
            <div class="col-span-6">
              <label class="block text-md font-bold text-slate-700 dark:text-white">เลขรับแจ้ง หรือเลขเคลม</label>
              <input v-model="initial.claimModel.claim_code" type="text" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="กรอกรหัสเคลม">
            </div>
            <div class="col-span-6">
              <label class="block text-md font-bold text-slate-700 dark:text-white">เลขกรมธรรม์</label>
              <input v-model="initial.claimModel.insurance_code" type="text" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="กรอกเลขกรมธรรม์">
            </div>
          </div>
          <div class="flex items-center">
            <button @click="updateClaimAndDownload" type="button" class="py-2 text-sm px-4 border mr-2 ml-auto border-yellow-300 rounded-md bg-yellow-300 hover:bg-amber-300 hover:border-amber-300 font-semibold"><i class="bi bi-file-earmark-word-fill mr-2"></i>บันทึกและพิมพ์ไฟล์</button>
            <button @click="updateData" class="py-2 px-5 border rounded-md mr-2 text-white text-sm bg-slate-600 hover:bg-slate-700">บันทึกข้อมูล</button>
            <button @click="closeBtn" class="py-2 px-5 border text-sm bg-gray-50 hover:bg-gray-100 rounded-md font-semibold">ปิด</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { downLoadClaim } from '../../file_saver/docx/claim';
import axios from 'axios';
import { apiUrl } from '../../services/constant';
import { defineComponent, reactive, onMounted } from 'vue';
export default defineComponent({
  emits: ["isShow"],
  props: ['svh_code'],
  setup(props,  {emit}) {
    onMounted(() => {
      loadDataDefualt();
    });

    const loadDataDefualt = () => {
      axios.get(apiUrl + "/claim/svhcode/" + props.svh_code).then(response => {
        initial.claimModel.time = response.data.body[0].time
        initial.claimModel.company = response.data.body[0].company
        initial.claimModel.type = response.data.body[0].type
        initial.claimModel.source_employee = response.data.body[0].source_employee
        initial.claimModel.location = response.data.body[0].location
        initial.claimModel.accident = response.data.body[0].accident
        initial.claimModel.employee = response.data.body[0].employee
        initial.claimModel.employee_id = response.data.body[0].employee_id
        initial.claimModel.Inspector = response.data.body[0].Inspector
        initial.claimModel.inspector_id = response.data.body[0].inspector_id
        initial.claimModel.inspector_mobile= response.data.body[0].inspector_mobile
        initial.claimModel.svh_code = response.data.body[0].svh_code
        initial.claimModel.time_dry = response.data.body[0].time_dry
        initial.claimModel.date_dry = response.data.body[0].date_dry
        initial.claimModel.province = response.data.body[0].province
        initial.claimModel.district = response.data.body[0].district
        initial.claimModel.brand_car = response.data.body[0].brand_car
        initial.claimModel.customer_claim_mobile = response.data.body[0].customer_claim_mobile
        initial.claimModel.customer_claim_name = response.data.body[0].customer_claim_name
        initial.claimModel.license_plate = response.data.body[0].license_plate
        initial.claimModel.claim_code = response.data.body[0].claim_code
        initial.claimModel.insurance_code = response.data.body[0].insurance_code
        initial.sub_claim = response.data.body[0].Subclaims
        // set data
        initial.employeePre = `${response.data.body[0].employee}/${response.data.body[0].employee_id}`
        initial.inspectorPre = `${response.data.body[0].inspector_id}/${response.data.body[0].inspector_mobile}/${response.data.body[0].Inspector}`
        // show date
        const monthThai = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
        initial.claimModel.date = response.data.body[0].date
        let DateArray = response.data.body[0].date.split("-");
        initial.dateThai = `วันที่ ${DateArray[2]} ${monthThai[Number(DateArray[1])-1]} ${DateArray[0]}`;
        /* console.log(initial) */
      }).then(() => {
        axios.get(apiUrl + "/location/province").then(response => {
          initial.province = response.data.body;
        });
      }).then(() => {
        axios.get(apiUrl + "/location/district/province/" + initial.claimModel.province).then(response => {
          initial.district = response.data.body;
        });
      }).then(() => {
        axios.get(apiUrl + "/company").then(response => {
      initial.company = response.data.body;
      });
      axios.get(apiUrl + "/user/filter/privi/8").then(response => {
      initial.employeeData = response.data.body;
      });
      axios.get(apiUrl + "/user/filter/privi/9").then(response => {
        initial.inspectorData = response.data.body;
      });})
    }
    
    const initial = reactive({
      dateThai: "",
      sub_claim: [],
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
    const showDistrict = () => {
      /* console.log(initial.claimModel.province) */
      axios.get(apiUrl + "/location/district/province/" + initial.claimModel.province).then(response => {
        initial.district = response.data.body;
      });
    };
    const closeBtn = () => {
      emit("isShow", false);
      setClaimDefault();
    };
    const setClaimDefault = () => {
      initial.claimModel.date = "";
      initial.claimModel.time = "";
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
      initial.sub_claim = []
    };
    const updateClaimAndDownload = () => {
      if(initial.claimModel.time_dry != "" || initial.claimModel.date_dry != ""){
        initial.claimModel.type = "เคลมแห้ง"
      }
      if(initial.claimModel.province == 0 || initial.claimModel.district == 0 || initial.claimModel.customer_claim_name == "" || initial.claimModel.customer_claim_mobile == ""){
        alert("กรุณากรอกสถานที่เกิดเหตุ, ชื่อผู้เอาประกัน, เบอร์ติดต่อ ด้วยครับ");
      }else{
        axios.patch(apiUrl + "/claim/patch/" + props.svh_code, initial.claimModel).then(response => {
          if(response.data.status == true){
            /* alert("อัพเดทสำเร็จ"); */
            loadDataDefualt();
            downLoadClaim(props.svh_code);
            /* setClaimDefault(); */
            /* emit("isShow", false); */
          }
        });
      }
    };
    const updateData = () => {
      axios.patch(apiUrl + "/claim/patch/" + props.svh_code, initial.claimModel).then(response => {
        if(response.data.status == true){
          /* alert("อัพเดทสำเร็จ"); */
          loadDataDefualt();
          /* downLoadClaim(props.svh_code); */
          /* setClaimDefault(); */
          /* emit("isShow", false); */
        }
      });
    }
    return {
      initial,
      setEmployee,
      setInspector,
      showDistrict,
      closeBtn,
      updateClaimAndDownload,
      updateData
    }
  },
})
</script>
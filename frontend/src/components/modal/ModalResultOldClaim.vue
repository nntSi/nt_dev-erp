<template>
  <div tabindex="-1" class="fixed w-full top-0 left-0 flex justify-center items-center right-0 z-40 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-opacity-75 bg-black">
    <div class="relative w-full h-full max-w-6xl md:h-auto">
      <div class="relative bg-white rounded-lg shadow overflow-hidden dark:bg-gray-700 pb-3">
        <div class="flex items-center px-6 py-4 border-b bg-gray-100 mb-3">
          <h3 class="font-bold text-lg mr-1 text-slate-700">เลขเคลมที่ : </h3>
          <p class="text-lg">{{ initial.claimModel.svh_code }}</p>
          <button @click="closeBtn" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="px-3 pb-3 grid grid-cols-2 gap-3 border-b">
          <div>
            <div class="rounded-md border overflow-hidden mb-3">
              <div class="px-3 py-2 border-b bg-gray-100 mb-1">
                <h1 class="font-bold text-slate-700 text-md ">กลุ่ม Survey Hub อบ.</h1>
              </div>
              <div class="px-3 text-slate-800 pb-3 pt-1 text-md">
                {{ initial.dateThai }} <br>
                <b>รับแจ้งอุบัติเหตุ : </b> {{ initial.claimModel.company }} <br>
                <b>ประเภทเคลม : </b> {{ initial.claimModel.type }} {{ initial.claimModel.date_dry }} {{ initial.claimModel.time_dry }} <br>
                <b>จ่ายงานโดย : </b> {{ initial.claimModel.source_employee }} <br>
                <b>สถานที่ : </b> {{ initial.claimModel.location }} <br>
                <b>ลักษณะ อบ. : </b> {{ initial.claimModel.accident }} <br>
                <b>พนักงานรับแจ้ง : </b> {{ initial.claimModel.employee }} <br>
                <b>เวลารับเรื่อง : </b> {{ initial.claimModel.time }} น.<br>
                <b>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ : </b> {{ initial.claimModel.Inspector }} {{ initial.claimModel.inspector_mobile }}<br>
                <b>เลขเซอร์เวย์ : </b> {{ initial.claimModel.svh_code }} <br>
              </div>
            </div>
            <div class="rounded-md border overflow-hidden ">
              <div class="px-3 py-2 border-b bg-gray-100 mb-1">
                <h1 class="font-bold text-slate-700 text-md">กลุ่มประกัน</h1>
              </div>
              <div class="px-3 text-slate-800 pb-3 pt-1 text-md ">
                {{ initial.dateThai }} <br>
                <b>บริษัทประกันภัย : </b> {{ initial.claimModel.company }} <br>
                <b>วันที่รับแจ้ง : </b> {{ initial.dateThai }} <br>
                <b>ลักษณะ : </b> {{ initial.claimModel.type  }} <br>
                <b>สถานที่ : </b> {{ initial.claimModel.location }} <br>
                <b>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ : </b> {{ initial.claimModel.Inspector }} {{ initial.claimModel.inspector_mobile }} <br>
                <b>เลขเซอร์เวย์ : </b> {{ initial.claimModel.svh_code }} <br>
                <b>{{ initial.claimModel.employee }} ; </b> รับแจ้งฯ
              </div>
            </div>
            <!-- <div>
              <div class="relative overflow-x-auto mt-3 border rounded-md">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase border-b bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-sm text-slate-700">รหัสเคลม</th>
                      <th scope="col" class="px-6 py-3 text-sm text-slate-700">วันนัดหมาย</th>
                      <th scope="col" class="px-6 py-3 text-sm text-slate-700">เวลา</th>
                      <th scope="col" class="px-6 py-3 text-sm text-slate-700"><a href="#" class="hover:underline rounded-md"><i class="bi bi-plus-circle-dotted mr-1"></i>เพิ่มข้อมูล</a></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><a href="#" class="hover:underline">SVH01276-1</a></th>
                      <td class="px-6 py-4">2566/03/01</td>
                      <td class="px-6 py-4">00:11</td>
                      <td class="px-6 py-4"><a type="button" href="#" class="hover:underline">แก้ไข</a> / <a type="button" href="#" class="hover:underline">ลบ</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>  
            </div> -->
          </div>
          <div class="border rounded-md overflow-hidden">
            <div class="px-3 py-2 border-b bg-gray-100 mb-3">
              <h1 class="font-bold text-slate-700 text-md ">ข้อมูลเพิ่มเติม</h1>
            </div>
            <div class="mb-5">
              <div class="px-5">
                <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">จังหวัด</label>
                <select v-model="initial.claimModel.province" @change="showDistrict" class="bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
                  <option value="0">เลือกจังหวัด</option>
                  <option v-for="item in initial.province" :value="item['id']">{{ item['province_name'] }}</option>
                </select>
                <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">อำเภอ</label>
                <select v-model="initial.claimModel.district" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
                  <option value="0">เลือกอำเภอ</option>
                  <option v-for="item in initial.district" :value="item['id']">{{ item['district_name'] }}</option>
                </select>
              </div>
            </div>
            <div>
              <div class="px-3 py-2 border-y bg-gray-100 mb-3">
                <h1 class="font-bold text-slate-700 text-md">เกี่ยวกับผู้เอาประกัน</h1>
              </div>
              <div class="px-5">
                <!-- <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">เลขรับแจ้ง หรือเลขเคลม</label>
                <input v-model="initial.claimModel.claim_code" type="text" class="border mb-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="กรอกรหัสเคลม">
                <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">เลขกรมธรรม์</label>
                <input v-model="initial.claimModel.insurance_code" type="text" class="border mb-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="กรอกเลขกรมธรรม์"> -->
                <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">ชื่อผู้เอาประกัน</label>
                <input v-model="initial.claimModel.customer_claim_name" type="text" class="border mb-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="คุณ...">
                <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">เบอร์ติดต่อผู้เอาประกัน หรือผู้ขับขี่</label>
                <input v-model="initial.claimModel.customer_claim_mobile" type="text" class="border mb-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="097xxx">
                <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">ทะเบียนรถ</label>
                <input v-model="initial.claimModel.license_plate" type="text" class="border mb-2 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="">
                <label class="block mb-2 text-md font-bold text-slate-700 dark:text-white">ยี่ห้อรถ</label>
                <input v-model="initial.claimModel.brand_car" type="text" class="border mb-5 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="">
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 flex items-center px-3">
          <button @click="updateClaim" type="button" class="py-2.5 px-4 border mr-2 ml-auto border-yellow-300 rounded-md bg-yellow-300 hover:bg-amber-300 hover:border-amber-300 font-semibold"><i class="bi bi-file-earmark-word-fill mr-2"></i>บันทึกและพิมพ์ไฟล์</button>
          <!-- <button type="button" class="py-2.5 px-4 border mr-2 border-slate-600 rounded-md bg-slate-600 hover:bg-slate-700 text-white">แก้ไขทั้งหมด</button> -->
          <button @click="closeBtn" type="button" class="py-2.5 px-8 border rounded-md bg-gray-50 hover:bg-gray-100 font-semibold">ปิด</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, reactive, onMounted } from 'vue';
import { apiUrl } from '../../services/constant';
import { downLoadClaim } from '../../file_saver/docx/claim';
export default defineComponent({
  emits:["isShow"],
  props:["svh_code"],
  setup(props, {emit}) {
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
        insurance_code: "",
      },
      province: [],
      district: [],
      dateThai: "",
      sub_claim: []
    });
    onMounted(() => {
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
      })
    });
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
    const updateClaim = () => {
      if(initial.claimModel.province == 0 || initial.claimModel.district == 0 || initial.claimModel.customer_claim_name == "" || initial.claimModel.customer_claim_mobile == ""){
        alert("กรุณากรอกสถานที่เกิดเหตุ, ชื่อผู้เอาประกัน, เบอร์ติดต่อ ด้วยครับ");
      }else{
        axios.patch(apiUrl + "/claim/patch/" + props.svh_code, initial.claimModel).then(response => {
          if(response.data.status == true){
            /* alert("อัพเดทสำเร็จ"); */
            downLoadClaim(props.svh_code);
            /* setClaimDefault(); */
            emit("isShow", false);
          }
        });
      }
    };
    return{
      closeBtn,
      initial,
      showDistrict,
      setClaimDefault,
      updateClaim,
    }
  }
});
</script>
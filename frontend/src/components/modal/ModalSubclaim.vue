<template>
  <div
    tabindex="-1"
    class="fixed w-full top-0 left-0 flex justify-center items-center right-0 z-30 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-opacity-75 bg-black"
  >
    <div class="relative w-full h-full max-w-5xl md:h-auto">
      <div class="bg-white rounded-md shadow dark:bg-gray-700 overflow-hidden">
        <div class="flex items-center border-b bg-gray-50 py-3 px-6">
          <h5
            class="text-xl font-bold tracking-tight mr-2 text-slate-700 dark:text-white"
          >
            {{ svh_code }}
          </h5>
          <button
            @click="closeBtn"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="px-6 py-6">
          <div class="flex mb-6">
            <div>
              <h5 class="text-xl font-bold tracking-tight mr-2 text-gray-900 dark:text-white">การจัดการเคลมตาม, เคลมนัดหมาย
              </h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                เพิ่มเคลมนัดหมาย และดูข้อมูล
              </p>
            </div>
            <div class="ml-auto mt-auto">
              <button
                @click="controlModalStack('open')"
                class="py-2 ml-auto px-10 border rounded-md bg-slate-600 text-white text-sm hover:bg-slate-700"
              >
                + เพิ่มเคลมตาม
              </button>
            </div>
          </div>
          <div class="relative overflow-x-auto border rounded-md mb-5">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-sm text-gray-700 border-b uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">เลขเซอเวย์</th>
                  <th scope="col" class="px-6 py-3">พนักงานรับแจ้ง</th>
                  <th scope="col" class="px-6 py-3">
                    เจ้าหน้าที่ตรวจสอบอุบัติเหตุ
                  </th>
                  <th scope="col" class="px-6 py-3">วันนัดหมาย</th>
                  <th scope="col" class="px-6 py-3">เวลา</th>
                  <th scope="col" class="px-6 py-3">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in initial.dataTable"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <a
                      @click="showResultSubClaim(item['code_sub'])"
                      href="#"
                      class="hover:underline font-semibold"
                      >{{ item["code_sub"] }}</a
                    >
                  </th>
                  <td class="px-6 py-4">
                    {{ item["employee"] }}
                  </td>
                  <td class="px-6 py-4">
                    {{ item["inspector"] }}
                  </td>
                  <td class="px-6 py-4">
                    {{ item["date_dry"] }}
                  </td>
                  <td class="px-6 py-4">
                    {{ item["time_dry"] }}
                  </td>
                  <td class="px-6 py-4">
                    <a @click="getSubCodeForEdit(item['code_sub'])" href="#" class="hover:underline">แก้ไข</a> / 
                    <a
                      @click="showConfirmDeleteSubClaim(item['code_sub'])"
                      href="#"
                      class="hover:underline"
                      >ลบข้อมูล</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex">
            <button
              @click="closeBtn"
              class="py-2 px-5 shadow-sm border rounded-md bg-gray-50 hover:bg-gray-100 text-sm ml-auto"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalStacklg v-if="initial.modalStackShow">
    <div>
      <h5
        class="text-xl font-bold tracking-tight mr-2 text-gray-900 dark:text-white"
      >
        เพิ่มเคลมตาม
      </h5>
      <p
        class="font-normal text-gray-700 dark:text-gray-400 border-b pb-2 mb-2"
      >
        เพิ่มข้อมูลเคลมนัดหมาย
      </p>
      <div class="mb-2">
        <label
          class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
          >พนักงานรับแจ้ง</label
        >
        <select
          v-model="initial.employeePre"
          @change="setEmployee"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
        >
          <option value="">เลือกพนักงาน</option>
          <option
            v-for="(item, index) in initial.employeeData"
            :key="index"
            :value="item['fullname'] + '/' + item['id']"
          >
            {{ item["fullname"] }}
          </option>
        </select>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-2">
        <div>
          <label
            class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
            >เจ้าหน้าที่ตรวจสอบอุบัติเหตุ</label
          >
          <select
            v-model="initial.inspectorPre"
            @change="setInspector"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
          >
            <option value="">เลือกเจ้าหน้าที่</option>
            <option
              v-for="(item, index) in initial.inspectorData"
              :key="index"
              :value="`${item['id']}/${item['mobile']}/${item['title']}${item['fullname']} ${item['lastname']}`"
            >
              {{ item["title"] + item["fullname"] }} {{ item["lastname"] }}
            </option>
          </select>
        </div>
        <div>
          <label
            class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
            >เบอร์ติดต่อ</label
          >
          <input
            v-model="initial.subClaimData.inspector_mobile"
            type="text"
            class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            readonly
          />
        </div>
      </div>
      <div class="grid lg:grid-cols-2 mb-2 grid-cols-1 gap-4">
        <div>
          <label
            class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
            >วันที่รับแจ้ง</label
          >
          <DatePickerComponentVue @returnDate="setDate" />
        </div>
        <div>
          <label
            class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
            >เวลารับแจ้ง</label
          >
          <input
            v-model="initial.subClaimData.time"
            type="text"
            class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="00:00"
          />
        </div>
      </div>
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-2">
        <div>
          <label
            class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
            >วันนัดหมาย(ปี-เดือน-วัน)</label
          >
          <input
            v-model="initial.subClaimData.date_dry"
            type="text"
            class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="XXXX-XX-XX"
          />
        </div>
        <div>
          <label
            class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
            >เวลา</label
          >
          <input
            v-model="initial.subClaimData.time_dry"
            type="text"
            class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="00:00"
          />
        </div>
      </div>
      <div class="mb-2">
        <label
          class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
          >สถานที่</label
        >
        <input
          v-model="initial.subClaimData.location"
          type="text"
          class="mb-2 border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="สถานที่นัดหมาย"
        />
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <label
              class="block mb-2 text-md font-bold text-slate-700 dark:text-white"
              >จังหวัด</label
            >
            <select
              v-model="initial.subClaimData.province"
              @change="showDistrict"
              class="bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
            >
              <option value="0">เลือกจังหวัด</option>
              <option v-for="item in initial.province" :value="item['id']">
                {{ item["province_name"] }}
              </option>
            </select>
          </div>
          <div>
            <label
              class="block mb-2 text-md font-bold text-slate-700 dark:text-white"
              >อำเภอ</label
            >
            <select
              v-model="initial.subClaimData.district"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
            >
              <option value="0">เลือกอำเภอ</option>
              <option v-for="item in initial.district" :value="item['id']">
                {{ item["district_name"] }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex">
        <button
          @click="addnewSubClaim"
          class="px-6 ml-auto mr-3 py-2 border rounded-md bg-slate-600 text-white text-sm hover:bg-slate-700"
        >
          เพิ่มเคลมตาม
        </button>
        <button
          @click="controlModalStack('close')"
          class="px-6 py-2 border rounded-md bg-gray-50 hover:bg-gray-100"
        >
          ปิด
        </button>
      </div>
    </div>
    <!-- {{ initial.subClaimData }} -->
  </ModalStacklg>
  <ModalStackXLVue v-if="initial.modalSubResultShow">
    <div>
      <div>
        <h5
          class="text-xl font-bold tracking-tight mr-2 text-slate-700 dark:text-white"
        >
          ข้อมูลรหัส : {{ initial.claimModel.sub_code }}
        </h5>
        <p
          class="font-normal text-gray-700 dark:text-gray-400 border-b pb-3 mb-5"
        >
          เพิ่มข้อมูลเคลมนัดหมาย
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-3">
        <div class="border rounded-md overflow-hidden">
          <div class="py-2 px-3 bg-gray-50 border-b">
            <h3 class="text-sm font-semibold text-slate-700">
              กลุ่ม SURVEYHUB อบ.
            </h3>
          </div>
          <div class="p-3 text-sm">
            {{ initial.dateThai }} <br />
            <b>รับแจ้งอุบัติเหตุ : </b> {{ initial.claimModel.company }} <br />
            <b>ประเภทเคลม : </b> {{ initial.claimModel.type }}
            {{ initial.claimModel.date_dry }} {{ initial.claimModel.time_dry }}
            <br />
            <b>จ่ายงานโดย : </b> {{ initial.claimModel.source_employee }} <br />
            <b>สถานที่ : </b> {{ initial.claimModel.location }} <br />
            <b>ลักษณะ อบ. : </b> {{ initial.claimModel.accident }} <br />
            <b>พนักงานรับแจ้ง : </b> {{ initial.claimModel.employee }} <br />
            <b>เวลารับเรื่อง : </b> {{ initial.claimModel.time }} น.<br />
            <b>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ : </b>
            {{ initial.claimModel.Inspector }}
            {{ initial.claimModel.inspector_mobile }}<br />
            <b>เลขเซอร์เวย์ : </b> {{ initial.claimModel.sub_code }} <br />
          </div>
        </div>
        <div class="border rounded-md overflow-hidden">
          <div class="py-2 px-3 bg-gray-50 border-b">
            <h3 class="text-sm font-semibold text-slate-700">กลุ่มประกัน</h3>
          </div>
          <div class="p-3 text-sm">
            {{ initial.dateThai }} <br />
            <b>บริษัทประกันภัย : </b> {{ initial.claimModel.company }} <br />
            <b>วันที่รับแจ้ง : </b> {{ initial.dateThai }} <br />
            <b>ลักษณะ : </b> {{ initial.claimModel.type }} <br />
            <b>สถานที่ : </b> {{ initial.claimModel.location }} <br />
            <b>เจ้าหน้าที่ตรวจสอบอุบัติเหตุ : </b>
            {{ initial.claimModel.Inspector }}
            {{ initial.claimModel.inspector_mobile }} <br />
            <b>เลขเซอร์เวย์ : </b> {{ initial.claimModel.sub_code }} <br />
            <b>{{ initial.claimModel.employee }} ; </b> รับแจ้งฯ
          </div>
        </div>
      </div>
      <div class="flex">
        <button @click="downloadDOCXSubClaim" type="button" class="py-2.5 px-4 border mr-2 ml-auto border-yellow-300 rounded-md bg-yellow-300 hover:bg-amber-300 hover:border-amber-300 font-semibold"><i class="bi bi-file-earmark-word-fill mr-2"></i>บันทึกและพิมพ์ไฟล์</button>
        <button @click="closeReultModal" class="border rounded py-2 px-6 bg-gray-50 hover:bg-gray-100 font-semibold text-sm hover:border-gray-300">ปิด</button>
      </div>
    </div>
  </ModalStackXLVue>
  <SuccessModalVue v-if="initial.modalSuccessShow" />
  <ConfirmComponentVue
    v-if="initial.modalConfirm.isShow"
    :show-submit-btn="true"
    :message="initial.modalConfirm.message"
    @return-confirm="returnModalconfirmSubclaim"
  />
  <ModalSubClaimEdit :codesub="initial.modalEditSubClaim.codesub" v-if="initial.modalEditSubClaim.isShow" @is-show="controlModalSubEdit"/>
</template>

<script lang="ts">
import { downLoadSubClaim } from "../../file_saver/docx/claim";
import ModalSubClaimEdit from "./ModalSubClaimEdit.vue";
import ConfirmComponentVue from "../ConfirmComponent.vue";
import SuccessModalVue from "../SuccessModal.vue";
import ModalStackXLVue from "../modal/ModalStackXL.vue";
import DatePickerComponentVue from "../DatePickerComponent.vue";
import ModalStacklg from "../modal/ModalStackXL.vue";
import { defineComponent, onMounted, reactive } from "vue";
import axios from "axios";
import { apiUrl } from "../../services/constant";
export default defineComponent({
  emits: ["isShow"],
  props: ["svh_code"],
  components: {
    ModalStacklg,
    DatePickerComponentVue,
    ModalStackXLVue,
    ConfirmComponentVue,
    SuccessModalVue,
    ModalSubClaimEdit
  },
  setup(props, { emit }) {
    const closeBtn = () => {
      emit("isShow", false);
    };
    const initial = reactive({
      claimModel: {
        date: "",
        time: "",
        company: "",
        type: "",
        source_employee: "",
        location: "",
        accident: "",
        employee: "",
        employee_id: 0,
        Inspector: "",
        inspector_id: 0,
        inspector_mobile: "",
        svh_code: "",
        time_dry: "",
        date_dry: "",
        province: 0,
        district: 0,
        brand_car: "",
        customer_claim_mobile: "",
        customer_claim_name: "",
        license_plate: "",
        claim_code: "",
        insurance_code: "",
        sub_code: "",
      },
      // modal message
      modalMessage: {
        isShow: false,
        message: "",
      },
      // modal confirm
      modalConfirm: {
        isShow: false,
        btnSubmit: false,
        message: "ยืนยันการทำรายการ",
      },
      // modal result
      modalResult: {
        isShow: false,
      },
      modalEditSubClaim: {
        isShow: false,
        codesub: ""
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
      // modal stack
      modalStackShow: false,
      modalSubResultShow: false,
      subClaimData: {
        employee: "",
        employee_id: 0,
        Inspector: "",
        inspector_id: 0,
        inspector_mobile: "",
        date_dry: "",
        time_dry: "",
        date: "",
        time: "",
        location: "",
        province: 0,
        district: 0,
        type: "เคลมนัดหมาย",
      },
      dateThai: "",
      sub_claim: [],
      dataTable: [],
      modalSuccessShow: false,
      codesub: "",
    });
    onMounted(() => {
      setDefualtClaim();
      loadDataTable();
      runTime();
      setInterval(runTime, 60000);
      axios
        .get(apiUrl + "/location/province")
        .then((response) => {
          initial.province = response.data.body;
        })
        .then(() => {
          axios
            .get(
              apiUrl +
                "/location/district/province/" +
                initial.claimModel.province
            )
            .then((response) => {
              initial.district = response.data.body;
            });
        });
      axios.get(apiUrl + "/user/filter/privi/8").then((response) => {
        initial.employeeData = response.data.body;
      });
      axios.get(apiUrl + "/user/filter/privi/8").then((response) => {
        initial.employeeData = response.data.body;
      });
      axios.get(apiUrl + "/user/filter/privi/9").then((response) => {
        initial.inspectorData = response.data.body;
      });
    });
    const setEmployee = () => {
      const splitData = initial.employeePre.split("/");
      initial.subClaimData.employee = splitData[0];
      initial.subClaimData.employee_id = Number(splitData[1]);
    };
    const setInspector = () => {
      const splitdata = initial.inspectorPre.split("/");
      initial.subClaimData.Inspector = splitdata[2];
      initial.subClaimData.inspector_id = Number(splitdata[0]);
      initial.subClaimData.inspector_mobile = splitdata[1];
    };
    const setDate = (event: string) => {
      initial.subClaimData.date = event;
      /* console.log(initial.claimModel.date) */
    };
    const runTime = () => {
      const date = new Date();
      let hour = date.getHours();
      let min = date.getMinutes();
      let hourSend = "" + hour;
      let minSend = "" + min;
      if (hourSend.length <= 1) {
        hourSend = "0" + hourSend;
      }
      if (minSend.length <= 1) {
        minSend = "0" + minSend;
      }
      initial.subClaimData.time = `${hourSend}:${minSend}`;
    };
    const controlModalStack = (value: string) => {
      if (value == "open") {
        initial.modalStackShow = true;
      }
      if (value == "close") {
        setClaimDefault();
        initial.modalStackShow = false;
      }
    };
    const setClaimDefault = () => {
      initial.subClaimData.employee = "";
      initial.subClaimData.employee_id = 0;
      initial.subClaimData.Inspector = "";
      initial.subClaimData.inspector_id = 0;
      initial.subClaimData.inspector_mobile = "";
      initial.subClaimData.date_dry = "";
      initial.subClaimData.time_dry = "";
      initial.subClaimData.date = "";
      initial.subClaimData.time = "";
      initial.subClaimData.location = "";
      initial.subClaimData.province = 0;
      initial.subClaimData.district = 0;
    };
    const showDistrict = () => {
      axios
        .get(
          apiUrl +
            "/location/district/province/" +
            initial.subClaimData.province
        )
        .then((response) => {
          initial.district = response.data.body;
        });
    };
    // submit
    const addnewSubClaim = () => {
      if (
        initial.subClaimData.Inspector == "" ||
        initial.subClaimData.date == "" ||
        initial.subClaimData.date_dry == "" ||
        initial.subClaimData.district == 0 ||
        initial.subClaimData.employee == "" ||
        initial.subClaimData.time_dry == "" ||
        initial.subClaimData.time == "" ||
        initial.subClaimData.location == "" ||
        initial.subClaimData.province == 0
      ) {
        alert("กรอกข้อมูลให้ครบด้วยครับ");
      } else {
        initial.claimModel.employee = initial.subClaimData.employee;
        initial.claimModel.employee_id = initial.subClaimData.employee_id;
        initial.claimModel.Inspector = initial.subClaimData.Inspector;
        initial.claimModel.inspector_id = initial.subClaimData.inspector_id;
        initial.claimModel.inspector_mobile = initial.subClaimData.inspector_mobile;
        initial.claimModel.date_dry = initial.subClaimData.date_dry;
        initial.claimModel.date = initial.subClaimData.date;
        initial.claimModel.time = initial.subClaimData.time;
        initial.claimModel.time_dry = initial.subClaimData.time_dry;
        initial.claimModel.location = initial.subClaimData.location;
        initial.claimModel.province = initial.subClaimData.province;
        initial.claimModel.district = initial.subClaimData.district;
        initial.claimModel.type = initial.subClaimData.type;
        axios
          .post(apiUrl + "/claim/subcreate", initial.claimModel)
          .then((response) => {
            if (response.data.status) {
              loadDataTable();
              initial.modalStackShow = false;
              setClaimDefault();
              initial.modalSuccessShow = true;
              setTimeout(() => {
                initial.modalSuccessShow = false;
              }, 1500);
            } else {
              alert("error");
            }
          });
      }
    };
    const loadDataTable = () => {
      axios
        .get(apiUrl + "/claim/subclaim/svhcode/" + props.svh_code)
        .then((response) => {
          initial.dataTable = response.data.body;
        });
    };
    const setDefualtClaim = () => {
      axios
        .get(apiUrl + "/claim/svhcode/" + props.svh_code)
        .then((response) => {
          initial.claimModel.time = response.data.body[0].time;
          initial.claimModel.company = response.data.body[0].company;
          initial.claimModel.type = response.data.body[0].type;
          initial.claimModel.source_employee = response.data.body[0].source_employee;
          initial.claimModel.location = response.data.body[0].location;
          initial.claimModel.accident = response.data.body[0].accident;
          initial.claimModel.employee = response.data.body[0].employee;
          initial.claimModel.employee_id = response.data.body[0].employee_id;
          initial.claimModel.Inspector = response.data.body[0].Inspector;
          initial.claimModel.inspector_id = response.data.body[0].inspector_id;
          initial.claimModel.inspector_mobile = response.data.body[0].inspector_mobile;
          initial.claimModel.svh_code = response.data.body[0].svh_code;
          initial.claimModel.time_dry = response.data.body[0].time_dry;
          initial.claimModel.date_dry = response.data.body[0].date_dry;
          initial.claimModel.province = response.data.body[0].province;
          initial.claimModel.district = response.data.body[0].district;
          initial.claimModel.brand_car = response.data.body[0].brand_car;
          initial.claimModel.customer_claim_mobile = response.data.body[0].customer_claim_mobile;
          initial.claimModel.customer_claim_name = response.data.body[0].customer_claim_name;
          initial.claimModel.license_plate = response.data.body[0].license_plate;
          initial.claimModel.claim_code = response.data.body[0].claim_code;
          initial.claimModel.insurance_code = response.data.body[0].insurance_code;
          /* console.log(initial.claimModel.customer_claim_mobile); */
          initial.sub_claim = response.data.body[0].Subclaims;
          const monthThai = [
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฎาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม",
          ];
          initial.claimModel.date = response.data.body[0].date;
          let DateArray = response.data.body[0].date.split("-");
          initial.dateThai = `วันที่ ${DateArray[2]} ${
            monthThai[Number(DateArray[1]) - 1]
          } ${DateArray[0]}`;
        });
    };
    const setResultSub = (code: string) => {
      axios.get(apiUrl + "/claim/subclaim/subcode/" + code).then((response) => {
        initial.claimModel.time = response.data.body[0].time;
        initial.claimModel.company = response.data.body[0].company;
        initial.claimModel.type = response.data.body[0].type;
        initial.claimModel.source_employee = response.data.body[0].source_employee;
        initial.claimModel.location = response.data.body[0].location;
        initial.claimModel.accident = response.data.body[0].accident;
        initial.claimModel.employee = response.data.body[0].employee;
        initial.claimModel.employee_id = response.data.body[0].employee_id;
        initial.claimModel.Inspector = response.data.body[0].inspector;
        initial.claimModel.inspector_id = response.data.body[0].inspector_id;
        initial.claimModel.inspector_mobile = response.data.body[0].inspector_mobile;
        initial.claimModel.svh_code = response.data.body[0].svh_code;
        initial.claimModel.time_dry = response.data.body[0].time_dry;
        initial.claimModel.date_dry = response.data.body[0].date_dry;
        initial.claimModel.province = response.data.body[0].province;
        initial.claimModel.district = response.data.body[0].district;
        initial.claimModel.brand_car = response.data.body[0].brand_car;
        initial.claimModel.customer_claim_mobile = response.data.body[0].customer_claim_mobile;
        initial.claimModel.customer_claim_name = response.data.body[0].customer_claim_name;
        initial.claimModel.license_plate = response.data.body[0].license_plate;
        initial.claimModel.claim_code = response.data.body[0].code_sub;
        /* console.log(initial.claimModel.claim_code) */
        initial.claimModel.insurance_code = response.data.body[0].insurance_code;
        initial.sub_claim = response.data.body[0].Subclaims;
        initial.claimModel.sub_code = response.data.body[0].code_sub;
        const monthThai = [
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน",
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤศจิกายน",
          "ธันวาคม",
        ];
        initial.claimModel.date = response.data.body[0].date;
        let DateArray = response.data.body[0].date.split("-");
        initial.dateThai = `วันที่ ${DateArray[2]} ${
          monthThai[Number(DateArray[1]) - 1]
        } ${DateArray[0]}`;
      });
    };
    const showResultSubClaim = (code: string) => {
      initial.codesub = code;
      setResultSub(code);
      initial.modalSubResultShow = true;
    };
    const closeReultModal = () => {
      initial.modalSubResultShow = false;
      setDefualtClaim();
    };
    // delete sub
    const showConfirmDeleteSubClaim = (codesub: string) => {
      initial.modalConfirm.message = `คุณต้องการลบข้อมูลเคลมที่ : ${codesub}`;
      initial.modalConfirm.isShow = true;
      initial.codesub = codesub;
    };
    const returnModalconfirmSubclaim = (event: boolean) => {
      if (event == true) {
        axios
          .delete(apiUrl + "/claim/subclaim/delete/" + initial.codesub)
          .then((response) => {
            if (response.data.status == true) {
              initial.modalConfirm.isShow = false;
              initial.modalSuccessShow = true;
              loadDataTable();
              setTimeout(() => {
                initial.modalSuccessShow = false;
              }, 1500);
            } else {
              initial.modalConfirm.message = `${response.data.message}`;
            }
          });
      }
      if (event == false) {
        initial.modalConfirm.isShow = false;
      }
    };
    const downloadDOCXSubClaim = () => {
      downLoadSubClaim(initial.codesub);
    };
    const getSubCodeForEdit = (code:string) => {
      initial.modalEditSubClaim.isShow = true;
      initial.modalEditSubClaim.codesub = code;
    };
    const controlModalSubEdit = (event:boolean) => {
      initial.modalEditSubClaim.isShow = event;
    };
    return {
      closeBtn,
      initial,
      setEmployee,
      setInspector,
      setDate,
      controlModalStack,
      setClaimDefault,
      showDistrict,
      addnewSubClaim,
      setResultSub,
      showResultSubClaim,
      closeReultModal,
      showConfirmDeleteSubClaim,
      returnModalconfirmSubclaim,
      downloadDOCXSubClaim,
      getSubCodeForEdit,
      controlModalSubEdit
    };
  },
});
</script>

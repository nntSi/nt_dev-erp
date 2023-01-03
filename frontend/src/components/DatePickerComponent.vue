<template>
  <div>
    <Datepicker class="datepicker" v-model="date" :format="returnDate" locale="th" :enableTimePicker="false" @update:modelValue="returnDate"/>
    <!-- {{ date_forsent  }} -->
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from 'vue';

export default defineComponent({
  emits: ["returnDate"],
  setup(props, { emit }){
    const date = ref(new Date());
    const date_forsent = ref("");

    const returnDate = (date:any) => {
      const mounthThai = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear() + 543;

      let daySend = "" + day;
      let monthSend = "" + month;
      if (daySend.length <= 1){
        daySend = "0" + daySend;
      };
      if (monthSend.length <= 1){
        monthSend = "0" + monthSend;
      };

      date_forsent.value = `${year}/${monthSend}/${daySend }`;
      emit('returnDate', date_forsent.value);
      return `วันที่ ${day} ${mounthThai[month-1]} ${year}`;
    }
    return{
      date,
      returnDate,
      date_forsent 
    }
  }
});
</script>

<style>
.datepicker input{
  font-size: 14px;
  font-family: 'Noto Sans Thai', sans-serif;
  height: 42px;
  background: #f9fafb;
}
</style>
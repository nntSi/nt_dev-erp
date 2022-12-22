<template>
  <div>
    <confirmComponent v-if="isShow" @returnConfirm="confirm" :showSubmitBtn="false" :message="'ยืนยัน'"/>
    <button @click="showConfirmModal" >openmodal</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import confirmComponent  from "../components/ConfirmComponent.vue";

const isShow = ref(false)
const showConfirmModal = () => {
  isShow.value = true;
}
const confirm = (event:any) => {
  isShow.value = event
}

</script>
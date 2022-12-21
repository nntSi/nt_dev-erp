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
        type="text"
        class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="แผนก IT, แผนกการเงิน, ฝ่ายขาย"
        required
      />
      <label
        class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
        >เมนูที่สามารถเข้าถึงได้</label
      >
      <div
        class="p-2.5 h-20 w-full border mb-3 rounded-lg text-sm bg-gray-50 border-gray-300"
      >
        <span
          id="badge-dismiss-indigo"
          class="inline-flex items-center py-1 px-2 mr-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-200 dark:text-indigo-800"
        >
          การจัดการ
          <button
            type="button"
            class="inline-flex items-center p-0.5 ml-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-300 dark:hover:text-indigo-900"
            data-dismiss-target="#badge-dismiss-indigo"
            aria-label="Remove"
          >
            <svg
              aria-hidden="true"
              class="w-3.5 h-3.5"
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
            <span class="sr-only">Remove badge</span>
          </button>
        </span>
      </div>
      <a
        href="#"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        บันทึกสิทธิการเข้าใช้งาน
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
  </div>
</template>
<script setup lang="ts"></script>
